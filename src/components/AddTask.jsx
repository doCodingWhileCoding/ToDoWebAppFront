import PropTypes from 'prop-types'
import { useState, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask } from '../api/taskAPI'
import { useTaskStore, usePopUpStore } from '../store/app.store'

const AddTask = (props) => {
  const { queryKey } = props
  const textInput = useRef(null)
  const [title, setTitle] = useState('')
  const addNeedAnimationTaskId = useTaskStore((state) => state.addNeedAnimationTaskId)
  const updateSelectedErrorPopUp = usePopUpStore((state) => state.updateSelectedErrorPopUp)
  const setScrollToTop = useTaskStore((state) => state.setScrollToTop)
  const queryClient = useQueryClient()
  const createTaskMutation = useMutation({
    mutationFn: createTask,
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
  const handleChange = (e) => {
    e.preventDefault()
    setTitle(e.target.value)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const task = {
        title: title,
      }
      setScrollToTop(true)
      createTaskMutation.mutate(task)
      textInput.current.value = ''
    }
  }
  return (
    <div className="AddTask z-10 bottom-0 w-full h-40 flex justify-center items-center bg-white dark:bg-zinc-900">
      <div className="AddTask_Container w-full h-2/3 bg-gray-100 dark:bg-zinc-950 border-2 border-gray-400 rounded-md pl-2">
        <input
          className="text-lg font-semibold flex justify-center border-none outline-none w-full h-full bg-transparent  text-black dark:text-white"
          ref={textInput}
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}
AddTask.propTypes = {
  queryKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}
export default AddTask
