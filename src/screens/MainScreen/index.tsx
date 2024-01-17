import React, { useEffect, useState } from 'react'
import { SpeakerType } from '../../types'
import speakersMock from '../../mocks/speakers'
import axios from 'axios'
import styled from 'styled-components/native'
import { Link } from '@react-navigation/native'
import SearchIcon from '../../icons/SearchIcon'
import { TouchableHighlight, View } from 'react-native'
import Breadcrumbs from '../../components/Breadcrumbs'
import HomeIcon from '../../icons/HomeIcon'
import { filterData, setFilterAction } from '../../store/slices/filterSlice'
import { useDispatch } from 'react-redux'
import { IPAddress } from '../../constants'

const MainScreen: React.FC = () => {
  const dispatch = useDispatch()
  const filter = filterData()

  const [speakers, setSpeakers] = useState<SpeakerType[]>([])
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(false)
  const [searchValue, setSearchValue] = useState(filter.company)

  console.log(filter)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://${IPAddress}:3001/speakers/?company=${filter.company}`)
      .then((response) => {
        if (!response) {
          setResponse(true)
        }
        return response
      })
      .then((res) => {
        setSpeakers(res.data.speakers)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        // if (!response) setSpeakers(speakersMock)
      })
  }, [filter])

  const handleOrgEnter = (event: any) => {
    let value = (event.target as HTMLInputElement).value
    if (event.key === 'Enter') {
      dispatch(setFilterAction(value))
    }
  }

  return (
    <Container>
      <Breadcrumbs>
        <HomeIcon />
        <Link to={{ screen: 'Main' }}>Спикеры</Link>
      </Breadcrumbs>
      <SearchContainer>
        <TextInput
          placeholder="Введите название компании"
          value={searchValue}
          onChangeText={setSearchValue}
          onKeyPress={handleOrgEnter}
        />
        <TouchableHighlight
          underlayColor="transparent"
          style={{ width: 24, height: 24 }}
          onPress={() => dispatch(setFilterAction(searchValue))}
        >
          <View>
            <SearchIcon />
          </View>
        </TouchableHighlight>
      </SearchContainer>
      {speakers[0] ? (
        <SpeakersContainer>
          {speakers.map((speaker) => {
            return (
              (speaker.organization?.toLocaleLowerCase().includes(filter.company.toLocaleLowerCase()) ||
                (!filter.company && !speaker.organization)) && (
                <Link key={speaker.id} to={{ screen: 'Speaker', params: { speakerId: speaker.id } }}>
                  <SpeakerCard>
                    <ImageContainer>
                      <Avatar source={speaker.avatarImg.replace('localhost', IPAddress) as any} />
                    </ImageContainer>
                    <Content>
                      <Name>{speaker.name}</Name>
                      <Info>{speaker.organization}</Info>
                    </Content>
                  </SpeakerCard>
                </Link>
              )
            )
          })}
        </SpeakersContainer>
      ) : (
        <NotFound>{!loading && 'Спикеры не найдены'}</NotFound>
      )}
    </Container>
  )
}

const SearchContainer = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`

const TextInput = styled.TextInput`
  height: 40px;
  border-width: 1px;
  border-radius: 5px;
  border-color: #cbcbcb;
  padding: 0 10px;
  width: 270px;
`

const NotFound = styled.Text`
  text-align: center;
  font-size: 16px;
  color: #525252;
  margin-top: 20px;
`

const Info = styled.Text`
  color: #00ddff;
  font-size: 18px;
`

const Name = styled.Text`
  font-size: 26px;
  font-weight: 500;
  padding: 0 0 8px 0;
`

const Avatar = styled.Image`
  width: 100%;
  height: 100%;
`

const Content = styled.View`
  margin-top: 10px;
  align-items: center;
`

const ImageContainer = styled.View`
  height: 170px;
  width: 170px;
  overflow: hidden;
  border-radius: 85px;
`

const SpeakerCard = styled.View`
  align-items: center;
`

const SpeakersContainer = styled.View`
  align-items: center;
  padding: 30px 0;
  gap: 60px;
`

const Container = styled.ScrollView`
  padding: 20px 40px 20px 40px;
  margin: 0 auto;
  width: 100%;
  background: #fff;
`

export default MainScreen
