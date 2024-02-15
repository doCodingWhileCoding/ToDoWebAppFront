import PropTypes from 'prop-types'
import Task from './Task'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useTaskStore } from '../store/app.store'
import update from 'immutability-helper'

const TaskList = (props) => {
  const { tasks, totalDocs, lastTaskRef, queryKey, setDocs } = props
  const list = useRef(null)
  const scrollToTop = useTaskStore((state) => state.scrollToTop)
  const setScrollToTop = useTaskStore((state) => state.setScrollToTop)
  useEffect(() => {
    if (scrollToTop) {
      list.current.scrollIntoView({ behavior: 'smooth' })
      setScrollToTop(false)
    }
  }, [scrollToTop])

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setDocs((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    )
  }, [])

  return (
    <div ref={list} className="px-10 py-5 flex flex-col gap-4">
      <LayoutGroup>
        <AnimatePresence>
          {tasks.map((task, index) => (
            <Task
              key={task._id}
              queryKey={queryKey}
              ref={index === tasks.length - 1 ? lastTaskRef : null}
              title={task.title}
              note={task.note}
              date={task.date}
              isCompleted={task.isCompleted}
              taskId={task._id}
              index={index}
              moveCard={moveCard}
              position={task.position}
              totalTasksNumber={totalDocs}
            />
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  lastTaskRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  queryKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  setDocs: PropTypes.func,
  totalDocs: PropTypes.number,
}

export default TaskList
