import * as React from 'react'
import { Font } from 'expo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { createBottomTabNavigator } from 'react-navigation'
import { SearchIcon, StarIcon, H1 } from './atoms'
import { SearchPage, FavoritePage } from './pages'
import I18n from './locale'

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql'
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.API_TOKEN}`
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const Root = createBottomTabNavigator(
  {
    search: SearchPage,
    favorite: FavoritePage
  },
  {
    initialRouteName: 'search',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        // tintColorとFontawsomeのcolor propertyの型が異なるための処理
        const color = tintColor !== null ? tintColor : ''
        const iconSize = focused ? 25 : 20
        return routeName === 'search' ? (
          <SearchIcon size={iconSize} color={color} />
        ) : (
          <StarIcon size={iconSize} color={color} />
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: '#2ecc71'
    }
  }
)

interface State {
  isAssetsLoaded: boolean
}

export default class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      isAssetsLoaded: false
    }
  }

  async componentWillMount() {
    this.loadAssetsAsync()
  }

  loadAssetsAsync = async () => {
    try {
      await I18n.initAsync()
      await Font.loadAsync({
        regular: require('../assets/fonts/Comfortaa-Regular.ttf'),
        light: require('../assets/fonts/Comfortaa-Light.ttf'),
        bold: require('../assets/fonts/Comfortaa-Bold.ttf')
      })
    } finally {
      this.setState({ isAssetsLoaded: true })
    }
  }

  render() {
    // Fix必要
    return (
      <ApolloProvider client={client}>
        {this.state.isAssetsLoaded ? <Root /> : <H1>{'Text'}</H1>}
      </ApolloProvider>
    )
  }
}
