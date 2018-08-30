import * as React from 'react'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { createBottomTabNavigator } from 'react-navigation'
import { SearchIcon, StarIcon } from './atoms'
import { TestA, TestB } from './pages'
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
    search: TestA,
    favorite: TestB
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
      activeTintColor: '#e91e63'
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

  componentWillMount() {
    this.loadAssetsAsync()
  }

  loadAssetsAsync = async () => {
    try {
      await I18n.initAsync()
    } finally {
      this.setState({ isAssetsLoaded: true })
    }
  }

  render() {
    // Fix必要
    return (
      <ApolloProvider client={client}>
        {this.state.isAssetsLoaded ? <Root /> : <Root />}
      </ApolloProvider>
    )
  }
}
