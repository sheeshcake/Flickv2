import { Animated, Dimensions, StatusBar, useRef } from 'react-native'
import VlcPlayer from 'react-native-vlc-player';
import React, {useEffect, useState} from 'react'

const VideoPlayerVLC = ({streamUrl, stopMovie}) => {
    const [width, setWidth] = useState(Dimensions.get('window').width)
    const [height, setHeight] = useState(Dimensions.get('window').height)
    vlcplayer = React.createRef();

    useEffect(() => {
        Dimensions.addEventListener('change', (e) => {
            if(e.window.width > e.window.height){
                StatusBar.setHidden(true)
            }
            setWidth(e.window.width)
            setHeight(e.window.height)
        })
    }, [])

  return (
    <Animated.View
            style={{
                flex: 1,
                position: width > height ? 'relative' : 'relative',
                zIndex: width > height ? 10 : 1,
                minWidth: width,
                minHeight: width > height ? height : height * 0.3,
                maxHeight: width > height ? height : height * 0.3,
            }}
        >
                <VlcPlayer
                    ref={vlcplayer}
                    style={{
                        width: width,
                        height: width > height ? height : height * 0.3,
                    }}
                    paused={false}
                    autoplay={true}
                    source={{
                        uri: streamUrl,
                        autoplay: true,
                        initOptions: ['--codec=avcodec'],
                        
                    }}  
                />
        </Animated.View> 
  )
}

export default VideoPlayerVLC