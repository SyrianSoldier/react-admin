import { css } from 'styled-components'

export const slideFade = css`
  .slideFade-exit {
    transition: all 200ms ease;
  }

  .slideFade-exit-active {
    opacity: 0;
  }

  .slideFade-enter {
    opacity: 0;
    transform: translateX(50%);
    transition: all 200ms ease;
  }

  .slideFade-enter-active {
    opacity: 1;
    transform: translateX(0);
  }
`
export default {}
