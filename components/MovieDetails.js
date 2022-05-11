import { View, Text, TouchableOpacity } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import ProgressBar from './ProgressBar'
import { FONTS, COLORS, SIZES } from '../constants'
import { Picker } from '@react-native-picker/picker'
import { api } from '../constants'

const MovieDetails = ({data, isPlaying, stream, stopMovie, playMovie}) => {

    const [movieData, setMovieData] = useState([])
    const [ytsData, setYtsData] = useState([])
    const [url, setUrl] = useState(0)

    useEffect(() => {
    }, [stream])


    useEffect(() => {
        if(movieData.length === 0) {
            getTorrentData(data)
            setMovieData(data)
        }
    }, [data])

    const getTorrentData = async (data) => {
        try{
            const ytstorrents = await fetch(`${api.yts_api}${data?.imdb_id}`)
            response = await ytstorrents.json()
            console.log(response)
            setYtsData(response.data.movie.torrents)
            setUrl(response.data.movie.torrents[0].url)
        }catch(e){
            getTorrentData(data)
        }

    }
  return (
    <View
        style={{
            flex: 1,
            paddingHorizontal: SIZES.padding,
            marginBottom: 20,
            marginTop: 10,
            justifyContent: 'space-around'
        }}
    >
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Text
                style={{
                    color: COLORS.white,
                    ...FONTS.h3
                }}
            >{movieData?.overview}</Text>
        </View>
        <ProgressBar 
            containerStyle={{
                marginTop: SIZES.radius,
            }}
            barStyle={{
                height: 5,
                borderRadius: 3
            }}
            barPercentage={`${stream?.progress || "0.00"}%`}
        />
        <View
            style={{
                flexDirection: 'row',
                marginBottom: SIZES.radius
            }}
        >
            <Text
                style={{flex: 1, color: COLORS.white,...FONTS.h4}}
            >
                Seeds { stream || stream?.seeds != 0 ? stream?.seeds : movieData?.torrents[0].seeds}
                </Text>
            <Text
                style={{color: COLORS.white,...FONTS.h4}}
            >{
                stream?.status + ":" + parseFloat(stream?.progress).toFixed(2) + "%"}{stream?.downloadSpeed != 0 ? 
                    "(" + (stream?.downloadSpeed / 1024).toFixed(2) + "Kbps)" 
                : null
                }</Text>

        </View>
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
                        ytsData?.map((item, index) => {
                            return <Picker.Item label={`${item.quality} (${item.size})`} value={item.url} key={index} />
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
                    backgroundColor: isPlaying && url ? COLORS.disabled : COLORS.primary,
                }}
                onPress={() => isPlaying && url ? stopMovie : url ? playMovie(url) : null}
            >
                        <Text
                            style={{
                                color: url ? COLORS.white : COLORS.disabled,
                                ...FONTS.h4
                            }}
                        >{
                                stream && stream?.buffer < 100 && stream?.buffer > 0 ?
                                    "Buffering: " + stream?.buffer + "%"
                                : stream?.buffer == 100 ?
                                    "Continue Watching"
                                : 
                                    "Watch Now!"
                            }</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default MovieDetails