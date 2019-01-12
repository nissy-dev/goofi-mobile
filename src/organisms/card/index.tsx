import * as React from 'react'
import { View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Container, Image, Heading } from '../../atoms'
import { IssueInfo, StarInfo } from '../../molecules'
import { RepositoryNode } from '../../query'
import { WHITE, SHADOW_COLOR } from '../../../assets'

const CardConteiner = styled(TouchableOpacity)`
  flex-direction: column;
  margin-horizontal: 10;
  margin-vertical: 10;
  padding-vertical: 10;
  padding-horizontal: 10;
  width: 157;
  height: 280;
  border-radius: 5;
  background-color: ${WHITE};
  box-shadow: 0 2px 3px ${SHADOW_COLOR};
`

const CardImage = styled(Image)`
  align-self: center;
  border-radius: 10;
  width: 100;
  height: 100;
`

const RepoTitleBox = styled(View)`
  flex: 1;
  justify-content: center;
`

const StarInfoBox = styled(View)`
  margin-top: auto;
  margin-left: auto;
  padding-bottom: 10;
`

const IssueInfoBox = styled(View)`
  margin-bottom: 10;
`

interface Props {
  index: number
  data: RepositoryNode
  onPress: () => void
}

const Card = (props: Props) => {
  const { index, data, onPress } = props
  return (
    <CardConteiner testID={`card-${index}`} onPress={onPress}>
      <CardImage source={{ uri: data.owner.avatarUrl }} />
      <Container>
        <RepoTitleBox>
          <Heading size={18} bold={true}>
            {data.name}
          </Heading>
        </RepoTitleBox>
        <StarInfoBox>
          <StarInfo count={data.stargazers.totalCount} />
        </StarInfoBox>
        <IssueInfoBox>
          <IssueInfo count={data.issues.totalCount} />
        </IssueInfoBox>
      </Container>
    </CardConteiner>
  )
}

export default Card
