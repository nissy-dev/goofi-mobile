import * as React from 'react'
import {
  createAppContainer,
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
    defaultNavigationOptions: {
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
    defaultNavigationOptions: ({ navigation }: any) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }: any) => {
        const { routeName } = navigation.state
        const iconSize = focused ? 25 : 20
        return routeName === 'search' ? (
          <SearchIcon size={iconSize} color={tintColor} />
        ) : (
          <StarOIcon size={iconSize} color={tintColor} />
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

export default createAppContainer(Root)
