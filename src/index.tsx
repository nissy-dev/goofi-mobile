import React, { useEffect, useState } from 'react'
import * as Font from 'expo-font'
import { Provider, client } from './apollo'
import Root from './navigation'
import { Loading } from './molecules'
import I18n from './locale'

// for e2e testing
console.disableYellowBox = true

export default function App() {
  const [isAssetsLoaded, setState] = useState(false)

  useEffect(() => {
    // useEffect doesn't allow us to return async function
    const loadAssetsAsync = async () => {
      try {
        await I18n.initAsync()
        await Font.loadAsync({
          regular: require('../assets/fonts/OpenSans-Regular.ttf'),
          light: require('../assets/fonts/OpenSans-Light.ttf'),
          bold: require('../assets/fonts/OpenSans-Bold.ttf')
        })
      } finally {
        setState(true)
      }
    }
    loadAssetsAsync()
  }, [])

  return (
    <Provider client={client}>
      {isAssetsLoaded ? <Root /> : <Loading />}
    </Provider>
  )
}
