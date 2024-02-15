import { useEffect, useRef } from 'react'
import { usePopUpStore } from '../store/app.store'
import UnknownError from './Errors/UnknownError'
import DuplicatedTaskError from './Errors/DuplicatedTaskError'

const ErrorPopUp = () => {
  const setShowErrorPopUp = usePopUpStore((state) => state.setShowErrorPopUp)
  const selectedErrorPopUp = usePopUpStore((state) => state.selectedErrorPopUp)

  const ref = useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowErrorPopUp(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [setShowErrorPopUp])
  return (
    <div className="ErrorPopUp fixed top-0 left-0 z-30 w-full h-full bg-[#00000099] backdrop-blur-sm flex justify-center items-center">
      <div
        ref={ref}
        className="ErrorPopUp_Container relative w-2/5 h-2/3 bg-gray-300 dark:bg-black text-black dark:text-white rounded-2xl font-semibold text-center"
      >
        {selectedErrorPopUp === 'unknown' && <UnknownError setShowErrorPopUp={setShowErrorPopUp} />}
        {selectedErrorPopUp === 'duplicated_task' && <DuplicatedTaskError setShowErrorPopUp={setShowErrorPopUp} />}
      </div>
    </div>
  )
}
export default ErrorPopUp
