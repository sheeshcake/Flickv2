import { View, Text, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SIZES, COLORS } from '../constants'

const PageInicator = ({pageIndicatorX, data}) => {

    const [currentPage, setCurrentPage] = useState(0)
    const dotPosition = Animated.divide(currentPage, SIZES.width)
    useEffect(() => {
        console.log(dotPosition)
        setCurrentPage(pageIndicatorX)
    }, [pageIndicatorX])


    return (
        <View
            style={{
                marginTop: SIZES.padding,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {data ? data?.map((item,index) => {

                const opacity = dotPosition?.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                })

                const dotWidth = dotPosition?.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [6, 20, 6],
                    extrapolate: 'clamp'
                })

                const dotColor = dotPosition?.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
                    extrapolate: 'clamp'
                })

                return (
                    <Animated.View
                        key={`dot-${index}`}
                        opacity={opacity}
                        style={{
                            borderRadius: SIZES.radius,
                            marginHorizontal: 3,
                            width: dotWidth,
                            height: 6,
                            backgroundColor: dotColor
                        }}
                    >

                    </Animated.View>
                )
            }) : null}
        </View>
    )
}

export default PageInicator