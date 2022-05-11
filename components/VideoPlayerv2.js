import { Animated, Dimensions, StatusBar } from 'react-native'
import Video from 'react-native-video'
import React, {useEffect, useState} from 'react'

const VideoPlayerv2 = ({streamUrl, stopMovie}) => {
    const [width, setWidth] = useState(Dimensions.get('window').width)
    const [height, setHeight] = useState(Dimensions.get('window').height)

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
                <Video
                    source={{ uri: streamUrl }}
                    style={{
                        flex: 1,
                        top: 0,
                        left: 0,
                        flexDirection: 'column',
                        backgroundColor: '#000',
                        width: width,
                        height: width > height ? height : height * 0.3,
                    }}
                    resizeMode={'contain'}
                    controls={true}
                    volume={2}
                    playInBackground={true}
                    onError={(e) => {
                        console.log(e)
                    }}
                    onEnd={() => {
                        stopMovie()
                    }}
    
                />
        </Animated.View> 
  )
}

export default VideoPlayerv2