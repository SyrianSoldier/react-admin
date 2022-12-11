import { css } from 'styled-components'

export const flexCenter = (direction = 'row') => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: center;
  align-items: center;
`

export default {}
