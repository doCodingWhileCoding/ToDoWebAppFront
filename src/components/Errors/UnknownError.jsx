import PropTypes from 'prop-types'
import fallen_coffe from '../../assets/images/fallen_coffe.png'
import CloseIcon from '../../assets/icons/CloseIcon'
const UnknownError = (props) => {
  const { setShowErrorPopUp } = props
  return (
    <div className="UnknownError h-full w-full flex flex-col gap-5 justify-center items-center">
      <h1 className="text-7xl">Oops!</h1>
      <img className="h-2/3 w-auto" src={fallen_coffe} alt="" />
      <p className="text-3xl">Parece que algo no ha ido cómo debería</p>
      <div className="close absolute top-4 right-4 cursor-pointer" onClick={() => setShowErrorPopUp(false)}>
        <CloseIcon width={44} height={44} />
      </div>
    </div>
  )
}
UnknownError.propTypes = {
  setShowErrorPopUp: PropTypes.func,
}
export default UnknownError
