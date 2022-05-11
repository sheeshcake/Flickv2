import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    Image,
    Text,
    BackHandler,
    Animated,
    TouchableOpacity

} from 'react-native';
import ProgressBar from '../components/ProgressBar';
import { Picker } from '@react-native-picker/picker';
import {COLORS, api, SIZES, icons, FONTS} from '../constants';
import TorrentStreamer from 'react-native-torrent-streamer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieHorizontal from '../components/MovieHorizontal';
import HeaderNavigation from '../components/HeaderNavigation';
import HeaderSection from '../components/HeaderSection';
import CategoryAndRatings from '../components/CategoryAndRatings';
import MovieDetails from '../components/MovieDetails';
import MiniTitle from '../components/MiniTitle';
import getfile from '../helper/getfile';

//VIDEO PLAYERS
import VideoPlayer from '../components/VideoPlayer';
import MovieGallery from '../components/MovieGallery';
import ActorDetails from '../components/ActorsDetails';




const MovieDetail = ({navigation, route}) => {
    const { id, type } = route.params;
    const [userData, setUserData] = useState(null);
    const [movie, setMovie] = useState([]);
    const [ytsData, setYtsData] = useState([])
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

    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);
    TorrentStreamer.addEventListener('error', onError)
    TorrentStreamer.addEventListener('status', x => onStatus(x))
    TorrentStreamer.addEventListener('ready', x => onReady(x))
    TorrentStreamer.addEventListener('stop', x => onStop(x))

    useEffect(() => {
        if(userData === null && movie.length === 0) {
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
        const action = await fetch(`${api.tmdb_api}${type}/${id}?api_key=${api.api_key}&language=${userData?.language || 'en-US'}`)
        data = await action.json()
        setMovie(data)
        getTorrentData(data)
        getSuggestionData(route.params.id, type)
        
    }


    const getTorrentData = async (data) => {
        try{
            const ytstorrents = await fetch(`${api.yts_api}${data?.imdb_id}`)
            response = await ytstorrents.json()
            setYtsData(response.data.movie.torrents)
            setUrl(response.data.movie.torrents[0].url)
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
        console.log("Error on Streamng: " + e)
    }

    
    function onStatus({progress, buffer, downloadSpeed, seeds}){
        if(!streamUrl){
            setBuffer(buffer)
        }else if(streamUrl && buffer != 100){
            setBuffer(100)
        }
        if(streamUrl){
            setDownloadProgress(`${Math.ceil(parseFloat(progress))}%`)
        }
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
                        : null
                      }
                      <Animated.ScrollView
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
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginBottom: SIZES.radius
                                    }}
                                >
                                    <View 
                                        style={{
                                            flex: 1,
                                            borderRadius: 10,  
                                            overflow: 'hidden',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: COLORS.primary,
                                            marginRight: SIZES.radius,
                                        }}
                                    >
                                        <Picker
                                            style={{
                                                width: '100%',
                                                height: 50,
                                                borderRadius: 15,
                                                backgroundColor: COLORS.primary,
                                                color: COLORS.white,
                                            }}
                                            onValueChange={(value) => {
                                                stopMovie()
                                                setUrl(value)
                                            }}
                                            selectedValue={url ? url : 0}
                                        >
                                            <Picker.Item label="Select Quality" value="0" />
                                            {
                                                ytsData?.map((item, index) => {
                                                    return <Picker.Item label={`${item.quality} (${item.size})`} value={item.url} key={index} />
                                                })
                                            }
                                        </Picker>
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            height: 60,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: Platform.OS == 'os' ? SIZES.padding * 2 : 0,
                                            width: '50%',
                                            borderRadius: 10,
                                            backgroundColor: isPlaying && url ? COLORS.disabled : url ? COLORS.primary : COLORS.disabled,
                                        }}
                                        onPress={() => isPlaying && url ? stopMovie : url ? playMovie(url) : null}
                                    >
                                                <Text
                                                    style={{
                                                        color: url ? COLORS.white : COLORS.disabled,
                                                        ...FONTS.h4
                                                    }}
                                                >{
                                                    isPlaying && url ?
                                                        "Stop"
                                                    :   
                                                        "Play"
                                                    }</Text>
                                    </TouchableOpacity>
                                </View>
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