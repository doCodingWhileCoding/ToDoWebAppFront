import PropTypes from 'prop-types'

const CloseIcon = (props) => {
  const { width, height } = props
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 -960 960 960">
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  )
}
CloseIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
CloseIcon.defaultProps = {
  width: 24,
  height: 24,
}
export default CloseIcon
