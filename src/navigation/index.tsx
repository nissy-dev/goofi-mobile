import * as React from 'react'
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import { SearchIcon, StarOIcon } from '../atoms'
import { SearchPage, FavoritePage, IssueListPage } from '../pages'

const SearchScreen = createStackNavigator(
  {
    repoList: SearchPage,
    issueList: IssueListPage
  },
  {
    initialRouteName: 'repoList',
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
)

const Root = createBottomTabNavigator(
  {
    search: SearchScreen,
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
          <StarOIcon size={iconSize} color={color} />
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: '#2ecc71'
    }
  }
)

export default Root
