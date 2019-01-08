import * as React from 'react'
import { WebView } from 'react-native'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import Loading from '../loading'
import { WebViewHeader } from '../header'
import { PAGE_BACK_GROUND } from '../../../assets'
import { IssueNode } from '../../query'

const StyledModal = styled(Modal)`
  flex: 1;
  margin-horizontal: 0;
  margin-vertical: 0;
  background-color: ${PAGE_BACK_GROUND};
`

interface Props {
  isVisible: boolean
  selectedIssueItem: IssueNode
  favStatus: boolean
  onPressBackBtn: (visible: boolean) => void
  onPressFavBtn: () => void
}

const WebViewModal = (props: Props) => {
  const {
    isVisible,
    onPressBackBtn,
    favStatus,
    onPressFavBtn,
    selectedIssueItem
  } = props
  return (
    <StyledModal
      animationIn={'slideInDown'}
      animationOut={'slideOutUp'}
      isVisible={isVisible}
      backdropOpacity={1.0}
    >
      <WebViewHeader
        favStatus={favStatus}
        onPressBackBtn={() => onPressBackBtn(!isVisible)}
        onPressFavBtn={onPressFavBtn}
      />
      <WebView
        startInLoadingState
        renderLoading={() => <Loading />}
        source={{ uri: selectedIssueItem.url }}
      />
    </StyledModal>
  )
}

export default WebViewModal
