import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {SIZES, COLORS, FONTS } from '../constants'
import { Picker } from '@react-native-picker/picker'

const MovieSelector = ({torrentData, stopMovie, setUrl, url, isPlaying}) => {
  return (
    <View
        style={{
            flexDirection: 'row',
            marginBottom: SIZES.radius
        }}
    >
        <View 
            style={{
                flex: 1,
                borderRadius: 10,  
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                marginRight: SIZES.radius,
            }}
        >
            <Picker
                style={{
                    width: '100%',
                    height: 50,
                    borderRadius: 15,
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                }}
                onValueChange={(value) => {
                    stopMovie()
                    setUrl(value)
                }}
                selectedValue={url ? url : 0}
            >
                <Picker.Item label="Select Quality" value="0" />
                {
                    torrentData && Object.keys(torrentData).map((key) => {
                        return <Picker.Item label={`${torrentData[key]["url"].toLowerCase().includes("cam") || torrentData[key]["url"].toLowerCase().includes("hdts") ? "CAM" : key == 0 ? "HD" : key} (${torrentData[key]["filesize"]})`} value={torrentData[key]["url"]} key={key} />
                    })
                }
            </Picker>
        </View>
        <TouchableOpacity
            style={{
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: Platform.OS == 'os' ? SIZES.padding * 2 : 0,
                width: '50%',
                borderRadius: 10,
                backgroundColor: isPlaying && url ? COLORS.disabled : url ? COLORS.primary : COLORS.disabled,
                color: isPlaying && url ? COLORS.black : url ? COLORS.white : COLORS.black
            }}
            onPress={() => isPlaying && url ? stopMovie : url ? playMovie(url) : null}
        >
                    <Text
                        style={{
                            color: url ? COLORS.white : COLORS.disabled,
                            ...FONTS.h4
                        }}
                    >Play</Text>
        </TouchableOpacity>
    </View>
  )
}

export default MovieSelector