import PropTypes from 'prop-types'

const StarIcon = (props) => {
  const { width, height } = props
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 -960 960 960">
      <path d="m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-350Z" />
    </svg>
  )
}
StarIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
StarIcon.defaultProps = {
  width: 24,
  height: 24,
}
export default StarIcon
