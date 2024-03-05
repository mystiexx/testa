import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants/theme'

const Header = ({ question, index, type }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.crumb}>{index+1}/{question}</Text>
      <Text style={styles.title}>{type === 'boolean' ? 'True or false' : 'Mutiple Choice'}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
        display: 'flex',
        gap: 60,
        flexDirection:'row',
        alignItems:'center'
    },
    crumb: {
        fontSize: 20,
        color: colors.white,
        fontFamily: 'bold'
    },

    title:{
        color:colors.white,
        fontSize:24,
        fontFamily: 'bold'
    }
})