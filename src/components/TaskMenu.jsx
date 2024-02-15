import PropTypes from 'prop-types'
import AddTaskDate from './AddTaskDate'
import AddTaskTag from './AddTaskTag'
import AddTaskStep from './AddTaskStep'
import AddTaskDueDate from './AddTaskDueDate'
import EditTaskDate from './EditTaskDate'
import { useEditTaskDateModalStore } from '../store/app.store'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { parseISO } from 'date-fns'

const TaskMenu = (props) => {
  const { taskId, date, tag, hasSteps, dueDate, queryKey } = props
  const setEditTaskDateModalData = useEditTaskDateModalStore((state) => state.setEditTaskDateModalData)

  useEffect(() => {
    setEditTaskDateModalData(taskId, queryKey, date)
  })
  return (
    <motion.div className="TaskMenu w-full flex flex-row gap-4">
      <motion.div className="TaskMenu_Add flex flex-col flex-1">
        {/* <motion.div className="tag">Tag</motion.div> */}
        {date && <EditTaskDate date={parseISO(date)} />}
        {/* <motion.div className="dueDate">vie, 1 dic quedan 23 días sdf ffg sdg r</motion.div> */}
      </motion.div>
      <motion.div className="TaskMenu_Edit flex flex-row gap-2 flex-wrap content-end">
        {!date && <AddTaskDate />}
        {/* <AddTaskTag /> */}
        {!hasSteps && <AddTaskStep taskId={taskId} />}
        {/* <AddTaskDueDate /> */}
      </motion.div>
    </motion.div>
  )
}
TaskMenu.propTypes = {
  taskId: PropTypes.string,
  date: PropTypes.string,
  tag: PropTypes.string,
  hasSteps: PropTypes.bool,
  dueDate: PropTypes.string,
  queryKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}
export default TaskMenu
