import React from 'react'
import Svg, { Path } from 'react-native-svg'

const HomeIcon: React.FC = () => {
  return (
    <Svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 10L19 20H9M5 20L5 10L12 3L15.5 6.5"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default HomeIcon
