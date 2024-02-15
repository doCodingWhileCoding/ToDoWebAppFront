import PropTypes from 'prop-types'

const TaskListMenu = (props) => {
  const { title, Icon, IconClassColor } = props
  return (
    <div className="TaskListMenu w-full flex flex-row items-center gap-2">
      <div className={`w-fit h-fit ${IconClassColor}`}>
        <Icon width={44} height={44} />
      </div>
      <div className="TaskListMenu_Title text-5xl font-semibold text-black dark:text-white">{title}</div>
    </div>
  )
}
TaskListMenu.propTypes = {
  title: PropTypes.string,
  Icon: PropTypes.elementType,
  IconClassColor: PropTypes.string,
}

export default TaskListMenu
