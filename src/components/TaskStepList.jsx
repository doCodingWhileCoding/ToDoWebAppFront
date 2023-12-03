import '../assets/scss/tasksteplist.scss'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { getTaskSteps, updateTaskStepPosition } from '../api/taskStepAPI'
import TaskStep from './TaskStep'
import { AnimatePresence, motion } from 'framer-motion'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const TaskStepList = (props) => {
  const { taskId, setHasSteps } = props
  const queryKey = ['taskSteps', { taskId }]
  const queryClient = useQueryClient()
  const {
    isPending,
    data: taskSteps,
    isError,
    error,
  } = useQuery({
    queryKey: queryKey,
    queryFn: () => getTaskSteps(taskId),
  })
  useEffect(() => {
    if (taskSteps) {
      if (taskSteps.length > 0) {
        setHasSteps(true)
      } else {
        setHasSteps(false)
      }
    }
  }, [taskSteps])

  const updateTaskStepPositionMutation = useMutation({
    mutationFn: updateTaskStepPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
    },
  })
  const handleDragAndDrop = (results) => {
    const data = {
      position: results.destination.index,
    }
    updateTaskStepPositionMutation.mutate({ taskId: taskId, taskStepId: results.draggableId, data: data })
  }
  if (isPending) {
    return <div>Loading...</div>
  } else if (isError) {
    return <div>Error: {error.response.data}</div>
  }
  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <Droppable droppableId={taskId} type="group">
        {(provided) => (
          <motion.div className="TaskStepList" {...provided.droppableProps} ref={provided.innerRef}>
            <AnimatePresence>
              {taskSteps.map((taskStep, index) => (
                <TaskStep
                  key={taskStep._id}
                  taskStep={taskStep}
                  taskStepId={taskStep._id}
                  taskId={taskId}
                  isCompleted={taskStep.isCompleted}
                  title={taskStep.title}
                  position={taskStep.position}
                  queryKey={queryKey}
                  index={index}
                />
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </motion.div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
TaskStepList.propTypes = {
  taskId: PropTypes.string,
  setHasSteps: PropTypes.func,
}
export default TaskStepList
