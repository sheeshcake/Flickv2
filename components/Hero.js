
import React, {useEffect, useState} from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
    Animated,
} from 'react-native';
import { api, SIZES, COLORS, icons, FONTS } from '../constants';

const Hero = ({navigation, data, pageIndicatorX, type}) => {
    const [moviedata, setMovieData] = useState([])
    useEffect(() => {
        setMovieData(data)
    }, [data, type])


  return (
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
            data={moviedata}
            onScroll={Animated.event([
                { nativeEvent: { contentOffset: { x: pageIndicatorX} } }
            ], { useNativeDriver: false })}
            renderItem={({item,index}) => {
                return (
                    <TouchableWithoutFeedback
                        key={`hero-${index}`}
                        onPress={() => navigation.push("MovieDetail", { 
                            id: item.id ,
                            type: type
                        } )}
                    >
                        <View
                            style={{
                                width: SIZES.width,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <ImageBackground
                                source={{uri: `${api.poster_api.find(x => SIZES.width <= x.size).url}${item.poster_path}`}}
                                resizeMode="cover"
                                style={{
                                    width: SIZES.width * 0.85,
                                    height: SIZES.width * 0.85,
                                    justifyContent: 'flex-end'
                                }}
                                imageStyle={{
                                    borderRadius: 40
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        height: 60,
                                        width: "100%",
                                        marginBottom: SIZES.radius,
                                        paddingHorizontal: SIZES.radius
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <View
                                            style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 40,
                                                height: 40,
                                                borderRadius: 20,
                                                backgroundColor: COLORS.transparentWhite
                                            }}
                                        >
                                            <Image
                                                source={icons.play}
                                                resizeMode="contain"
                                                style={{
                                                    width: 15,
                                                    height: 15,
                                                    tintColor: COLORS.white
                                                }}
                                        
                                            />
                                        </View>
                                        <Text
                                                style={{
                                                    marginLeft: SIZES.base,
                                                    color: COLORS.white,
                                                    ...FONTS.h3
                                                }}
                                            >Play Now</Text>
                                    </View>
                                    <Text
                                        style={{
                                            flex: 1,
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                            color: COLORS.white,
                                            ...FONTS.h2,
                                            textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                            textShadowOffset: {width: -1, height: 1},
                                            textShadowRadius: 10
                                        }}
                                    >
                                        {item.original_title}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }}
        >
        </Animated.FlatList>
  )
}

export default Hero