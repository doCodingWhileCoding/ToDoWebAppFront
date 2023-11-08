import PropTypes from 'prop-types'

const CheckIcon = (props) => {
  const { width, height } = props
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 -960 960 960">
      <path fill="white" d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  )
}
CheckIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
CheckIcon.defaultProps = {
  width: 24,
  height: 24,
}
export default CheckIcon
