import { View } from 'react-native'
import React from 'react'
import { theme, COLORS } from '../constants'

const Pills = ({content}) => {
  return (
        <View
            style={{
                ...theme.categoryContainer,
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                minWidth: 100,
                alignContent: 'center',
                backgroundColor: COLORS.gray,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
                marginHorizontal: 5,
                marginVertical: 5
                
            }}
        >
            {content}
        </View>
  )
}

export default Pills