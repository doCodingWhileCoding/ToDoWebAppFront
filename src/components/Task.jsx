import '../assets/scss/task.scss'
import PropTypes from 'prop-types'
import { useEffect, useState, useRef, forwardRef } from 'react'
import { motion, Reorder, useDragControls } from 'framer-motion'
import TaskState from './TaskState'
import TaskTitle from './TaskTitle'
import TaskNotes from './TaskNotes'
import { useTaskStore } from '../store/app.store'
import DeleteTask from './DeleteTask'
import TaskMenu from './TaskMenu'
import TaskStepList from './TaskStepList'
const Task = forwardRef((props, lastTaskRef) => {
  const { title, note, isCompleted, date, taskId, task, queryKey } = props
  const [isEditMode, setIsEditMode] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const [hasSteps, setHasSteps] = useState(false)
  const needAnimationTasksId = useTaskStore((state) => state.needAnimationTasksId)
  const removeNeedAnimationTaskId = useTaskStore((state) => state.removeNeedAnimationTaskId)
  const taskRef = useRef(null)
  const controls = useDragControls()
  useEffect(() => {
    if (lastTaskRef && taskRef.current) {
      lastTaskRef.current = taskRef.current
    }
  }, [lastTaskRef])
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (taskRef.current && !taskRef.current.contains(event.target)) {
        setIsEditMode(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [isEditMode])
  const Taskvariants = {
    hidden: {
      opacity: 0.3,
      transition: {
        duration: 2,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  }
  return (
    <Reorder.Item
      value={task}
      dragListener={false}
      dragControls={controls}
      ref={taskRef}
      className="Task"
      layout
      transition={{ layout: { duration: 0.3 } }}
      onAnimationComplete={() => removeNeedAnimationTaskId(taskId)}
      initial={needAnimationTasksId.includes(taskId) ? 'hidden' : 'visible'}
      animate="visible"
      exit="exit"
      variants={Taskvariants}
    >
      <motion.div
        className="Task_Preview"
        layout="position"
        onClick={() => setIsEditMode(true)}
        onPointerDown={(e) => controls.start(e)}
      >
        <motion.div className="Task_Preview_State">
          <TaskState
            taskId={taskId}
            isCompleted={isCompleted}
            isCompleting={isCompleting}
            setIsCompleting={setIsCompleting}
          />
        </motion.div>
        <motion.div className="Task_Preview_Title">
          <TaskTitle
            queryKey={queryKey}
            taskId={taskId}
            title={title}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            isCompleted={isCompleted}
            isCompleting={isCompleting}
          />
        </motion.div>

        <motion.div className="Task_Preview_Delete" style={{ marginLeft: 'auto' }}>
          <DeleteTask taskId={taskId} queryKey={queryKey} />
        </motion.div>
      </motion.div>
      {isEditMode && (
        <motion.div
          className="Task_Content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <TaskNotes taskId={taskId} note={note} queryKey={queryKey} />
          <TaskStepList taskId={taskId} setHasSteps={setHasSteps} />
          <TaskMenu date={date} taskId={taskId} hasSteps={hasSteps} />
        </motion.div>
      )}
      {/* <motion.div className="Task_State" layout="position">
        <TaskState
          taskId={taskId}
          isCompleted={isCompleted}
          isCompleting={isCompleting}
          setIsCompleting={setIsCompleting}
        />
      </motion.div>
      <motion.div className="Task_Content" onClick={() => setIsEditMode(true)}>
        <motion.div className="Task_Content_Preview" layout="position" onPointerDown={(e) => controls.start(e)}>
          <TaskTitle
            queryKey={queryKey}
            taskId={taskId}
            title={title}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            isCompleted={isCompleted}
            isCompleting={isCompleting}
          />
        </motion.div>
        {isEditMode && (
          <motion.div
            className="Task_Content_Hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <TaskNotes taskId={taskId} note={note} queryKey={queryKey} />
            <TaskStepList taskId={taskId} setHasSteps={setHasSteps} />
            <TaskMenu date={date} taskId={taskId} hasSteps={hasSteps} />
          </motion.div>
        )}
      </motion.div>
      <motion.div className="Task_Delete" style={{ marginLeft: 'auto' }} layout="position">
        <DeleteTask taskId={taskId} queryKey={queryKey} />
      </motion.div> */}
    </Reorder.Item>
  )
})
Task.displayName = 'Task'
Task.propTypes = {
  title: PropTypes.string,
  isCompleted: PropTypes.bool,
  date: PropTypes.string,
  taskId: PropTypes.string,
  task: PropTypes.object,
  note: PropTypes.string,
  queryKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}
Task.defaultProps = {
  date: null,
}
export default Task
