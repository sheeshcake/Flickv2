import { View, Text, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SIZES, COLORS, api} from '../constants'

const CompaniesDetails = ({companies}) => {
    const [companiesData, setCompaniesData] = useState([])

    useEffect(() => {
        setCompaniesData(companies)
    }, [companies])

  return (
    <View
        style={{
            flex: 1,
            flexDirection: 'column',
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
                >Production Companies</Text>
        </View>
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingHorizontal: SIZES.padding,
                marginBottom: 10
            }}
        >
                {
                    companiesData?.map((x, i) => {
                        return (
                            <View
                                key={`companies-${i}`}
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    width: SIZES.width * 0.2,
                                    height: SIZES.width * 0.2,
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    style={{
                                        minWidth: SIZES.width * 0.5,
                                        marginBottom: 10

                                    }}
                                    resizeMode="contain"
                                    source={{ uri: `${api?.poster_api[6].url}${x.logo_path}` }}
                                />
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        fontSize: 20,
                                        textAlign: 'left',
                                    }}
                                >{x.name}</Text>
                            </View>
                        )
                    })  
                }
        </View>
    </View>
  )
}

export default CompaniesDetails