import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '../api/taskAPI'
import { useTaskStore, usePopUpStore } from '../store/app.store'
import DeleteIcon from '../assets/icons/DeleteIcon'

const DeleteTask = (props) => {
  const { taskId, queryKey } = props
  const addNeedAnimationTaskId = useTaskStore((state) => state.addNeedAnimationTaskId)
  const updateSelectedErrorPopUp = usePopUpStore((state) => state.updateSelectedErrorPopUp)
  const queryClient = useQueryClient()
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => {
      addNeedAnimationTaskId(data._id)
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
    },
    onError: (error) => {
      updateSelectedErrorPopUp(error.response.data.errMsg)
    },
  })
  const handleClick = () => {
    deleteTaskMutation.mutate(taskId)
  }
  return (
    <div className="DeleteTask flex items-center justify-center cursor-pointer text-red-500" onClick={handleClick}>
      <DeleteIcon />
    </div>
  )
}
DeleteTask.propTypes = {
  taskId: PropTypes.string,
  queryKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}
export default DeleteTask
