import { View, Text, ScrollView, Animated } from 'react-native'
import React, {useState, useEffect} from 'react'
import Hero from '../components/Hero'
import { api, SIZES, COLORS } from '../constants'
import PageInicator from '../components/PageInicator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeHeader from '../components/HomeHeader'
import MovieHorizontal from '../components/MovieHorizontal'

const Home = ({navigation}) => {
    const [movies, setMovies] = useState([])
    const [userData, setUserData] = useState(null)
    const [tvshows, setTvShows] = useState([])
    const pageIndicatorX = React.useRef(new Animated.Value(0)).current;
    useEffect(() => {
        console.log("starting")
        getUserData()
        getMovies()
        getTVShows()
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


    const getMovies = async () => {
        let temp = [...movies];
        const hero = await fetch(`${api.tmdb_api}discover/movie?api_key=${api.api_key}&language=${userData?.language || 'en-US'}&page=1`)
        data = await hero.json()
        temp["hero"] = data.results;
        ///////////////////////////////
        const latest = await fetch(`${api.tmdb_api}movie/top_rated?api_key=${api.api_key}&language=${userData?.language || 'en-US'}&page=1`)
        data = await latest.json()
        temp["latest"] = data.results;
        ///////////////////////////////
        const action = await fetch(`${api.tmdb_api}discover/movie?api_key=${api.api_key}&with_genres=28&language=${userData?.language || 'en-US'}&page=2`)
        data = await action.json()
        temp["action"] = data.results;
        ///////////////////////////////
        const horror = await fetch(`${api.tmdb_api}discover/movie?api_key=${api.api_key}&with_genres=27&language=${userData?.language || 'en-US'}`)
        data = await horror.json()
        temp["horror"] = data.results;
        ///////////////////////////////
        const romance = await fetch(`${api.tmdb_api}discover/movie?api_key=${api.api_key}&with_genres=10749&language=${userData?.language || 'en-US'}`)
        data = await romance.json()
        temp["romance"] = data.results;
        setMovies(temp)
        console.log("Movies Loaded!")
    }

    const getTVShows = async () => {
        let temp = [...movies];
        const hero = await fetch(`${api.tmdb_api}discover/tv?api_key=${api.api_key}&language=${userData?.language || 'en-US'}&page=1`)
        data = await hero.json()
        temp["hero"] = data.results;
        ///////////////////////////////
        const latest = await fetch(`${api.tmdb_api}tv/top_rated?api_key=${api.api_key}&language=${userData?.language || 'en-US'}&page=1`)
        data = await latest.json()
        temp["latest"] = data.results;
        ///////////////////////////////
        const action = await fetch(`${api.tmdb_api}discover/tv?api_key=${api.api_key}&with_genres=28&language=${userData?.language || 'en-US'}&page=2`)
        data = await action.json()
        temp["action"] = data.results;
        ///////////////////////////////
        const horror = await fetch(`${api.tmdb_api}discover/tv?api_key=${api.api_key}&with_genres=27&language=${userData?.language || 'en-US'}`)
        data = await horror.json()
        temp["horror"] = data.results;
        ///////////////////////////////
        const romance = await fetch(`${api.tmdb_api}discover/tv?api_key=${api.api_key}&with_genres=10749&language=${userData?.language || 'en-US'}`)
        data = await romance.json()
        temp["romance"] = data.results;
        setTvShows(temp)
        console.log("Movies Loaded!")
    }

  return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}
        >
            <HomeHeader />
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: COLORS.black
                }}
            >
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20
                }}
            >
                <Text
                    style={{
                        fontSize: SIZES.h1,
                        color: COLORS.white,
                        fontWeight: 'bold',
                        marginTop: SIZES.base
                    }}
                >
                    Movies
                </Text>
            </View>
            <Hero navigation={navigation} data={movies?.hero} pageIndicatorX={pageIndicatorX} type={'movie'}/>
            <PageInicator data={movies?.hero} pageIndicatorX={pageIndicatorX} type={"movie"}/>
            <MovieHorizontal navigation={navigation} data={movies?.latest} label={"Top Rated"}  type={"movie"}/>
            <MovieHorizontal navigation={navigation} data={movies?.action} label={"Action"} type={"movie"}/>
            <MovieHorizontal navigation={navigation} data={movies?.horror} label={"Horror"} type={"movie"}/>
            <MovieHorizontal navigation={navigation} data={movies?.romance} label={"Romance"} type={"movie"}/>

            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20
                }}
            >
                <Text
                    style={{
                        fontSize: SIZES.h1,
                        color: COLORS.white,
                        fontWeight: 'bold',
                        marginTop: SIZES.base
                    }}
                >
                    TV Shows
                </Text>
            </View>
            <Hero navigation={navigation} data={tvshows?.hero} pageIndicatorX={pageIndicatorX} type={'tv'}/>
            <PageInicator data={tvshows?.hero} pageIndicatorX={pageIndicatorX} type={"tv"}/>
            <MovieHorizontal navigation={navigation} data={tvshows?.latest} label={"Top Rated"}  type={"tv"}/>
            {/* <MovieHorizontal navigation={navigation} data={tvshows?.action} label={"Action"} type={"tv"}/>
            <MovieHorizontal navigation={navigation} data={tvshows?.horror} label={"Horror"} type={"tv"}/> */}
            <MovieHorizontal navigation={navigation} data={tvshows?.romance} label={"Romance"} type={"tv"}/>
            </ScrollView>
        </View>
  )
}

export default Home