import '../assets/scss/tasklistmenu.scss'
import PropTypes from 'prop-types'

const TaskListMenu = (props) => {
  const { isCustomList, title, Icon } = props
  return (
    <div className="TaskListMenu">
      <Icon width={44} height={44} />
      <div className="TaskListMenu_Title">{title}</div>
    </div>
  )
}
TaskListMenu.propTypes = {
  isCustomList: PropTypes.bool,
  title: PropTypes.string,
  Icon: PropTypes.elementType,
}

export default TaskListMenu
