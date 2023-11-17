import '../assets/scss/taskstep.scss'
import PropTypes from 'prop-types'
import TaskStepState from './TaskStepState'
import TaskStepTitle from './TaskStepTitle'
import { useState, useEffect, useRef } from 'react'
import { motion, Reorder } from 'framer-motion'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import classNames from 'classnames'

const TaskStep = (props) => {
  const { taskStep, taskStepId, taskId, isCompleted, title, position, queryKey, index } = props
  const [isEditMode, setIsEditMode] = useState(false)
  const taskRef = useRef(null)

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
  const TaskStepvariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }
  return (
    <Draggable draggableId={taskStepId} index={index} key={taskStepId}>
      {(provided) => {
        const combinedRef = (el) => {
          taskRef.current = el
          provided.innerRef(el)
        }
        return (
          <div
            //alue={taskStep}
            className={classNames({ TaskStep: true, isEditMode: isEditMode })}
            ref={combinedRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setIsEditMode(true)}
            // variants={TaskStepvariants}
            // initial="hidden"
            // animate="visible"
            // exit="exit"
          >
            <TaskStepState queryKey={queryKey} taskStepId={taskStepId} taskId={taskId} isCompleted={isCompleted} />
            <TaskStepTitle
              queryKey={queryKey}
              taskStepId={taskStepId}
              taskId={taskId}
              isCompleted={isCompleted}
              title={title}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              position={position}
            />
          </div>
        )
      }}
    </Draggable>
  )
}
TaskStep.propTypes = {
  taskStep: PropTypes.object,
  taskStepId: PropTypes.string,
  taskId: PropTypes.string,
  isCompleted: PropTypes.bool,
  title: PropTypes.string,
  position: PropTypes.number,
  queryKey: PropTypes.array,
  index: PropTypes.number,
}
export default TaskStep
