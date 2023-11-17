import PropTypes from 'prop-types'

const ChevronRightIcon = (props) => {
  const { width, height } = props
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 -960 960 960">
      <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
    </svg>
  )
}
ChevronRightIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
ChevronRightIcon.defaultProps = {
  width: 24,
  height: 24,
}
export default ChevronRightIcon
