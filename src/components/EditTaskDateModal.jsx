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
      className="EditTaskDateModal taskClickOutsideException fixed top-0 left-0 z-30 w-full h-full bg-[#0000004d] backdrop-blur-sm flex justify-center items-center"
      variants={EditTaskDateModalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        ref={ref}
        className="EditTaskDateModal_Container taskClickOutsideException bg-white dark:bg-zinc-950 relative w-1/5 min-w-[390px] p-5 rounded-2xl font-semibold text-center flex flex-col gap-5"
        variants={EditTaskDateModalContainerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="Header taskClickOutsideException flex flex-row justify-center items-center relative">
          <h1 className="taskClickOutsideException text-black dark:text-white text-2xl">{'¿Cuando?'}</h1>
          <p
            className="taskClickOutsideException text-black dark:text-white absolute right-0 cursor-pointer"
            onClick={() => {
              setShowEditTaskDateModal(false)
            }}
          >
            {'Cancelar'}
          </p>
        </div>
        <div
          className={classNames(
            'Today taskClickOutsideException flex flex-row items-center gap-1 cursor-pointer rounded-md p-1',
            {
              'bg-gray-300 dark:bg-zinc-800': isToday(selectedDay),
            }
          )}
          onClick={() => setSelectedDay(startOfToday())}
        >
          <div className="text-yellow-400">
            <StarIcon />
          </div>
          <p className="text-black dark:text-white">{'Hoy'}</p>
        </div>
        <CustomDatePicker selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <div className="SomeDay taskClickOutsideException flex flex-row items-center gap-1 cursor-pointer">
          <div className="text-amber-200">
            <InventoryIcon />
          </div>

          <p className="text-black dark:text-white">{'Algún día'}</p>
        </div>
        <div className="Actions taskClickOutsideException flex flex-row gap-2 w-full">
          {date !== null && (
            <div
              className="Actions_Delete w-full py-2 px-10 text-xl rounded cursor-pointer bg-red-500"
              onClick={deleteDate}
            >
              {'Borrar'}
            </div>
          )}
          {selectedDay !== null && (
            <div
              className="Actions_Apply w-full py-2 px-10 text-xl rounded cursor-pointer bg-gray-300"
              onClick={updateDate}
            >
              {'Ok'}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
export default EditTaskDateModal
