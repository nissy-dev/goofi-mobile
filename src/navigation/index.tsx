import * as React from 'react'
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import { SearchIcon, StarOIcon } from '../atoms'
import { SearchPage, FavoritePage, IssueListPage } from '../pages'
import { BASE_COLOR } from '../../assets'

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
    navigationOptions: ({ navigation }: any) => ({
      tabBarIcon: ({ focused, tintColor }: any) => {
        const { routeName } = navigation.state
        // tintColorとFontawsomeのcolor propertyの型が異なるための処理
        const color = tintColor !== null ? tintColor : ''
        const iconSize = focused ? 25 : 20
        return routeName === 'search' ? (
          <SearchIcon size={iconSize} color={color} />
        ) : (
          <StarOIcon size={iconSize} color={color} />
        )
      },
      tabBarTestID:
        navigation.state.routeName === 'search' ? 'search-tab' : 'favorite-tab'
    }),
    tabBarOptions: {
      activeTintColor: BASE_COLOR
    }
  }
)

export default Root
