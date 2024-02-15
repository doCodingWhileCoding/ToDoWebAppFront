import '../assets/scss/taskstep.scss'
import PropTypes from 'prop-types'
import TaskStepState from './TaskStepState'
import TaskStepTitle from './TaskStepTitle'
import { useState, useEffect, useRef } from 'react'
import { motion, Reorder } from 'framer-motion'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import classNames from 'classnames'
import { useDrag, useDrop } from 'react-dnd'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { updateTaskStepPosition } from '../api/taskStepAPI'
import { getEmptyImage } from 'react-dnd-html5-backend'
import MenuIcon from '../assets/icons/MenuIcon'

const TaskStep = (props) => {
  const { taskStep, taskStepId, taskId, isCompleted, title, position, queryKey, index, moveCard } = props
  const [isEditMode, setIsEditMode] = useState(false)
  const taskStepRef = useRef(null)
  const queryClient = useQueryClient()

  const updateTaskStepPositionMutation = useMutation({
    mutationFn: updateTaskStepPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
    },
  })
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (taskStepRef.current && !taskStepRef.current.contains(event.target)) {
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
  const handleDragAndDrop = async (newIndex) => {
    if (newIndex === undefined) {
      return
    }
    const data = {
      position: newIndex,
    }
    updateTaskStepPositionMutation.mutate({ taskId: taskId, taskStepId: taskStepId, data: data })
  }
  const [{ handlerId }, drop] = useDrop({
    accept: 'taskSteps',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!taskStepRef.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = taskStepRef.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      item.newIndex = hoverIndex
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
    drop: (item, monitor) => {},
  })
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: 'taskSteps',
    item: () => {
      return {
        id: taskId,
        index: index,
        title: title,
        isCompleted: isCompleted,
        position: position,
        width: taskStepRef.current.offsetWidth,
        height: taskStepRef.current.offsetHeight,
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      handleDragAndDrop(item.newIndex)
    },
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(taskStepRef))
  dragPreview(getEmptyImage())
  return (
    <div
      //alue={taskStep}
      ref={taskStepRef}
      className={classNames('TaskStep w-full p-2 cursor-pointer border-t-2 flex flex-row items-center gap-2', {
        'bg-gray-200 dark:bg-zinc-700 border-t-white dark:border-t-zinc-800 z-10 rounded-md isDragging': isDragging,
        'border-t-gray-200 dark:border-t-zinc-600 border-b-gray-200 dark:border-b-zinc-600 last:border-b-2 last:border-b-gray-200':
          !isDragging && !isEditMode,
        'bg-gray-200 dark:bg-zinc-700 rounded-md border-t-white dark:border-t-zinc-800 border-b-white dark:border-b-zinc-800 isEditMode':
          !isDragging && isEditMode,
      })}
      onClick={() => setIsEditMode(true)}
      data-handler-id={handlerId}

      // variants={TaskStepvariants}
      // initial="hidden"
      // animate="visible"
      // exit="exit"
    >
      <div style={{ opacity: opacity }} className="w-full h-full flex flex-row gap-2 items-stretch">
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
        <div className="text-zinc-500 ml-auto">
          <MenuIcon />
        </div>
      </div>
    </div>
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
  moveCard: PropTypes.func,
}
export default TaskStep
