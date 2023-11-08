import '../assets/scss/errorpopup.scss'
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
    <div className="ErrorPopUp">
      <div ref={ref} className="ErrorPopUp_Container">
        {selectedErrorPopUp === 'unknown' && <UnknownError setShowErrorPopUp={setShowErrorPopUp} />}
        {selectedErrorPopUp === 'duplicated_task' && <DuplicatedTaskError setShowErrorPopUp={setShowErrorPopUp} />}
      </div>
    </div>
  )
}
export default ErrorPopUp
