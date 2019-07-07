import { createIssueItems } from '../../src/utils'
import { IssueNode } from '../../src/query'

describe('createIssueItems', () => {
  it('convert from IssueNode to IssueItem', () => {
    const nodes = [
      {
        id: '1',
        title: 'test1',
        url: 'url1',
        author: {
          avatarUrl: 'avatarUrl1'
        },
        updatedAt: '2019/01/12'
      },
      {
        id: '2',
        title: 'test2',
        url: 'url2',
        author: {
          avatarUrl: 'avatarUrl2'
        },
        updatedAt: '2019/01/13'
      },
      {
        id: '3',
        title: 'test3',
        url: 'url3',
        author: {
          avatarUrl: 'avatarUrl3'
        },
        updatedAt: '2019/01/14'
      }
    ] as IssueNode[]
    const expected = [
      {
        id: '1',
        title: 'test1',
        url: 'url1',
        avatarUrl: 'avatarUrl1'
      },
      {
        id: '2',
        title: 'test2',
        url: 'url2',
        avatarUrl: 'avatarUrl2'
      },
      {
        id: '3',
        title: 'test3',
        url: 'url3',
        avatarUrl: 'avatarUrl3'
      }
    ]
    expect(createIssueItems(nodes)).toEqual(expected)
  })
})
