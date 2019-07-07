import * as React from 'react'
import * as Font from 'expo-font'
import { Provider, client } from './apollo'
import Root from './navigation'
import { Loading } from './molecules'
import I18n from './locale'

interface State {
  isAssetsLoaded: boolean
}

export default class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      isAssetsLoaded: false
    }
  }

  componentWillMount() {
    this.loadAssetsAsync()
  }

  loadAssetsAsync = async () => {
    try {
      await I18n.initAsync()
      await Font.loadAsync({
        regular: require('../assets/fonts/OpenSans-Regular.ttf'),
        light: require('../assets/fonts/OpenSans-Light.ttf'),
        bold: require('../assets/fonts/OpenSans-Bold.ttf')
      })
    } finally {
      this.setState({ isAssetsLoaded: true })
    }
  }

  render() {
    const { isAssetsLoaded } = this.state
    return (
      <Provider client={client}>
        {isAssetsLoaded ? <Root /> : <Loading />}
      </Provider>
    )
  }
}
