import PropTypes from 'prop-types'
import { useEffect, useState, useRef, forwardRef, useCallback } from 'react'
import { motion, useAnimate } from 'framer-motion'
import TaskState from './TaskState'
import TaskTitle from './TaskTitle'
import TaskNotes from './TaskNotes'
import { useTaskStore } from '../store/app.store'
import DeleteTask from './DeleteTask'
import TaskMenu from './TaskMenu'
import TaskStepList from './TaskStepList'
import classNames from 'classnames'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getTaskSteps } from '../api/taskStepAPI'
import { useLongPress } from 'use-long-press'
import { updateTaskPosition } from '../api/taskAPI'

const Task = forwardRef((props, lastTaskRef) => {
  const { title, note, isCompleted, date, taskId, queryKey, index, moveCard, position, totalTasksNumber } = props
  const [isEditMode, setIsEditMode] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const [hasSteps, setHasSteps] = useState(false)
  const needAnimationTasksId = useTaskStore((state) => state.needAnimationTasksId)
  const removeNeedAnimationTaskId = useTaskStore((state) => state.removeNeedAnimationTaskId)
  const taskRef = useRef(null)
  const [loadData, setLoadData] = useState(false)
  const [isLongPress, setIsLongPress] = useState(false)
  const [scope, animate] = useAnimate()
  const setOverlayExceptionTaskId = useTaskStore((state) => state.setOverlayExceptionTaskId)
  const overlayExceptionTaskId = useTaskStore((state) => state.overlayExceptionTaskId)

  const {
    isPending,
    data: taskSteps,
    isError,
    error,
    isSuccess,
    refetch,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['taskSteps', { taskId }],
    queryFn: () => getTaskSteps(taskId),
    enabled: isEditMode,
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
  })
  useEffect(() => {
    if (taskSteps) {
      if (taskSteps.length > 0) {
        setHasSteps(true)
      } else {
        setHasSteps(false)
      }
    }
  }, [taskSteps])
  const queryClient = useQueryClient()
  const updateTaskPositionMutation = useMutation({
    mutationFn: updateTaskPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
    },
  })

  const [enabled, setEnabled] = useState(true)
  const callback = useCallback((event) => {
    animate(scope.current, { backgroundColor: 'rgb(100 116 139,1)', scale: 1.02 })
    setIsLongPress(true)
  }, [])
  const onLongPressStart = () => {}
  const onLongPressFinish = () => {
    animate(scope.current, { backgroundColor: 'rgba(0, 0, 0, 0)', scale: 1 })
  }
  const onLongPressCancel = () => {
    setIsLongPress(false)
    animate(scope.current, { backgroundColor: 'rgba(0, 0, 0, 0)', scale: 1 })
  }
  const bindLongPress = useLongPress(enabled ? callback : null, {
    onStart: () => onLongPressStart(),
    onFinish: () => onLongPressFinish(),
    onCancel: () => onLongPressCancel(),
    filterEvents: (event) => {
      if (isEditMode) {
        return false
      } else {
        return true
      }
    }, // All events can potentially trigger long press (same as 'undefined')
    threshold: 100, // In milliseconds
    captureEvent: true, // Event won't get cleared after React finish processing it
    cancelOnMovement: 25, // Square side size (in pixels) inside which movement won't cancel long press
    cancelOutsideElement: true, // Cancel long press when moved mouse / pointer outside element while pressing
    detect: 'pointer', // Default option
  })
  const handleTaskClick = async () => {
    if (isLongPress || isEditMode) {
      return
    }
    setOverlayExceptionTaskId(taskId)
    await animate(scope.current, { backgroundColor: 'rgba(0, 0, 0, 0.3)' })
    console.log(loadData)
    console.log('setLoadDataTrue')
    setLoadData(true)
    refetch()
    // if (loadData) {
    //   refetch()
    // } else {
    //   setLoadData(true)
    // }
  }
  useEffect(() => {
    console.log(isSuccess)
    console.log('entra isSucces o isFetching')
    const expandTask = async () => {
      console.log('expandTask')
      await animate(scope.current, { backgroundColor: 'rgba(0, 0, 0, 0)', scale: 1 })
      setIsEditMode(true)
      setLoadData(false)
    }
    console.log('entra')
    if (loadData && isFetched && isSuccess) {
      expandTask()
    }
  }, [isFetching])
  useEffect(() => {
    if (lastTaskRef && taskRef.current) {
      lastTaskRef.current = taskRef.current
    }
  }, [lastTaskRef])
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        taskRef.current &&
        !taskRef.current.contains(event.target) &&
        !event.target.classList.contains('taskClickOutsideException')
      ) {
        console.log('setIsEditMode')
        setIsEditMode(false)
        if (overlayExceptionTaskId === taskId) {
          setOverlayExceptionTaskId(null)
        }
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
  const handleDragAndDrop = async (newIndex) => {
    if (newIndex === undefined) {
      return
    }
    const data = {
      position: totalTasksNumber - 1 - newIndex,
    }
    updateTaskPositionMutation.mutate({ taskId: taskId, data: data })
  }
  const [{ handlerId }, drop] = useDrop({
    accept: 'tasks',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!taskRef.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = taskRef.current?.getBoundingClientRect()
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
    type: 'tasks',
    item: () => {
      return {
        id: taskId,
        index: index,
        title: title,
        isCompleted: isCompleted,
        position: position,
        width: taskRef.current.offsetWidth,
        height: taskRef.current.offsetHeight,
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => {
      return !isEditMode
    },
    end: (item, monitor) => {
      handleDragAndDrop(item.newIndex)
    },
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(taskRef))
  dragPreview(getEmptyImage())
  return (
    <motion.div
      id={taskId}
      ref={taskRef}
      className={classNames(
        'relative origin-top w-full h-fit flex flex-col justify-start items-center text-black dark:text-white',
        {
          'z-20': overlayExceptionTaskId === taskId,
        }
      )}
      data-handler-id={handlerId}
      layout
      transition={{ layout: { duration: 0.3 } }}
    >
      <motion.div
        className={classNames('Task w-full h-fit flex flex-col rounded-xl', {
          'bg-gray-200 dark:bg-zinc-800 z-30': isDragging && !isEditMode,
          'bg-white dark:bg-zinc-900': !isDragging && !isEditMode,
          'py-5 bg-white dark:bg-zinc-800 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] dark:shadow-none':
            isEditMode && !isDragging,
        })}
        onAnimationComplete={() => removeNeedAnimationTaskId(taskId)}
        initial={needAnimationTasksId.includes(taskId) ? 'hidden' : 'visible'}
        animate="visible"
        exit="exit"
        variants={Taskvariants}
        {...bindLongPress()}
      >
        <motion.div
          id="task_preview"
          style={{ opacity: opacity }}
          className={classNames('Task_Preview w-full flex flex-row items-center rounded-xl py-3', {})}
          ref={scope}
          layout="position"
        >
          <motion.div className="Task_Preview_State w-20 h-full flex justify-center items-center">
            <TaskState
              taskId={taskId}
              isCompleted={isCompleted}
              isCompleting={isCompleting}
              setIsCompleting={setIsCompleting}
            />
          </motion.div>
          <motion.div className="Task_Preview_Title w-full" onClick={handleTaskClick}>
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

          <motion.div
            className="Task_Preview_Delete w-20 h-full flex justify-center items-center"
            style={{ marginLeft: 'auto' }}
          >
            <DeleteTask taskId={taskId} queryKey={queryKey} />
          </motion.div>
        </motion.div>
        {isEditMode && (
          <motion.div
            className="Task_Content w-full flex flex-col py-5 px-20 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <TaskNotes taskId={taskId} note={note} queryKey={queryKey} />
            <TaskStepList taskId={taskId} taskSteps={taskSteps} />
            <TaskMenu date={date} taskId={taskId} hasSteps={hasSteps} />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
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
  index: PropTypes.number,
  moveCard: PropTypes.func,
  position: PropTypes.number,
  totalTasksNumber: PropTypes.number,
}
Task.defaultProps = {
  date: null,
}
export default Task
