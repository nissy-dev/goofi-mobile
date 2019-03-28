export default function removeDuplicateItem(dupList: any[], key: string) { 
  return dupList.filter((item, index, array) => { 
    return array.findIndex(element => item[key] === element[key]) == index
  })
}
