import { View, Text, TouchableOpacity, Appearance } from 'react-native'
import React, { useEffect, useState } from 'react'
import {SIZES, COLORS, FONTS } from '../constants'
import { Picker } from '@react-native-picker/picker'

const ShowsSelector = ({torrentData, numofSeason, stopMovie, setUrl, url, isPlaying, playMovie}) => {
    
    const [movieData, setMovieData] = useState([])
    const [selectedSeason, setSelectedSeason] = useState(0)
    const [selectedEpisodeNumber, setSelectedEpisodeNumber] = useState(0)
    const [selectedEpisode, setSelectedEpisode] = useState([])
    const colorScheme = Appearance.getColorScheme();

    useEffect(() => {
        let temp = []
        for(var i = 0; i < numofSeason; i++){
            temp[i] = torrentData.filter(x => x.season == i + 1).sort((a,b) => (a.episode > b.episode) ? 1 : ((b.episode > a.episode) ? -1 : 0))
        }
        setMovieData(temp)
        if(temp?.length > 0){
            setSelectedEpisode(temp[selectedSeason][selectedEpisodeNumber])
        }
    }, [torrentData, numofSeason])

  return (
      <>
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
                        setSelectedSeason(value)
                    }}
                    selectedValue={selectedSeason || 0}
                >
                    <Picker.Item color={colorScheme == 'dark' ?'white' : 'black'} label="Select Season" value="0" />
                    {
                        movieData.map((data, index) => {
                            return <Picker.Item color={colorScheme == 'dark' ?'white' : 'black'} label={`Season ${index + 1}`} value={index} key={`season${index}`} />
                        })
                    }
                </Picker>
            </View>
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
                        setSelectedEpisode(movieData[selectedSeason][value])
                        setSelectedEpisodeNumber(value)
                    }}
                    selectedValue={selectedEpisodeNumber || 0}
                >
                    <Picker.Item color={colorScheme == 'dark' ?'white' : 'black'} label="Select Episode" value="0" />
                    {
                        movieData[selectedSeason] && movieData[selectedSeason].map((data, index) => {
                            return <Picker.Item color={colorScheme == 'dark' ?'white' : 'black'} label={`Episode ${data.episode}`} value={index} key={`episode${data.episode}`} />
                        })
                    }
                </Picker>
            </View>
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
                    <Picker.Item color={colorScheme == 'dark' ?'white' : 'black'} label="Select Quality" value="0" />
                    {
                        selectedEpisode["torrents"] && Object.keys(selectedEpisode["torrents"]).map((key) => {
                            return <Picker.Item color={colorScheme == 'dark' ?'white' : 'black'} label={`${key == "0" ? "HD" : key}`} value={selectedEpisode["torrents"][key]["url"]} key={key} />
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
      </>
    
  )
}

export default ShowsSelector