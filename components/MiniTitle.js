import { View, Text, Image } from 'react-native'
import React from 'react'
import { SIZES, COLORS, api } from '../constants'
import CategoryAndRatings from './CategoryAndRatings'

const MiniTitle = ({data}) => {

  return (
    <View
        style={{
            flex: 1,
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            justifyContent: "space-evenly",
        }}
    >
        <Image 
            source={{uri: `${api.poster_api.find(x => SIZES.width <= x.size).url}${data?.poster_path}`}}
            style={{
                width: SIZES.width * 0.25,
                height: SIZES.width * 0.45,
                borderRadius: 10,
                marginHorizontal: 10,
            }}
        />
        <View
            style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "flex-start",
                paddingTop: 15,
                marginHorizontal: 10,
            }}
        >
            <Text
                style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    color: COLORS.white,
                    paddingBottom: 5,
                }}
            >{data.title || data.name}</Text>
            <CategoryAndRatings data={data} />
        </View>
        
    </View>
  )
}

export default MiniTitle