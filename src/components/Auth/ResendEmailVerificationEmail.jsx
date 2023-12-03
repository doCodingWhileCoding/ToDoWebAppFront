import '../../assets/scss/resendemailverificationemail.scss'
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
    <div className="ResendEmailVerificationEmail">
      <div>¿No has recibido el email?</div>
      <button onClick={() => resendEmailVerificationEmailMutation.mutate(userId)}>
        Reenviar email de verificación
      </button>
      {error && <div className="error">{error}</div>}
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
