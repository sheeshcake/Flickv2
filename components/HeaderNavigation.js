import { View, TouchableOpacity, Image, Platform } from 'react-native'
import React from 'react'
import { SIZES, COLORS, icons } from '../constants'


const HeaderNavigation = ({navigation, stopMovie}) => {
  return (
        <View
            style={{
                position: 'absolute',
                zIndex: 5,
                flex: 1,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                    marginTop: Platform.OS == 'ios' ? 40 : 20,
                    marginBottom: Platform.OS == 'ios' ? 40 : 20,
                    paddingHorizontal: SIZES.padding,
                    backgroundColor: 'transparent',
            }}
            >
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 20,
                        backgroundColor: COLORS.transparentBlack
                    }}
                    onPress={() => {
                        stopMovie()
                        navigation.goBack()
                    }}
                >
                    <Image 
                        source={icons.left_arrow}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.white
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
  )
}

export default HeaderNavigation