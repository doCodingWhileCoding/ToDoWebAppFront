import '../assets/scss/taskstate.scss'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTaskIsCompleted } from '../api/taskAPI'
import CheckIcon from '../assets/icons/CheckIcon'

const TaskState = (props) => {
  const { taskId, isCompleting, isCompleted, setIsCompleting } = props
  const queryClient = useQueryClient()
  const updateTaskMutation = useMutation({
    mutationFn: updateTaskIsCompleted,
    onSuccess: () => {
      console.log(isCompleting)
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
    },
  })
  const handleCheck = () => {
    const data = {
      isCompleted: !isCompleted,
    }
    console.log(!isCompleted)
    setIsCompleting(true)
    updateTaskMutation.mutate({ taskId: taskId, data: data })
  }
  return (
    <div className="TaskState" onClick={() => handleCheck()}>
      {isCompleted !== isCompleting && <CheckIcon />}
      {isCompleted === isCompleting && <div></div>}
    </div>
  )
}
TaskState.propTypes = {
  isCompleted: PropTypes.bool,
  taskId: PropTypes.string,
  isCompleting: PropTypes.bool,
  setIsCompleting: PropTypes.func,
}
export default TaskState
