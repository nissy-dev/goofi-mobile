// import * as React from 'react'
// import { ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
// import { Query } from 'react-apollo'
// import { Container, H2 } from '../atoms'
// import { GOOFI_QUERY, Response, Variables, RepositoryNode } from '../query'
// import I18n from '../locale'

// class GridListViewQuery extends Query<Response, Variables> {}

// interface GridListViewProps {
//   language: string
//   keyword: string
//   navigate: any
// }

// export const GridListViewGQLWrapper: React.SFC<GridListViewProps> = props => {
//   const { language, keyword, navigate } = props
//   const query = `${keyword} language:${language} good-first-issues:>1 stars:>500`
//   return (
//     <GridListViewQuery query={GOOFI_QUERY} variables={{ query }}>
//       {({ loading, data, error }) => {
//         if (loading) {
//           return (
//             <Container>
//               <ActivityIndicator size="large" color="#2ecc71" />
//             </Container>
//           )
//         }
//         if (error) {
//           // return (
//           //   <Container>
//           //     <H2>{error.networkError && I18n.t('networkError')}</H2>
//           //     <H2>
//           //       {error.graphQLErrors.length !== 0 && I18n.t('graphqlError')}
//           //     </H2>
//           //   </Container>
//           // )
//         }

//         // null処理はutilsでやらせる, issueなしの表示切り替えを含めて
//         // FlatListでリファクタ
//         return (
//           <ScrollView contentContainerStyle={styles.listViewContainerStyle}>
//             {data &&
//             data.search &&
//             data.search.nodes &&
//             data.search.nodes.length !== 0
//               ? data.search.nodes.map((val: RepositoryNode) => (
//                   <Card
//                     onPress={() =>
//                       navigate('issueList', { issues: val.issues })
//                     }
//                     data={val}
//                     key={`card-${val.id}`}
//                   />
//                 ))
//               : 'No Data'}
//           </ScrollView>
//         )
//       }}
//     </GridListViewQuery>
//   )
// }
