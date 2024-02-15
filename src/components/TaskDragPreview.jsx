import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { memo } from 'react'
import CheckIcon from '../assets/icons/CheckIcon'
import DeleteIcon from '../assets/icons/DeleteIcon'

const TaskDragPreview = memo(function TaskDragPreview({ title, isCompleted, width, height }) {
  return (
    <div className="inline-block">
      <motion.div
        className="Task_Preview rounded-xl bg-slate-500 py-3 flex flex-row items-center"
        style={{ width: `${width}px`, height: `${height}px`, scale: 1.02 }}
      >
        <div className="w-20 h-full flex justify-center items-center">
          <motion.div className="h-[24px] w-[24px] flex justify-center items-center border-2 rounded-full">
            {isCompleted && <CheckIcon />}
            {isCompleted && <div></div>}
          </motion.div>
        </div>

        <motion.div className="Task_Preview_Title w-full">
          <div className="text-xl font-semibold">{title}</div>
        </motion.div>
        <div className="w-20 h-full flex justify-center items-center ml-auto">
          <motion.div className="flex justify-center items-center text-red-600">
            <DeleteIcon />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
})
TaskDragPreview.propTypes = {
  title: PropTypes.string,
  isCompleted: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
}
export default TaskDragPreview
