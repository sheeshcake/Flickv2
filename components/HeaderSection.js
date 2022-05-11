import { View, Text, ImageBackground, Image } from 'react-native'
import React, {useState, useEffect}  from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { api, SIZES, COLORS, FONTS} from '../constants'

const HeaderSection = ({data}) => {

    const [movieData, setMovieData] = useState([])

    useEffect(() => {
        setMovieData(data)
    }, [data])


  return (
        <ImageBackground
            source={{uri: `${api.backdrop_api.find(x => SIZES.width <= x.size).url}${movieData?.backdrop_path}`}}
            resizeMode="cover"
            style={{
                width: "100%",
                height: SIZES.height < 700 ? SIZES.height * 0.5 : SIZES.height * 0.5,
                marginBottom: 100,
            }}
        >
            <View
                style={{
                    flex: 1
                }}
            >
                
                <View
                    style={{
                        flex: 1,
                        justifyContent: "flex-end"
                    }}
                >
                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 1}}
                        colors={['transparent', "#000"]}
                        style={{
                            width: "100%",
                            height: 150,
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                style={{
                                    justifyContent: 'center',
                                    borderRadius: 20,
                                    width: 150,
                                    height: 250,
                                }}
                                resizeMode="contain"
                                source={{uri: `${api.poster_api.find(x => SIZES.width <= x.size).url}${movieData?.poster_path}`}}
                            />
                            <Text
                                style={{
                                    textAlign: 'center',
                                    marginTop: SIZES.base,
                                    color: COLORS.white,
                                    ...FONTS.h1
                                }}
                            >{movieData?.title || movieData.name}</Text>
                            
                        </View>
                    </LinearGradient>
                    </View>
                    
            </View>
        </ImageBackground>
  )
}

export default HeaderSection