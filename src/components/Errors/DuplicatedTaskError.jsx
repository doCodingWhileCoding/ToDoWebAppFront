import PropTypes from 'prop-types'
import duplicated_task from '../../assets/images/duplicated_task.png'
import CloseIcon from '../../assets/icons/CloseIcon'
const DuplicatedTaskError = (props) => {
  const { setShowErrorPopUp } = props
  return (
    <div className="DuplicatedTaskError w-full h-full flex flex-col gap-5 justify-center items-center">
      <h1 className="text-7xl">Tarea duplicada</h1>
      <img className="h-3/5 w-auto" src={duplicated_task} alt="" />
      <p className="text-3xl">Ya existe una tarea con ese mismo título</p>
      <div className="close absolute top-4 right-4 cursor-pointer" onClick={() => setShowErrorPopUp(false)}>
        <CloseIcon width={44} height={44} />
      </div>
    </div>
  )
}
DuplicatedTaskError.propTypes = {
  setShowErrorPopUp: PropTypes.func,
}
export default DuplicatedTaskError
