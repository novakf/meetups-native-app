import { Link, RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SpeakerType } from '../../types'
import axios from 'axios'
import speakersMock from '../../mocks/speakers'
import styled from 'styled-components/native'
import Breadcrumbs from '../../components/Breadcrumbs'
import HomeIcon from '../../icons/HomeIcon'

type Props = {
  route: RouteProp<{ params: { speakerId: number } }, 'params'>
}

const SpeakerScreen: React.FC<Props> = ({ route }) => {
  const { speakerId } = route.params

  const [response, setResponse] = useState(false)
  const [currentSpeaker, setCurrentSpeaker] = useState<SpeakerType | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:3001/speakers/${speakerId}`)
      .then((response) => {
        if (response) {
          setResponse(true)
        }
        return response
      })
      .then((result) => {
        setCurrentSpeaker(result.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log('SpeakerError', error)
        setLoading(false)
        if (!response) setCurrentSpeaker(speakersMock.find((speaker) => speaker.id === speakerId))
      })
  }, [])

  return currentSpeaker ? (
    <Container>
      <Breadcrumbs>
        <HomeIcon />
        <Link to={{ screen: 'Main' }}>Спикеры</Link>
        <Link to={{ screen: 'Speaker', params: { speakerId: speakerId } }}>{currentSpeaker.name}</Link>
      </Breadcrumbs>
      <SpeakerContainer>
        <Banner>
          <AvatarContainer>
            <Avatar source={currentSpeaker.avatarImg as any} />
          </AvatarContainer>
          <MainInfo>
            <Name>{currentSpeaker.name}</Name>
            <CompanyName>{currentSpeaker.organization}</CompanyName>
          </MainInfo>
        </Banner>
        <Info>
          <About>
            <Title>Обо мне</Title>
            <Description>{currentSpeaker.description}</Description>
          </About>
          <Contacts>
            <ContactsContainer style={styles.shadowProp}>
              <TitleSmall>Телефон:</TitleSmall>
              <Description>{currentSpeaker.phone}</Description>
              <TitleSmall>Почта:</TitleSmall>
              <Email>{currentSpeaker.email}</Email>
            </ContactsContainer>
          </Contacts>
        </Info>
      </SpeakerContainer>
    </Container>
  ) : (
    <View>
      <Error>{!loading && 'Спикер не найден'}</Error>
    </View>
  )
}

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
})

const Container = styled.ScrollView`
  padding: 20px 40px 20px 40px;
  margin: 0 auto;
  width: 100%;
`

const Error = styled.Text`
  font-size: 16px;
`

const SpeakerContainer = styled.View`
  margin-top: 40px;
`

const Email = styled.Text`
  font-size: 16px;
  color: #525252;
  margin-bottom: 10px;
`

const TitleSmall = styled.Text`
  font-size: 16px;
  margin-bottom: 4px;
  color: #535c65;
  font-weight: 600;
`

const ContactsContainer = styled.View`
  border-radius: 10px;
  padding: 10px;
  background: white;
  margin-top: 20px;
  width: 310px;
`

const Contacts = styled.View`
  width: 100%;
`

const Description = styled.Text`
  font-size: 16px;
  color: #525252;
  margin-bottom: 10px;
  line-height: 20px;
`

const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 10px;
`

const About = styled.View`
  width: 100%;
`

const Info = styled.Text`
  gap: 20px;
  flex-direction: column;
`

const CompanyName = styled.Text`
  color: #00ddff;
  font-size: 18px;
`

const Name = styled.Text`
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c2e51;
  font-size: 30px;
  width: 200px;
`

const MainInfo = styled.View`
  margin-left: 20px;
`

const Avatar = styled.Image`
  width: 100%;
  height: 100%;
`

const AvatarContainer = styled.View`
  height: 120px;
  width: 120px;
  overflow: hidden;
  border-radius: 60px;
  margin: 0;
`

const Banner = styled.View`
  align-items: center;
  margin-bottom: 30px;
  border-bottom-width: 1px;
  border-bottom-color: #c9c9c9;
  padding-bottom: 30px;
  flex-direction: row;
`

export default SpeakerScreen
