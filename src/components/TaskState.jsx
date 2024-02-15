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
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
    },
  })
  const handleCheck = () => {
    const data = {
      isCompleted: !isCompleted,
    }
    setIsCompleting(true)
    updateTaskMutation.mutate({ taskId: taskId, data: data })
  }
  return (
    <div
      className="TaskState h-[24px] w-[24px] flex items-center justify-center border-2 border-slate-300 rounded-full cursor-pointer"
      onClick={() => handleCheck()}
    >
      {isCompleted !== isCompleting && (
        <div className="w-fit h-fit text-slate-300">
          <CheckIcon />
        </div>
      )}
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
