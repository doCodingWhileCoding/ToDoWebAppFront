import '../../assets/scss/emailverificator.scss'
import { useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { verifyEmail, resendEmailVerificationEmail } from '../../api/authAPI'
import { useEffect, useState } from 'react'
import errorMessages from '../../constants/error_messages'
import { Link } from 'react-router-dom'
const EmailVerificator = () => {
  const { userId, uuid } = useParams()
  const [tokenExpired, setTokenExpired] = useState(false)
  const [resendEmailError, setResendEmailError] = useState('')
  const verifyEmailMutation = useMutation({
    mutationFn: verifyEmail,
    onError: (error) => {
      if (error.response.data.errMsg === errorMessages.TOKEN_EXPIRED) {
        setTokenExpired(true)
      }
    },
  })
  const resendEmailVerificationEmailMutation = useMutation({
    mutationFn: resendEmailVerificationEmail,
    onSuccess: () => {},
    onError: (error) => {
      if (error.response.data === errorMessages.TOO_MANY_REQUESTS) {
        setResendEmailError('Para poder enviar otro email espera 5 minutos')
      }
    },
  })
  useEffect(() => {
    const data = {
      userId: userId,
      uuid: uuid,
    }
    verifyEmailMutation.mutate(data)
  }, [])
  return (
    <div className="EmailVerificator">
      <div className="EmailVerificator_Content">
        {verifyEmailMutation.isPending && <div className="Loading">Cargando...</div>}
        {verifyEmailMutation.isSuccess && (
          <div className="Success">
            <p>Email verficado correctamente</p>
            <Link to="/auth/login">Ir al login</Link>
          </div>
        )}
        {verifyEmailMutation.isError && (
          <div className="Error">
            {tokenExpired && (
              <div className="TokenExpired">
                <p>Ups.. parece que este enlace a caducado</p>
                <button onClick={() => resendEmailVerificationEmailMutation.mutate(userId)}>
                  Solicitar nuevo enlace
                </button>
                {resendEmailError && <div className="resendEmailError">{resendEmailError}</div>}
                {resendEmailVerificationEmailMutation.isSuccess && (
                  <div className="resendEmailSuccess">Se ha enviado un nuevo enlace a su email</div>
                )}
              </div>
            )}
            {!tokenExpired && <div className="GeneralError">Ha ocurrido un error inesperado</div>}
          </div>
        )}
      </div>
    </div>
  )
}
export default EmailVerificator
