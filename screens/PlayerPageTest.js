/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   StatusBar,
   Dimensions,
   TouchableOpacity,
 } from 'react-native';
 import * as RNFS from 'react-native-fs';
 import {
   Header,
   LearnMoreLinks,
   Colors,
   DebugInstructions,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 // import { VLCPlayer, VlCPlayerView } from 'react-native-vlc-media-player';
 import TorrentStreamer from 'react-native-torrent-streamer';
 import Video from 'react-native-video';
 import {COLORS, SIZES} from '../constants';
 
 const calcVLCPlayerHeight = (windowWidth,aspetRatio) => {
   return windowWidth * aspetRatio;
 };
 
 const PlayerPageTest = () => {
 
   const [movieUrl, setMovieURL] = React.useState('');
   const [isPlaying, setIsPlaying] = React.useState(false);  
   const [stream, setStream] = React.useState({
       progress: 0,
       buffer: 0,
       downloadSpeed: 0,
       seeds: 0,
       status: "Idle",
       file: "none"
   })
   const state = {
     rate: 1,
     volume: 100,
     muted: false,
     resizeMode: 'contain',
     duration: 0.0,
     currentTime: 0.0,
     videoWidth: 0,
     videoHeight: 0,
     paused: false,
     fullscreen: true,
     decoration: true,
     isLoading: false,
     seekerFillWidth: 0,
     seekerPosition: 0,
     seekerOffset: 0,
     seeking: false,
     audioTracks: [],
     textTracks: [],
     selectedAudioTrack: undefined,
     selectedTextTrack: undefined,
     srcListId: 0,
     loop: false,
   };
   
   const initStreamer = () => {
     TorrentStreamer.addEventListener('error', onError)
     TorrentStreamer.addEventListener('status', onStatus.bind(this))
     TorrentStreamer.addEventListener('ready', onReady.bind(this))
     TorrentStreamer.addEventListener('stop', onStop.bind(this))
     console.log(RNFS.DocumentDirectoryPath + '/downloads/')
     TorrentStreamer.setup(RNFS.DocumentDirectoryPath + '/downloads/')
   }
 
   React.useEffect(() => {
     initStreamer();
     // playMovie('https:\/\/yts.mx\/torrent\/download\/B24513AE3F535C3457110A062B1D29D4DD51DB0E')
   }, [])
 

 
 
   
   function playMovie(url) {
     setStream({...stream, status: "Opening"})
     console.log("clicked")
     setIsPlaying(true)
     TorrentStreamer.start(url);
   }
 
   function stopMovie() {
       if(stream.status == "Downloading"){
           setStream({
               progress: 0,
               buffer: 0,
               downloadSpeed: 0,
               seeds: 0,
               status: "Stopped"
             }, () => {
               TorrentStreamer.stop()
             })
       }
       setIsPlaying(false)
   }
 
 
   function onError(e){
       console.log(e)
   }
 
 
   function onStatus({progress, buffer, downloadSpeed, seeds}){
       setStream({
           progress: progress,
           buffer: buffer,
           downloadSpeed: downloadSpeed,
           seeds: seeds,
           status: "Downloading"
       })
   }
 
 
   function onReady(data){
       setStream({...stream, file: data})
       // TorrentStreamer.open(data.url, 'video/mp4')
       console.log(data.url)
       if(data.url != movieUrl){
         setMovieURL(data.url)
       }
       
   }
   function onStop(data){
       console.log('stop')
   }
 
   return (
         <ScrollView
           contentInsetAdjustmentBehavior="automatic"
           style={styles.scrollView}>
           {/* <Header title="test"/> */}
           <View >
               <Text style={styles.heading}>Flick V2</Text>
           </View>
           <View style={styles.body}>
                 <Video
                     source={{uri: movieUrl}}
                     controls={true}
                     rate={state.rate}
                     paused={state.paused}
                     volume={state.volume}
                     muted={state.muted}
                     resizeMode={state.resizeMode}
                     repeat={state.loop}
                     selectedTextTrack={state.selectedTextTrack}
                     selectedAudioTrack={state.selectedAudioTrack}
                     style={{
                       width: Dimensions.get('window').width, 
                       height: calcVLCPlayerHeight(Dimensions.get('window').width,0.56)
                     }}
                 />
                 
                 <View
                     style={{
                         flexDirection: 'row',
                         marginBottom: 20,
                     }}
                 >
                     <Text
                         style={{flex: 1, color: COLORS.white}}
                     >
                         Seeds {stream.seeds}
                         </Text>
                     <Text
                         style={{color: COLORS.white}}
                     >{stream?.status + ":" + parseFloat(stream?.progress).toFixed(2) + "%"}{stream.downloadSpeed != 0 ? "(" + (stream.downloadSpeed / 1024).toFixed(2) + "Kbps)" : null}</Text>
 
                 </View>
               <TouchableOpacity
                   style={{
                       height: 60,
                       alignItems: 'center',
                       justifyContent: 'center',
                       marginBottom: 20,
                       borderRadius: 15,
                       backgroundColor: 'red'
                   }}
                   onPress={() => {isPlaying ? stopMovie() : playMovie('magnet:?xt=urn:btih:D80E7402F8F13330D99D5D819368D97889B5D692&dn=Lucifer.S03E22.HDTV.x264-SVA%5Beztv%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce')}}
               >
                    <Text>{
                                 stream.buffer < 100 && stream.buffer > 0 ?
                                     "Buffering: " + stream.buffer + "%"
                                 : stream.buffer == 100 && isPlaying ?
                                     "Stop"
                                 : isPlaying?
                                     "Opening Please wait.."
                                 :
                                     "Watch Now!"
                     }</Text>
               </TouchableOpacity>
           </View>
         </ScrollView>
   );
 };
 
 const styles = StyleSheet.create({
 
   backgroundVideo: {
     position: 'absolute',
     top: 0,
     left: 0,
     bottom: 0,
     right: 0,
   },
   scrollView: {
     flex: 1,
     backgroundColor: COLORS.black
   },
   heading:{
     fontSize: 30,
     fontWeight: '700',
     color: Colors.black,
   },
   engine: {
     position: 'absolute',
     right: 0,
   },
   body: {
     backgroundColor: COLORS.black
   },
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
     color: COLORS.black
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
     color: COLORS.black
   },
   highlight: {
     fontWeight: '700',
   },
   footer: {
     color: COLORS.black,
     fontSize: 12,
     fontWeight: '600',
     padding: 4,
     paddingRight: 12,
     textAlign: 'right',
   },
 });
 
 export default PlayerPageTest;
 