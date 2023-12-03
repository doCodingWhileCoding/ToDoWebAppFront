import '../assets/scss/edittaskdatemodal.scss'
import { useEffect, useRef, useState } from 'react'
import { useEditTaskDateModalStore } from '../store/app.store'
import CustomDatePicker from './CustomDatePicker'
import StarIcon from '../assets/icons/StarIcon'
import InventoryIcon from '../assets/icons/InventoryIcon'
import { motion } from 'framer-motion'
import { updateTask } from '../api/taskAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isToday, parseISO, startOfDay, startOfToday } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import classNames from 'classnames'

const EditTaskDateModal = () => {
  const taskId = useEditTaskDateModalStore((state) => state.taskId)
  const queryKey = useEditTaskDateModalStore((state) => state.queryKey)
  const date = useEditTaskDateModalStore((state) => state.date)

  const setShowEditTaskDateModal = useEditTaskDateModalStore((state) => state.setShowEditTaskDateModal)
  const ref = useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowEditTaskDateModal(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [setShowEditTaskDateModal])
  const [selectedDay, setSelectedDay] = useState()
  useEffect(() => {
    setSelectedDay(parseISO(date))
  }, [date])
  const queryClient = useQueryClient()
  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
    },
  })
  const updateDate = () => {
    if (selectedDay === null) return
    const data = {
      date: utcToZonedTime(startOfDay(selectedDay), 'Europe/Madrid').toISOString(),
    }
    updateTaskMutation.mutate({ taskId: taskId, data: data })
    setShowEditTaskDateModal(false)
  }
  const deleteDate = () => {
    setSelectedDay(null)
    const data = {
      date: null,
    }
    updateTaskMutation.mutate({ taskId: taskId, data: data })
    setShowEditTaskDateModal(false)
  }

  const EditTaskDateModalVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  }
  const EditTaskDateModalContainerVariants = {
    hidden: {
      scale: 0.5,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        scale: { duration: 0.1 },
        opacity: { duration: 0.1 },
      },
    },
    exit: {
      scale: 0.5,
      opacity: 0,
      transition: {
        scale: { duration: 0.1 },
        opacity: { duration: 0.1 },
      },
    },
  }
  return (
    <motion.div
      className="EditTaskDateModal"
      variants={EditTaskDateModalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        ref={ref}
        className="EditTaskDateModal_Container"
        variants={EditTaskDateModalContainerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="Header">
          <h1>{'¿Cuando?'}</h1>
          <p
            onClick={() => {
              setShowEditTaskDateModal(false)
            }}
          >
            {'Cancelar'}
          </p>
        </div>
        <div
          className={classNames({
            Today: true,
            isToday: isToday(selectedDay),
          })}
          onClick={() => setSelectedDay(startOfToday())}
        >
          <StarIcon />
          <p>{'Hoy'}</p>
        </div>
        <CustomDatePicker selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <div className="SomeDay">
          <InventoryIcon />
          <p>{'Algún día'}</p>
        </div>
        <div className="Actions">
          {date !== null && (
            <div className="Actions_Delete" onClick={deleteDate}>
              {'Borrar'}
            </div>
          )}
          {selectedDay !== null && (
            <div className="Actions_Apply" onClick={updateDate}>
              {'Ok'}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
export default EditTaskDateModal
