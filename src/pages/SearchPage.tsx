import * as React from 'react'
import { Picker } from 'react-native'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import {
  Container,
  InputBox,
  SearchIcon,
  CloseIcon,
  TouchableView,
  H1,
  H2
} from '../atoms'
import pickerItems from '../utils/createPickerItems'

const ModalCloseButton = styled(TouchableView)`
  margin-left: auto;
  margin-right: 10;
  margin-top: 20;
`

const SearchBar = styled(Container)`
  flex-direction: row;
  padding-top: 10;
  padding-horizontal: 30;
  width: 100%;
  height: 80;
  background-color: #2ecc71;
`

const StyledModal = styled(Modal)`
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 80;
  padding-horizontal: 10
  border-radius: 30;
  background-color: #2ecc71;
`

interface State {
  modalVisible: boolean
  language: string
}

export default class SearchPage extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      modalVisible: false,
      language: ''
    }
  }

  setModalVisible(visible: boolean): void {
    this.setState({ modalVisible: visible })
  }

  render() {
    return (
      <Container>
        <SearchBar>
          <InputBox />
          <TouchableView
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}
          >
            <SearchIcon size={20} color={'#ffffff'} />
          </TouchableView>
        </SearchBar>
        <StyledModal
          animationIn={'slideInDown'}
          animationOut={'slideOutUp'}
          backdropOpacity={0.7}
          isVisible={this.state.modalVisible}
        >
          <Container>
            <ModalCloseButton
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}
            >
              <CloseIcon size={30} color={'#ffffff'} />
            </ModalCloseButton>
            <H2 color={'#ffffff'}>{'Select Language'}</H2>
            <Picker
              selectedValue={this.state.language}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ language: itemValue })
              }
            >
              {/* <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" /> */}
              {/* {pickerItems.map(val => <Picker.Item label={val[]} value="js" />)} */}
            </Picker>
            <H2 color={'#ffffff'}>{'Input Keyword'}</H2>
            <InputBox />
          </Container>
        </StyledModal>
      </Container>
    )
  }
}
