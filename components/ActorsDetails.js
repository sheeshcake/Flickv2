import React, {useEffect, useState, useRef} from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    FlatList,
} from 'react-native';
import { api, SIZES, COLORS, icons, FONTS } from '../constants';


const ActorDetails = ({id, userData, type}) => {
    const [crewData, setCrewData] = useState([])
    const [castData, setCastData] = useState([])
    const mtype = useRef(null)
    const muserData = useRef(null)
    useEffect(() => {
        mtype.current = type
        muserData.current = userData
        getCrew(id)
    }, [id, type, userData])

    async function getCrew(id){
        mtype.current = type
        console.log(`${api.tmdb_api}${mtype.current}/${id}/credits?api_key=${api.api_key}`)
        const crews = await fetch(`${api.tmdb_api}${mtype.current}/${id}/credits?api_key=${api.api_key}`)
        data = await crews.json()
        setCrewData(data.crew)
        setCastData(data.cast)
    }

    const renderCarousel = (data, title) => {
        return (
            <View
                style={{
                    flex: 1,
                    paddingBottom: SIZES.padding,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        alignItems: 'center',
                        marginBottom: 10
                    }}
                >
                    <Text
                        style={{
                            flex: 1,
                            color: COLORS.white,
                            fontSize: 24,
                        }}
                    >{title}</Text>
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item, index) => `actors${index}`}
                    renderItem={({item,index}) => {
                        return (
                            <View
                                style={{
                                    marginLeft: index == 0 ? SIZES.padding : 20,
                                    marginRight: index == crewData.length - 1 ? SIZES.padding : 0,
                                }}
                            >
                                <Image
                                    source={{uri: `${api.poster_api.find(x => SIZES.width <= x.size).url}${item.profile_path}`}}
                                    resizeMode="cover"
                                    style={{
                                        width: SIZES.width / 3,
                                        height: (SIZES.height / 6),
                                        borderRadius: 20
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 1,
                                        marginTop: SIZES.base,
                                        color: COLORS.white,
                                        textAlign: 'center',
                                        flexWrap: 'wrap',
                                        width: SIZES.width / 3,
                                        fontSize: 16,
                                    }}
                                >
                                    {item?.name}
                                </Text>
                                <Text
                                    style={{
                                        flex: 1,
                                        color: COLORS.white,
                                        flexWrap: 'wrap',
                                        textAlign: 'center',
                                        width: SIZES.width / 3,
                                        fontSize: 10
                                    }}
                                >
                                    {item?.character}
                                </Text>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }


  return (
    <>
        {renderCarousel(crewData, "Cast & Crew")}
    </>
  )
}

export default ActorDetails