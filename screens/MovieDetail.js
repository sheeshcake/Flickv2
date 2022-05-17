import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    Image,
    Text,
    BackHandler,
    Animated,

} from 'react-native';
import {COLORS, api, SIZES, icons, FONTS} from '../constants';
import TorrentStreamer from 'react-native-torrent-streamer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieHorizontal from '../components/MovieHorizontal';
import HeaderNavigation from '../components/HeaderNavigation';
import HeaderSection from '../components/HeaderSection';
import CategoryAndRatings from '../components/CategoryAndRatings';
import MovieDetails from '../components/MovieDetails';
import MiniTitle from '../components/MiniTitle';
import MovieSelector from '../components/MovieSelector';
import MovieGallery from '../components/MovieGallery';
import ActorDetails from '../components/ActorsDetails';
import ShowsSelector from '../components/ShowsSelector';
//VIDEO PLAYERS
import VideoPlayer from '../components/VideoPlayer';
import VideoPlayerv2 from '../components/VideoPlayerv2';




const MovieDetail = ({navigation, route}) => {
    const { id, type } = route.params;
    const [userData, setUserData] = useState(null);
    const [movie, setMovie] = useState([]);
    const [torrentData, setTorrentData] = useState([])
    const [numofSeason, setNumofSeason] = useState(0)
    const scrollRef = useRef();
    const [streamUrl, setStreamUrl] = useState(null);
    const [buffer, setBuffer] = useState(0);
    const [downloadSpeed, setDownloadSpeed] = useState()
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [url, setUrl] = useState(0)
    let stream = {
        progress: 0,
        buffer: 0,
        downloadSpeed: 0,
        seeds: 0,
        status: "Idle",
        file: "none"
    }

    const [relatedMovies, setRelatedMovies] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)


    useEffect(() => {
        if(userData === null && movie.length === 0) {
            BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);
            TorrentStreamer.addEventListener('error', onError)
            TorrentStreamer.addEventListener('status', x => onStatus(x))
            TorrentStreamer.addEventListener('ready', x => onReady(x))
            TorrentStreamer.addEventListener('stop', x => onStop(x))
            getMovieData(id, type)
            getUserData()
        }
    },[id, type, stream])

    const getUserData = async () => {
        try {
            const user = await AsyncStorage.getItem('user')
            if (user) {
                setUserData(JSON.parse(user))
            }
        } catch (e) {
        }
    }
    

    function hardwareBackPress(){
        stopMovie()
    }


    async function getMovieData(id){
        const action = await fetch(`${api.tmdb_api}${type}/${id}?api_key=${api.api_key}&language=${userData?.language || 'en-US'}&append_to_response=external_ids`)
        data = await action.json()
        setMovie(data)
        getTorrentData(data)
        getSuggestionData(route.params.id, type)
        
    }


    const getTorrentData = async (data) => {
        try{
            const torrents = await fetch(`${api.popcorntime}${type == "movie" ? "movie" : "show"}/${data?.external_ids?.imdb_id}`)
            response = await torrents.json()
            console.log(data)
            if(type == "movie"){
                setTorrentData(response.torrents.en)
                setUrl(response.torrents.en["720p"]?.url)
            }else{
                
                setTorrentData(response.episodes)
                setNumofSeason(response.num_seasons)
            }
        }catch(e){
            getTorrentData(data)
        }

    }



    async function getSuggestionData(id, t){
        const action = await fetch(`${api.tmdb_api}${t}/${id}/similar?api_key=${api.api_key}&language=${userData?.language || 'en-US'}&page=1`)
        data = await action.json()
        setRelatedMovies(data.results)
    }


    function playMovie(url) {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
        stream = {...stream, status: "Opening"}
        setIsPlaying(true)
        TorrentStreamer.start(url)
    }

    function stopMovie() {
        if(stream.status == "Downloading"){
            stream = {
                progress: 0,
                buffer: 0,
                downloadSpeed: 0,
                seeds: 0,
                status: "Stopped"
            }
        }
        TorrentStreamer.stop()
        setIsPlaying(false)
    }
    

    function onError(e){
        stopMovie();
        alert("Server Error: Change the quality or use VPN");
    }

    
    function onStatus({progress, buffer, downloadSpeed, seeds}){
        if(!streamUrl){
            setBuffer(buffer)
        }else if(buffer != 100){
            setBuffer(100)
        }
        setDownloadProgress(`${Math.ceil(parseFloat(progress))}%`)
        downloadSpeed = downloadSpeed / 1024;
        if(downloadSpeed < 1000){
            setDownloadSpeed(`${downloadSpeed.toFixed(2)} Kb/s`)
        }else{
            downloadSpeed = downloadSpeed / 1024;
            setDownloadSpeed(`${downloadSpeed.toFixed(2)} Mb/s`)
        }
        // stream = {
        //     progress: progress,
        //     buffer: buffer,
        //     downloadSpeed: downloadSpeed,
        //     seeds: seeds,
        //     status: "Downloading"
        // }
    }

    
    function onReady(data){
        setStreamUrl(data.url)
        stream = {...stream, file: data}
        
    }
    function onStop(){
        console.log('Stopped')
    }


    return (
        <Animated.View style={{flex: 1, flexDirection: 'column', backgroundColor: COLORS.background}}>
              {
                movie ? 
                  <>
                      <HeaderNavigation navigation={navigation} stopMovie={stopMovie} />
                      {
                        isPlaying  ?
                            <VideoPlayer posterUrl={`${api.backdrop_api.find(x => SIZES.width <= x.size).url}${movie?.backdrop_path}`} fileName={movie?.title || movie?.name} streamUrl={streamUrl} downloadProgress={downloadProgress} downloadSpeed={downloadSpeed} buffer={buffer} stopMovie={() => stopMovie()}/>
                            // <VideoPlayerv2 uri={streamUrl} />
                        : null
                      }
                      <Animated.ScrollView
                            ref={scrollRef}
                            style={{flex: 1, flexDirection: 'column'}}
                            contentContainerStyle={{backgroundColor: COLORS.black}}
                      >
                          {
                                isPlaying  ?
                                    <MiniTitle data={movie} />
                                :  
                                <>
                                    <HeaderSection data={movie} />
                                    <CategoryAndRatings data={movie} />
                                </>
                            }
                          
                          {/* <MovieDetails data={movie} isPlaying={isPlaying} stream={stream} stopMovie={stopMovie} playMovie={(d) => playMovie(d)} /> */}




                          <View
                                style={{
                                    flex: 1,
                                    paddingHorizontal: SIZES.padding,
                                    marginBottom: 20,
                                    marginTop: 10,
                                    justifyContent: 'space-around'
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: 20
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: COLORS.white,
                                            ...FONTS.h3
                                        }}
                                    >{movie?.overview}</Text>
                                </View>
                                {
                                    type == "movie" ?
                                    <MovieSelector torrentData={torrentData} stopMovie={stopMovie} setUrl={x => setUrl(x)} url={url} playMovie={x => playMovie(x)} isPlaying={isPlaying} />
                                    :
                                    <ShowsSelector torrentData={torrentData} numofSeason={numofSeason} stopMovie={stopMovie} setUrl={setUrl} url={url} playMovie={x => playMovie(x)} isPlaying={isPlaying} />
                                }
                            </View>








                          <ActorDetails id={movie.id} type={type} userData={userData}/>
                          {/* <CompaniesDetails companies={movie.production_companies}/> */}
                          <MovieGallery id={movie.id} type={type} userData={userData} />
                          <MovieHorizontal navigation={navigation} type={type} label={type == 'tv' ? "Related Shows" : "Related Movies"} data={relatedMovies} stopMovie={() => stopMovie()} />
                      </Animated.ScrollView>
                  </>
                : 
                  <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Image
                        source={icons.flick}
                        style={{width: 300, height: 150}}
                    />
                    <Text style={{fontSize: 20, fontWeight: "bold", color: COLORS.white}}>Loading...</Text>
                  </View>

              }
        </Animated.View>
    )
}


export default MovieDetail;