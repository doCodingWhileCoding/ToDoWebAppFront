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
    <motion.div className="TaskStepState flex justify-center" onClick={() => handleCheck()}>
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
  )
}
TaskStepState.propTypes = {
  taskId: PropTypes.string,
  taskStepId: PropTypes.string,
  isCompleted: PropTypes.bool,
  queryKey: PropTypes.array,
}
export default TaskStepState
