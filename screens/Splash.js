import { View, Text, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import {COLORS, icons} from '../constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        try {
            // await AsyncStorage.clear();
            const user = await AsyncStorage.getItem('user');
            console.log(user)
            if (user) {
                navigation.push('Tabs')
            }else{
                navigation.push('StartSetup')
            }
        } catch (e) {
            console.log(e)
        }
    }
  return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.black,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20

                }}
            >
                <Image
                    source={icons.flick}
                    style={{
                        width: 200,
                        height: 100,
                    }}
                />
                <Text style={{
                    color: COLORS.white,
                    fontSize: 18,
                    marginBottom: 20,
                    textAlign: 'center'
                }}>alpha v2.0</Text>
            </View>
        </View>
  )
}

export default Splash