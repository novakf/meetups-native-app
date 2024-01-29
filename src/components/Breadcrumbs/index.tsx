import React, { ReactNode } from 'react'
import ArrowRight from '../../icons/ArrowRight'
import styled from 'styled-components/native'

type Props = {
  children: ReactNode[] | ReactNode
}

const Breadcrumbs: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      {Array.isArray(children) ? (
        children.map((child, i) => {
          return (
            <Section key={i}>
              {child}
              {i !== children.length - 1 && <SArrowRight />}
            </Section>
          )
        })
      ) : (
        <Section>{children}</Section>
      )}
    </Container>
  )
}

const SArrowRight = styled(ArrowRight)`
  width: 14px;
`

const Container = styled.View`
  flex-direction: row;
  background: #fff;
  border-radius: 15px;
  width: auto;
  z-index: 1;
  gap: 5px;
  padding: 6px 10px;
`

const Section = styled.View`
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  gap: 5px;
`

export default Breadcrumbs
