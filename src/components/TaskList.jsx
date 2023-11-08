import '../assets/scss/tasklist.scss'
import PropTypes from 'prop-types'
import Task from './Task'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useTaskStore } from '../store/app.store'
import { Reorder } from 'framer-motion'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTaskPosition } from '../api/taskAPI'

const TaskList = (props) => {
  const { tasks, lastTaskRef, setDocs, queryKey } = props
  const list = useRef(null)
  const scrollToTop = useTaskStore((state) => state.scrollToTop)
  const setScrollToTop = useTaskStore((state) => state.setScrollToTop)
  useEffect(() => {
    if (scrollToTop) {
      list.current.scrollIntoView({ behavior: 'smooth' })
      setScrollToTop(false)
    }
  }, [scrollToTop])
  const queryClient = useQueryClient()
  const updateTaskMutation = useMutation({
    mutationFn: updateTaskPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
    },
  })
  const onReorder = (newOrder) => {
    setDocs(newOrder)
    const reverseNewOrder = newOrder.slice().reverse()
    for (let index = 0; index < reverseNewOrder.length; index++) {
      const task = reverseNewOrder[index]
      if (task.position !== index) {
        const newPosition = index
        const data = {
          position: newPosition,
        }
        updateTaskMutation.mutate({ id: task._id, data: data })
      }
    }
  }
  return (
    <div className="TaskList" ref={list}>
      <Reorder.Group axis="y" onReorder={onReorder} values={tasks}>
        <LayoutGroup>
          <AnimatePresence>
            {tasks.map((task, i) => (
              <Task
                key={task._id}
                queryKey={queryKey}
                task={task}
                ref={i === tasks.length - 1 ? lastTaskRef : null}
                title={task.title}
                note={task.note}
                isCompleted={task.isCompleted}
                taskId={task._id}
              />
            ))}
          </AnimatePresence>
        </LayoutGroup>
      </Reorder.Group>
    </div>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  lastTaskRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  setDocs: PropTypes.func,
  queryKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}

export default TaskList
