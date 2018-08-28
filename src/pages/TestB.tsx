import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class SearchedListPage extends React.Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text>{'PageB'}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
