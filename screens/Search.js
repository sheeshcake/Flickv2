import React, { useEffect, useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput
} from 'react-native';
import { COLORS, FONTS, SIZES, icons, api } from '../constants'
import MovieHorizontal from '../components/MovieHorizontal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = ({navigation}) => {
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        getUserData()
        getData()
    }, [])
    const getUserData = async () => {
        try {
            const user = await AsyncStorage.getItem('user')
            if (user) {
                setUserData(JSON.parse(user))
            }
        } catch (e) {
            console.log(e)
        }
    }

    const [search, setSearch] = useState("")
    const [movies, setMovies] = useState([])
    const [tvshows, setTvShows] = useState([])

    async function getData() {
        const movie_discover = await fetch(`${api.tmdb_api}discover/movie?api_key=${api.api_key}&language=${userData?.language || 'en-US'}&page=1`)
        data = await movie_discover.json()
        setMovies(data.results)
        ///////////////////////////////
        const tv_discover = await fetch(`${api.tmdb_api}discover/tv?api_key=${api.api_key}&language=${userData?.language || 'en-US'}&page=1`)
        data = await tv_discover.json()
        setTvShows(data.results)
    }

    async function getSearch(data){
        if(data  != ""){
            const movie_search = await fetch(`${api.tmdb_api}search/movie?api_key=${api.api_key}&language=${userData?.language || 'en-US'}&query=${data}&page=1`)
            movie_data = await movie_search.json()
            setMovies(movie_data?.results ? movie_data.results : [])
            ///////////////////////////////
            const tv_search = await fetch(`${api.tmdb_api}search/tv?api_key=${api.api_key}&language=${userData?.language || 'en-US'}&query=${data}&page=1`)
            tv_data = await tv_search.json()
            setTvShows(tv_data?.results ? tv_data.results : [])
        }else{
            getData()
        }

    }


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 15,
                    marginBottom: 15,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: COLORS.white,
                        paddingHorizontal: 20,
                        borderRadius: 20,
                    }}
                >
                    <Image
                        source={icons.search}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.black,
                            marginRight: 10
                            
                        }}
                    />
                    <TextInput
                        style={{
                            flex: 1,
                            backgroundColor: COLORS.white,
                            color: COLORS.black,
                            fontSize: FONTS.h3.fontSize,

                        }}
                        onChangeText={(d) => {
                            setSearch(d)
                            getSearch(d)
                        }}
                        value={search}
                    />
                </View>

                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50
                    }}
                    onPress={()=> getSearch()}
                >
                    <Image
                        source={icons.right_arrow}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.primary
                        }}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
                {
                    movies.length > 0 ?
                        <MovieHorizontal label={"Movies"} data={movies} navigation={navigation} type={'movie'} />
                        :
                        null
                }
                {
                    tvshows.length > 0 ?
                        <MovieHorizontal label={"TV Shows"} data={tvshows} navigation={navigation} type={'tv'} />
                        :
                        null
                }
                {
                    movies.length > 0 || tvshows.length > 0 ?
                        null
                        :
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Image  source={icons.flick} style={{ width: 200, height: 100 }} />
                            <Text
                                style={{
                                    fontFamily: FONTS.regular,
                                    fontSize: SIZES.font,
                                    color: COLORS.white
                                }}
                            >   
                                Awww snap! No results found
                            </Text>
                        </View>
                }
            </ScrollView>

        </SafeAreaView>
    )
}


export default Search