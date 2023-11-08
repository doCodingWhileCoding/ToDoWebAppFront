import PropTypes from 'prop-types'
import '../assets/scss/taskmenu.scss'

const TaskMenu = (props) => {
  const { hasNotes } = props
  return <div className="TaskMenu"></div>
}
TaskMenu.propTypes = {
  hasNotes: PropTypes.bool,
}
export default TaskMenu
