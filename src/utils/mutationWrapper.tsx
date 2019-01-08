import * as React from 'react'
import { Mutation } from 'react-apollo'
import { DocumentNode } from 'graphql'

const MutaionWrapper = (query: DocumentNode, variables: Object) => (
  Component: React.ComponentType<any>
) => {
  return (
    <Mutation mutation={query} variables={variables}>
      {action => {
        return <Component action={action} />
      }}
    </Mutation>
  )
}

export default MutaionWrapper
