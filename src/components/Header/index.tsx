import React from 'react'
import styled from 'styled-components/native'
import logo from '../../assets/logo-bmstu.png'
import { Link } from '@react-navigation/native'
import { Text } from 'react-native'

const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <Link to={{ screen: 'Main' }}>
          <LogoImg source={logo as any} />
        </Link>
        <Column>|</Column>
        <Text style={{ fontSize: 20 }}>Митапы.</Text>
      </Content>
    </Container>
  )
}

const Column = styled.Text`
  font-size: 20px;
  margin: 0 10px;
  font-weight: 100;
  align-items: center;
`

const LogoImg = styled.Image`
  width: 32px;
  height: 40px;
`

const Container = styled.View`
  padding-left: 25px;
`

const Content = styled.View`
  flex-direction: row;
  align-items: center;
`

export default Header
