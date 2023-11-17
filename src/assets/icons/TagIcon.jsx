import PropTypes from 'prop-types'

const TagIcon = (props) => {
  const { width, height } = props
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 -960 960 960">
      <path d="M570-104q-23 23-57 23t-57-23L104-456q-11-11-17.5-26T80-514v-286q0-33 23.5-56.5T160-880h286q17 0 32 6.5t26 17.5l352 353q23 23 23 56.5T856-390L570-104Zm-57-56 286-286-353-354H160v286l353 354ZM260-640q25 0 42.5-17.5T320-700q0-25-17.5-42.5T260-760q-25 0-42.5 17.5T200-700q0 25 17.5 42.5T260-640ZM160-800Z" />
    </svg>
  )
}
TagIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
TagIcon.defaultProps = {
  width: 24,
  height: 24,
}
export default TagIcon
