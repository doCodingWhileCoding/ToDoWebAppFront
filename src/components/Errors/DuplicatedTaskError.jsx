import '../../assets/scss/duplicatedtaskerror.scss'
import PropTypes from 'prop-types'
import duplicated_task from '../../assets/images/duplicated_task.png'
import CloseIcon from '../../assets/icons/CloseIcon'
const DuplicatedTaskError = (props) => {
  const { setShowErrorPopUp } = props
  return (
    <div className="DuplicatedTaskError">
      <h1>Tarea duplicada</h1>
      <img src={duplicated_task} alt="" />
      <p>Ya existe una tarea con ese mismo título</p>
      <div className="close" onClick={() => setShowErrorPopUp(false)}>
        <CloseIcon />
      </div>
    </div>
  )
}
DuplicatedTaskError.propTypes = {
  setShowErrorPopUp: PropTypes.func,
}
export default DuplicatedTaskError
