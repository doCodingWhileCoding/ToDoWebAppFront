import PropTypes from 'prop-types'
import ListIcon from '../assets/icons/ListIcon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTaskStep } from '../api/taskStepAPI'
import { useTaskStepStore } from '../store/app.store'

const AddTaskStep = (props) => {
  const { taskId } = props
  const setFocusedTaskStepId = useTaskStepStore((state) => state.setFocusedTaskStepId)

  const queryKey = ['taskSteps', { taskId }]
  const queryClient = useQueryClient()

  const createTaskStepMutation = useMutation({
    mutationFn: createTaskStep,
    onSuccess: (taskStep) => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
      setFocusedTaskStepId(taskStep._id)
    },
  })
  const handleClick = () => {
    const data = {
      prevPosition: null,
    }
    createTaskStepMutation.mutate({ taskId: taskId, data: data })
  }

  return (
    <div className="AddTaskStep flex justify-center items-center text-gray-400 cursor-pointer" onClick={handleClick}>
      <ListIcon />
    </div>
  )
}
AddTaskStep.propTypes = {
  taskId: PropTypes.string,
}
export default AddTaskStep
