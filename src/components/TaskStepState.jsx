import '../assets/scss/taskstepstate.scss'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTaskStep } from '../api/taskStepAPI'
import CheckIcon from '../assets/icons/CheckIcon'
import CircleIcon from '../assets/icons/CircleIcon'
import { motion } from 'framer-motion'

const TaskStepState = (props) => {
  const { queryKey, taskStepId, taskId, isCompleted } = props
  const queryClient = useQueryClient()
  const updateTaskStepMutation = useMutation({
    mutationFn: updateTaskStep,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
    },
  })

  const handleCheck = () => {
    const data = {
      isCompleted: !isCompleted,
    }
    updateTaskStepMutation.mutate({ taskId: taskId, taskStepId: taskStepId, data: data })
  }
  return (
    <motion.div className="TaskStepState" onClick={() => handleCheck()}>
      {isCompleted && <CheckIcon />}
      {!isCompleted && <CircleIcon />}
    </motion.div>
  )
}
TaskStepState.propTypes = {
  taskId: PropTypes.string,
  taskStepId: PropTypes.string,
  isCompleted: PropTypes.bool,
  queryKey: PropTypes.array,
}
export default TaskStepState
