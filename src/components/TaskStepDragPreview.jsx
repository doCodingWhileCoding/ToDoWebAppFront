import PropTypes from 'prop-types'
import { memo } from 'react'
import { motion } from 'framer-motion'
import CheckIcon from '../assets/icons/CheckIcon'
import MenuIcon from '../assets/icons/MenuIcon'
import CircleIcon from '../assets/icons/CircleIcon'

const TaskStepDragPreview = memo(function TaskDragPreview({ title, isCompleted, width, height }) {
  return (
    <div className="inline-block">
      <motion.div
        className="Task_Preview rounded-md bg-slate-300 p-2 flex flex-row gap-2 overflow-x-hidden"
        style={{ width: `${width}px`, height: `${height}px`, scale: 1.02 }}
      >
        <motion.div className="flex justify-center">
          {isCompleted && (
            <div className="w-fit h-fit text-zinc-500">
              <CheckIcon width={28} height={28} />
            </div>
          )}
          {!isCompleted && (
            <div className="w-fit h-fit text-blue-500">
              <CircleIcon width={28} height={28} />
            </div>
          )}
        </motion.div>
        <motion.div className="Task_Preview_Title overflow-x-hidden">
          <div className="text-xl font-semibold overflow-x-hidden break-words">{title}</div>
        </motion.div>
        <div className="text-zinc-500 ml-auto">
          <MenuIcon />
        </div>
      </motion.div>
    </div>
  )
})
TaskStepDragPreview.propTypes = {
  title: PropTypes.string,
  isCompleted: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
}
export default TaskStepDragPreview
