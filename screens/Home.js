import { View, Text, ScrollView, Animated } from 'react-native'
import React, {useState, useEffect} from 'react'
import Hero from '../components/Hero'
import { api, SIZES, COLORS } from '../constants'
import PageInicator from '../components/PageInicator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tabs from '../navigation/Tabs'
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
        getHeroMovies()
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


    const getHeroMovies = async () => {
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
        setMovies(temp)
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
            <Hero navigation={navigation} data={movies?.hero} pageIndicatorX={pageIndicatorX} type={'movie'}/>
            <PageInicator data={movies?.hero} pageIndicatorX={pageIndicatorX} type={"movie"}/>
            <MovieHorizontal navigation={navigation} data={movies?.latest} label={"Top Rated"}  type={"movie"}/>
            <MovieHorizontal navigation={navigation} data={movies?.action} label={"Action"} type={"movie"}/>
            </ScrollView>
        </View>
  )
}

export default Home