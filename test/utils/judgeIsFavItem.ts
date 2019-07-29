import { judgeIsFavItem } from '../../src/utils'
import { IssueItem } from '../../src/types'

const favItems = [
  {
    id: '1',
    title: 'item1',
    url: 'url1',
    avatarUrl: 'avatarUrl1'
  },
  {
    id: '2',
    title: 'item2',
    url: 'url2',
    avatarUrl: 'avatarUrl2'
  },
  {
    id: '3',
    title: 'item3',
    url: 'url3',
    avatarUrl: 'avatarUrl3'
  }
] as IssueItem[]

describe('judgeIsFavItem', () => {
  it('judge IsFavItem is false', () => {
    const checkdItem = {
      id: '4',
      title: 'item4',
      url: 'url4',
      avatarUrl: 'avatarUrl4'
    }
    expect(judgeIsFavItem(checkdItem, { favItems })).toBe(false)
  })
  it('judge IsFavItem is true', () => {
    const checkdItem = {
      id: '3',
      title: 'item3',
      url: 'url3',
      avatarUrl: 'avatarUrl3'
    }
    expect(judgeIsFavItem(checkdItem, { favItems })).toBe(true)
  })
})
