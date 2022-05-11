import React, {useEffect, useState} from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    FlatList,
} from 'react-native';
import { api, SIZES, COLORS, icons, FONTS } from '../constants';


const MovieHorizontal = ({navigation, label, data, type, stopMovie = () => {}}) => {
    const [moviedata, setMovieData] = useState([])
    useEffect(() => {
        setMovieData(data)
    }, [data])
  return (
    <View
        style={{
            marginTop: SIZES.padding
        }}
    >
        <View
            style={{
                flexDirection: 'row',
                paddingHorizontal: SIZES.padding,
                alignItems: 'center'
            }}
        >
            <Text
                style={{
                    flex: 1,
                    color: COLORS.white,
                    ...FONTS.h2
                }}
            >{label}</Text>
            <Image
                source={icons.right_arrow}
            />
        </View>
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={moviedata}
            keyExtractor={item => `${item.id}`}
            renderItem={({item,index}) => {
                return (
                    <TouchableWithoutFeedback
                        onPress={() => {
                            stopMovie()
                            navigation.push("MovieDetail", {
                                id: item.id,
                                type: type
                            })
                        }}
                    >
                        <View
                            style={{
                                marginLeft: index == 0 ? SIZES.padding : 20,
                                marginRight: index == moviedata.length - 1 ? SIZES.padding : 0
                            }}
                        >
                            <Image
                                source={{uri: `${api.poster_api.find(x => SIZES.width <= x.size).url}${item.poster_path}`}}
                                resizeMode="cover"
                                style={{
                                    width: SIZES.width / 3,
                                    height: (SIZES.height / 3) + 60,
                                    borderRadius: 20
                                }}
                            />
                            <Text
                                style={{
                                    flex: 1,
                                    marginTop: SIZES.base,
                                    color: COLORS.white,
                                    flexWrap: 'wrap',
                                    width: SIZES.width / 3,
                                    ...FONTS.h4
                                }}
                            >
                                {item?.original_title || item?.name}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }}
        />
    </View>
  )
}

export default MovieHorizontal