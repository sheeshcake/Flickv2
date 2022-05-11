import { View, Text, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SIZES, COLORS, FONTS, theme, icons } from '../constants'
import Pills from './Pills'

const CategoryAndRatings = ({data}) => {

    const [movieData, setMovieData] = useState([])

    useEffect(() => {
        setMovieData(data)
    }, [data])

  return (
    <View
        style={{
            flexDirection: 'column',
            marginTop: SIZES.base,
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: SIZES.width * 0.5,
                justifyContent: 'center'
            }}
        >
            <Pills content={
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h4
                        }}
                    >{movieData?.release_date || movieData?.first_air_date}</Text>
            } />
            <Pills content={
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.star}
                        resizeMode="contain"
                        style={{
                            width: 15,
                            height: 15,
                            marginRight: SIZES.base
                        }}
                    />
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h4
                        }}
                    >{movieData?.vote_average}</Text>
                </View>
            } />

        </View>
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
        >
            {movieData?.genres?.map((item, index) => {
                return (
                    <Pills key={index} content={
                        <Text
                            style={{
                                color: COLORS.white,
                                flexWrap: 'nowrap'
                            }}
                        >
                            {item.name}
                        </Text>
                    } />
                )
            })}
        </View>
    </View>
  )
}

export default CategoryAndRatings