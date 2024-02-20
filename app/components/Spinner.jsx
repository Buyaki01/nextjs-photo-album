import { BounceLoader } from "react-spinners"

const Spinner = () => {
  return (
    <BounceLoader data-testid="loading-spinner" color={'#d40d9a'} speedMultiplier={2} />
  )
}

export default Spinner