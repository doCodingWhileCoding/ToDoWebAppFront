import PropTypes from 'prop-types'
import { useMutation } from '@tanstack/react-query'
import { resendEmailVerificationEmail } from '../../api/authAPI'
import errorMessages from '../../constants/error_messages'
import { useState } from 'react'
const ResendEmailVerificationEmail = (props) => {
  const { userId } = props
  const [error, setError] = useState('')
  const resendEmailVerificationEmailMutation = useMutation({
    mutationFn: resendEmailVerificationEmail,
    onSuccess: () => {},
    onError: (error) => {
      if (error.response.data === errorMessages.TOO_MANY_REQUESTS) {
        setError('Para poder enviar otro email espera 5 minutos')
      }
    },
  })
  return (
    <div className="ResendEmailVerificationEmail flex flex-col justify-center items-center text-black gap-2">
      <div>¿No has recibido el email?</div>
      <button
        className="p-2 rounded border-none outline-none font-semibold text-base bg-gray-300 text-black cursor-pointer"
        onClick={() => resendEmailVerificationEmailMutation.mutate(userId)}
      >
        Reenviar email de verificación
      </button>
      {error && <div className="error text-red-500">{error}</div>}
      {resendEmailVerificationEmailMutation.isSuccess && (
        <div className="success">{'Se ha enviado un nuevo email de confirmación'}</div>
      )}
    </div>
  )
}
ResendEmailVerificationEmail.propTypes = {
  userId: PropTypes.string,
}
export default ResendEmailVerificationEmail
