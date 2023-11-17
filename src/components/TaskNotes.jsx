import '../assets/scss/tasknotes.scss'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTask } from '../api/taskAPI'
import { motion } from 'framer-motion'

const TaskNotes = (props) => {
  const { taskId, note, queryKey } = props
  const textAreaRef = useRef(null)
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }, [textAreaRef])
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
    textAreaRef.current.style.height = 'auto'
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    const data = {
      note: e.target.value,
    }
    updateTaskMutation.mutate({ taskId: taskId, data: data })
  }

  return (
    <motion.textarea
      className="TaskNotes"
      value={note == null ? '' : note}
      placeholder="Notas"
      ref={textAreaRef}
      onChange={handleChange}
      style={{
        minHeight: '50px',
        overflowY: 'hidden',
      }}
    ></motion.textarea>
  )
}
TaskNotes.propTypes = {
  note: PropTypes.string,
  taskId: PropTypes.string,
  queryKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}
export default TaskNotes
