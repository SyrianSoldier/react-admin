import { css } from 'styled-components'

export const flexCenter = (direction = 'row') => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: center;
  align-items: center;
`

export const cardBoxShadow = () => css`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  transition: box-shadow 300ms ease;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`
export default {}
