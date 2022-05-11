import React, { useState, useRef, useEffect } from 'react';
import { View, Platform, StatusBar, Image, Text } from 'react-native';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Video from 'react-native-video';
import { COLORS, icons, SIZES, playernotice } from '../constants';
import Orientation from 'react-native-orientation-locker';
import getfile from '../helper/getfile';

const VideoPlayer = ({streamUrl, buffer, downloadProgress, downloadSpeed, posterUrl, stopMovie, fileName}) => {

    const videoPlayer = useRef(null);
    const filePath = useRef(null);
    const buffernotice = useRef(null)
    const downloadSpeednotice = useRef(null)
    const downloadProgressnotice = useRef(null)
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
    const [isLoading, setIsLoading] = useState(true);

    const getFile = async (fName) => {
        const file = await getfile(fName);
        setIsLoading(false);
        filePath.current = file;
    }
    
    useEffect(() => {
        if(streamUrl){
            setIsLoading(false);
            downloadProgressnotice.current = downloadProgress;
        }else{
            buffernotice.current = buffer;
        }
        downloadSpeednotice.current = downloadSpeed;
    }, [streamUrl, posterUrl, fileName, buffer, downloadProgress, downloadSpeed]);


    const onSeek = (seek) => {
        videoPlayer?.current.seek(seek);
    };

    const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);

    const onPaused = (newState) => {
        setPaused(!paused);
        setPlayerState(newState);
    };

    const onReplay = () => {
        videoPlayer?.current.seek(0);
        setCurrentTime(0);
        if (Platform.OS === 'android') {
            setPlayerState(PLAYER_STATES.PAUSED);
            setPaused(true);
        } else {
            setPlayerState(PLAYER_STATES.PLAYING);
            setPaused(false);
        }
    };

    const onProgress = (data) => {
        if (!isLoading) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        setDuration(Math.round(data.duration));
        setIsLoading(false);
    };

    const onLoadStart = () => setIsLoading(true);

    const onEnd = () => {
        setPlayerState(PLAYER_STATES.ENDED);
        setCurrentTime(duration);
        stopMovie();
    };
    

    return (
        <View
            style={{
                position: isFullScreen ? 'absolute' : null,
                zIndex: isFullScreen ? 10 : 1,
                backgroundColor: COLORS.black,
                height: isFullScreen ? SIZES.width : SIZES.height * 0.3,
                width: isFullScreen ? SIZES.height : SIZES.width,
            }}
        >
            {
                streamUrl && (
                    <Video
                        onEnd={onEnd}
                        onLoad={onLoad}
                        onLoadStart={onLoadStart}
                        posterResizeMode={'cover'}
                        poster={posterUrl}
                        onProgress={onProgress}
                        paused={paused}
                        ref={(ref) => (videoPlayer.current = ref)}
                        resizeMode={'contain'}
                        source={{
                            uri:  streamUrl
                        }}
                        style={{
                            height: isFullScreen ? SIZES.width : SIZES.height * 0.3,
                            width: isFullScreen ? SIZES.height : SIZES.width,
                            backgroundColor: COLORS.black
                        }}
                    />
                )
            }
            <MediaControls
                isFullScreen={isFullScreen}
                duration={duration}
                isLoading={isLoading}
                onFullScreen={() => {
                    if(isFullScreen){
                        StatusBar.setHidden(false);
                        setIsFullScreen(false);
                        Orientation.lockToPortrait();
                    }else{
                        StatusBar.setHidden(true);
                        setIsFullScreen(true);
                        Orientation.lockToLandscape();
                    }
                    setPlayerState(PLAYER_STATES.FULLSCREEN);
                }}
                progress={currentTime}
                onPaused={onPaused}
                onReplay={onReplay}
                onSeek={onSeek}
                onSeeking={onSeeking}
                mainColor={COLORS.primary}
                fadeOutDelay={streamUrl ? 3000 : 999999}
                showOnStart={true}
                playerState={playerState}
                sliderStyle={{ 
                    containerStyle: {
                    }, 
                    thumbStyle: {
                        backgroundColor: COLORS.primary,
                    }, 
                    trackStyle: {
                        height: 2,
                        backgroundColor: COLORS.primary,
                    } 
                }}
                containerStyle={{
                    backgroundColor: COLORS.transparentBlack,
                }}
            >
                <View 
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text>
                        {
                            downloadProgress.current == "100%" && streamUrl ? (
                                "Downloaded :D"
                            ) : streamUrl && buffernotice.current == 100 ? (
                                `${downloadProgressnotice.current || "0%"} Downloaded (${downloadSpeednotice.current || "0Kb/s"})`
                            ) : !streamUrl && buffernotice.current < 100 && buffernotice.current ? (
                                `${buffernotice.current || "0"}% Buffered (${downloadSpeednotice.current || "0Kb/s"})`
                            ) : (
                                "Connecting To Peers..."
                            )
                        }
                    </Text>
                </View>
            </MediaControls>
        </View>

    );
};


export default VideoPlayer;