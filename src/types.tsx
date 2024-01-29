export type SpeakerStatusType = 'активный' | 'удален'

export type SpeakerType = {
  id: number
  name: string
  phone: string
  email: string
  avatarImg?: string
  status: SpeakerStatusType
  organization?: string
  description: string
}

export type SpeakersRespoonseType = {
  speakers: SpeakerType[]
  organization?: string
}
