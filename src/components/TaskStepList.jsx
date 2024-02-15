import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useEffect, useState, useCallback } from 'react'
import { getTaskSteps, updateTaskStepPosition } from '../api/taskStepAPI'
import TaskStep from './TaskStep'
import { AnimatePresence, motion } from 'framer-motion'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import update from 'immutability-helper'

const TaskStepList = (props) => {
  const { taskId, taskSteps } = props
  const queryKey = ['taskSteps', { taskId }]
  const queryClient = useQueryClient()

  const updateTaskStepPositionMutation = useMutation({
    mutationFn: updateTaskStepPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
    },
  })
  const handleDragAndDrop = (results) => {
    if (!results.destination) {
      return
    }
    const data = {
      position: results.destination.index,
    }
    updateTaskStepPositionMutation.mutate({ taskId: taskId, taskStepId: results.draggableId, data: data })
  }
  const [sortedTaskSteps, setSortedTaskSteps] = useState([])
  useEffect(() => {
    setSortedTaskSteps(taskSteps)
  }, [taskSteps])
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setSortedTaskSteps((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    )
  }, [])
  return (
    <motion.div className="TaskStepList w-full flex flex-col items-center">
      <AnimatePresence>
        {sortedTaskSteps.map((taskStep, index) => (
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
            moveCard={moveCard}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
TaskStepList.propTypes = {
  taskId: PropTypes.string,
  taskSteps: PropTypes.array,
}
export default TaskStepList
