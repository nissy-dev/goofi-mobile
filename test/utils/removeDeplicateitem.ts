import { removeDuplicateItem } from '../../src/utils'

describe('removeDeplicateitem', () => {
  it('removeDeplicateitem', () => {
    const dupArray = [
      { key: 'a', data: 'Alice'},
      { key: 'a', data: 'Antonio'},
      { key: 'a', data: 'Amanda'},
      { key: 'b', data: 'Bob'  },
      { key: 'c', data: 'Chris'},
      { key: 'c', data: 'Cindy'},
    ]
    // 前方の重複が優先して残される
    const expected = [
      { key: 'a', data: 'Alice' },
      { key: 'b', data: 'Bob' },
      { key: 'c', data: 'Chris' },
    ]
    expect(removeDuplicateItem(dupArray, 'key')).toEqual(expected)
  })
})