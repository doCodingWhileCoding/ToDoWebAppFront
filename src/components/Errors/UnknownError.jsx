import '../../assets/scss/unknownerror.scss'
import PropTypes from 'prop-types'
import fallen_coffe from '../../assets/images/fallen_coffe.png'
import CloseIcon from '../../assets/icons/CloseIcon'
const UnknownError = (props) => {
  const { setShowErrorPopUp } = props
  return (
    <div className="UnknownError">
      <h1>Oops!</h1>
      <img src={fallen_coffe} alt="" />
      <p>Parece que algo no ha ido cómo debería</p>
      <div className="close" onClick={() => setShowErrorPopUp(false)}>
        <CloseIcon />
      </div>
    </div>
  )
}
UnknownError.propTypes = {
  setShowErrorPopUp: PropTypes.func,
}
export default UnknownError
