import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {COLORS, SIZES} from '../constants'

const Button = ({text, icon, onPress, buttonStyle, textStyle}) => {
  return (
        <TouchableOpacity
            style={{
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: Platform.OS == 'os' ? SIZES.padding * 2 : 10,
                borderRadius: 10,
                backgroundColor: COLORS.primary,
                ...buttonStyle
            }}
            onPress={onPress}
        >
            {
                icon ?
                    <Image
                        source={icon}
                        style={{
                            height: 30,
                            width: 30,
                            tintColor: COLORS.white
                        }}
                    />
                : null
            }
                <Text
                    style={{
                        color: COLORS.white,
                        fontSize: 20,
                        ...textStyle
                    }}
                >{text}</Text>
        </TouchableOpacity>
  )
}

export default Button