import { View, Text, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { SIZES, icons, COLORS, FONTS } from '../constants'

const HomeHeader = () => {
  return (
    <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.padding
        }}
    >
        <TouchableOpacity
            style={{
                height: SIZES.height * 0.05
            }}
            onPress={()=> {}}
        >
            <Image
                source={icons.flick}
                style={{
                    width: SIZES.width * 0.2,
                    height: 40,
                }}
            />
        </TouchableOpacity>
        <View
            style={{
                flex: 1,
                alignItems: 'flex-end',
            }}
        >
            <Text
                style={{
                    color: COLORS.white,
                    ...FONTS.h3
                }}
            >alpha v2.0</Text>
        </View>

    </View>
  )
}

export default HomeHeader