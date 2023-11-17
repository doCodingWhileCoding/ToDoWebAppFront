import '../assets/scss/tasktitle.scss'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTask } from '../api/taskAPI'
import { motion, usePresence, useAnimationControls } from 'framer-motion'
import { useEffect, useRef } from 'react'

const TaskTitle = (props) => {
  const { taskId, title, isEditMode, setIsEditMode, isCompleting, isCompleted, queryKey } = props
  const input = useRef(null)
  const queryClient = useQueryClient()
  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
    },
  })
  const handleChange = (e) => {
    e.preventDefault()
    const data = {
      title: e.target.value,
    }
    updateTaskMutation.mutate({ taskId: taskId, data: data })
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditMode(false)
    }
  }
  useEffect(() => {
    if (isEditMode) input.current.focus()
  }, [isEditMode])

  const TaskTitleStrokevariants = {
    hidden: {
      width: '0%',
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      width: '100%',
      transition: {
        duration: 0.3,
      },
    },
  }
  const [isPresent, safeToRemove] = usePresence()
  const controls = useAnimationControls()
  const hiddenAnimation = async () => {
    await controls.start('hidden')
    safeToRemove()
  }
  const showAnimtion = async () => {
    await controls.start('visible')
    safeToRemove()
  }
  useEffect(() => {
    if (isPresent) {
      if (isCompleted) {
        controls.set('visible')
      } else {
        controls.set('hidden')
      }
    } else {
      if (isCompleted === isCompleting) {
        hiddenAnimation()
      } else {
        showAnimtion()
      }
    }
  }, [isPresent])
  return (
    <motion.div className="TaskTitle">
      <motion.div animate={controls} variants={TaskTitleStrokevariants} className="TaskTitle_Stroke"></motion.div>
      {!isEditMode && <div>{title}</div>}
      {isEditMode && <input ref={input} type="text" value={title} onChange={handleChange} onKeyDown={handleKeyDown} />}
    </motion.div>
  )
}
TaskTitle.propTypes = {
  taskId: PropTypes.string,
  title: PropTypes.string,
  isEditMode: PropTypes.bool,
  setIsEditMode: PropTypes.func,
  isCompleted: PropTypes.bool,
  isCompleting: PropTypes.bool,
  queryKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}
export default TaskTitle
