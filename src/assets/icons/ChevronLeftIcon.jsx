import PropTypes from 'prop-types'

const ChevronLeftIcon = (props) => {
  const { width, height } = props
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 -960 960 960">
      <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
    </svg>
  )
}
ChevronLeftIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
ChevronLeftIcon.defaultProps = {
  width: 24,
  height: 24,
}
export default ChevronLeftIcon
