import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTaskStep, createTaskStep, deleteTaskStep } from '../api/taskStepAPI'
import { useRef, useEffect } from 'react'
import classNames from 'classnames'
import { useTaskStepStore } from '../store/app.store'

const TaskStepTitle = (props) => {
  const { queryKey, taskStepId, taskId, isCompleted, title, isEditMode, setIsEditMode, position } = props
  const focusedTaskStepId = useTaskStepStore((state) => state.focusedTaskStepId)
  const setFocusedTaskStepId = useTaskStepStore((state) => state.setFocusedTaskStepId)

  const textAreaRef = useRef(null)
  useEffect(() => {
    console.log(textAreaRef)
    if (textAreaRef && textAreaRef.current) {
      console.log('entra')
      textAreaRef.current.style.height = '28px'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }, [textAreaRef])
  const queryClient = useQueryClient()
  const updateTaskStepMutation = useMutation({
    mutationFn: updateTaskStep,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
    },
  })
  const createTaskStepMutation = useMutation({
    mutationFn: createTaskStep,
    onSuccess: (taskStep) => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
      setFocusedTaskStepId(taskStep._id)
    },
  })
  const deleteTaskStepMutation = useMutation({
    mutationFn: deleteTaskStep,
    onSuccess: (deletedTaskStep) => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
      const prevTaskStep = queryClient
        .getQueryData(queryKey)
        .find((taskStep) => taskStep.position === deletedTaskStep.position - 1)
      if (prevTaskStep) setFocusedTaskStepId(prevTaskStep._id)
    },
  })
  const handleChange = (e) => {
    textAreaRef.current.style.height = '28px'
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    const data = {
      title: e.target.value,
    }
    updateTaskStepMutation.mutate({ taskId: taskId, taskStepId: taskStepId, data: data })
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const data = {
        prevPosition: position,
      }
      createTaskStepMutation.mutate({ taskId: taskId, data: data })
    }
    if (e.key === 'Backspace' && title === '') {
      setIsEditMode(false)
      deleteTaskStepMutation.mutate({ taskId: taskId, taskStepId: taskStepId })
    }
  }

  useEffect(() => {
    if (isEditMode) {
      textAreaRef.current.focus()
      textAreaRef.current.style.height = '28px'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
      textAreaRef.current.setSelectionRange(textAreaRef.current.value.length, textAreaRef.current.value.length)
    }
  }, [isEditMode])

  useEffect(() => {
    if (focusedTaskStepId === taskStepId) {
      setIsEditMode(true)
    } else {
      setIsEditMode(false)
    }
  }, [focusedTaskStepId])
  return (
    <div
      className={classNames(
        'TaskStepTitle w-full h-full text-lg text-black dark:text-white font-semibold flex items-center cursor-pointer overflow-x-hidden',
        {
          'text-zinc-500 dark:text-zinc-500': isCompleted,
          isEditMode: isEditMode,
        }
      )}
    >
      {!isEditMode && <div className="overflow-x-hidden min-h-[28px] break-words">{title}</div>}
      {isEditMode && (
        <textarea
          className={classNames(
            'w-full border-none outline-none resize-none min-h-[28px] text-lg text-black dark:text-white font-semibold bg-transparent overflow-y-hidden',
            {
              'text-zinc-500 dark:text-zinc-500': isCompleted,
              isEditMode: isEditMode,
            }
          )}
          ref={textAreaRef}
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></textarea>
      )}
    </div>
  )
}
TaskStepTitle.propTypes = {
  taskStepId: PropTypes.string,
  taskId: PropTypes.string,
  title: PropTypes.string,
  isCompleted: PropTypes.bool,
  queryKey: PropTypes.array,
  isEditMode: PropTypes.bool,
  setIsEditMode: PropTypes.func,
  position: PropTypes.number,
}
TaskStepTitle.defaultProps = {
  title: '',
}
export default TaskStepTitle
