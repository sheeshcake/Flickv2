
import React, {useEffect, useState, useRef} from 'react'
import {
    View,
    Text,
    Image,
    Animated,
} from 'react-native';
import { api, SIZES, COLORS, FONTS } from '../constants';

const MovieGallery = ({id, type, userData}) => {
    const [galleryData, setGalleryData] = useState([])
    const pageIndicatorX = useRef(new Animated.Value(0)).current
    const mtype = useRef(null)
    const muserData = useRef(null)
    useEffect(() => {
        mtype.current = type
        muserData.current = userData
        getImages(id)
    }, [id, type, userData])


    async function getImages(id){
        mtype.current = type
        const gallery = await fetch(`${api.tmdb_api}${mtype.current}/${id}/images?api_key=${api.api_key}`)
        data = await gallery.json()
        setGalleryData(data.backdrops)
        
    }

  return (
      <View
            style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}
      >
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}
        >
            <Text
                style={{
                    fontSize: 24,
                    color: COLORS.white,
                    marginLeft: SIZES.padding,
                }}
            >
                Gallery
            </Text>
        </View>
        <Animated.FlatList
                horizontal
                pagingEnabled
                snapToAlignment="center"
                snapToInterval={SIZES.width}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                decelerationRate={0}
                contentContainerStyle={{
                    marginTop: SIZES.radius
                }}
                data={galleryData}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: pageIndicatorX} } }
                ], { useNativeDriver: false })}
                renderItem={({item,index}) => {
                    return (
                        <View
                            key={`gallery-${index}`}
                            style={{
                                width: SIZES.height * 0.8,
                                height: SIZES.width * 0.8,
                                alignItems: 'center',
                                marginHorizontal: SIZES.radius,
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                source={{uri: `${api.poster_api.find(x => SIZES.width <= x.size).url}${item.file_path}`}}
                                resizeMode="cover"
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 10
                                }}
                                imageStyle={{
                                    borderRadius: 10
                                }}
                            />
                        </View>
                    )
                }}
            >
        </Animated.FlatList>
      </View>
  )
}

export default MovieGallery