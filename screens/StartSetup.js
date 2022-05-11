import { View, Text, ScrollView, Image, PermissionsAndroid } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, {useState} from 'react'
import Button from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, genre, language, icons, SIZES, video, VIDEOBACKGROUND } from '../constants';
import Tabs from '../navigation/Tabs';
import Video from "react-native-video";

const StartSetup = ({navigation, route}) => {
    const [user, setUser] = useState([
        {
            language: 'en-US',
            genre: {}
        }
    ]);

    

    const setLanguage = async (value) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify({
                ...user, language: value
            }))
            setUser({
                ...user, language: value
            })
        } catch (e) {
            console.log(e)
        }
    }

    const setGenre = async (value) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify({
                ...user, genre: {...user.genre, [value]: true}
            }))
            setUser({
                ...user, genre: {...user.genre, [value]: true}
            })
        } catch (e) {
            console.log(e)
        }
    }
    async function requestPermissions(){
        try {
            const granted = await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ],
              {
                title: "Flix App wants to Access your files for download",
                message:
                  "This app needs this permission, so that it can store the movies in your local storage",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
            );
            console.log(granted)
          } catch (err) {
            console.warn(err);
          }
    }



  return (
    <View
        style={{
            flex: 1,
            backgroundColor: COLORS.transparentBlack,
            padding: 20
        }}
    >
        <Video
            source={video.startup}
            style={{
                position: 'absolute',
                top: -170,
                left: 0,
                bottom: 0,
                right: 0,
                zIndex: -1,
                width: SIZES.width * 3,
                height: SIZES.height + 340,
                opacity: 0.5
            }}
            muted={false}
            repeat={true}
            volume={0.1}
            resizeMode={"cover"}
            rate={1.0}
            ignoreSilentSwitch={"obey"}
        />
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
                    height: 50,
                    width: 100
                }}
            />
            <Text style={{color: COLORS.white}}>alpha v2.0</Text>
        </View>

        <Text
            style={{
                color: COLORS.white,
                fontSize: 18,
                marginTop: 20,
                marginLeft: 20,
                marginBottom: 20,
                textAlign: 'center'
            }}
        >
            Welcome, cinephile. :D {'\n\n'}
            Please select your preferred language and genre.
            You can always change these settings later.
        </Text>

        <View style={{
            borderRadius: 10,  
            overflow: 'hidden',
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20,
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
                    setLanguage(value)
                }}
                selectedValue={user ? user.language : 0}
            >
                <Picker.Item label="Select your language" value="0" />
                {
                    language?.map((item, index) => {
                        return <Picker.Item label={item.language} value={item.locale} key={index} />
                    })
                }
            </Picker>
        </View>
        <Text
            style={{
                color: COLORS.white,
                fontSize: 20,
                marginBottom: 20,
                textAlign: 'center'
            }}
        >Select Genres</Text>
        <ScrollView
            style={{
                flex: 1,
                height: SIZES.height * 0.3,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                }}
            >
                {
                    genre?.map((item, index) => {
                        return <Button
                            key={index}
                            text={item}
                            icon={user?.genre?.find(x => x.genre === item.genre) ? icons.check : null}
                            buttonStyle={{
                                width: SIZES.width * 0.4,
                            }}
                            onPress={() => {
                                if (!user?.genre?.find(x => x.genre === item.genre)) {
                                    setGenre(item.genre)
                                }
                            }}
                        />
                    })
                }
            </View>
        </ScrollView>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20
            }}
        >
            <Button
                text="Setup Later"
                buttonStyle={{
                    width: SIZES.width * 0.4,
                    backgroundColor: COLORS.primary
                }}
                onPress={() => {
                    try{
                        navigation.push('Tabs', {navigation: navigation})
                    }catch(e){
                        console.log(e)
                    }
                    
                }}
            />
            <Button
                text="Save"
                buttonStyle={{
                    width: SIZES.width * 0.4,
                    backgroundColor: user?.language ? COLORS.primary : COLORS.gray
                }}
                onPress={() => {
                    if (user?.language) {
                        navigation.push('Tabs', {navigation: navigation})
                    }
                }}
            />
        </View>

    </View>
  )
}

export default StartSetup