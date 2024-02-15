import { useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { verifyEmail, resendEmailVerificationEmail } from '../../api/authAPI'
import { useEffect, useState } from 'react'
import errorMessages from '../../constants/error_messages'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import AnimatedSpinnerIcon from '../../assets/icons/AnimatedSpinnerIcon'

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
    <div className="EmailVerificator w-full h-full flex justify-center items-center bg-white text-black">
      <div className="EmailVerificator_Content w-1/3 bg-gray-300 rounded-2xl p-10 flex justify-center items-center">
        {verifyEmailMutation.isPending && <div className="Loading">Cargando...</div>}
        {verifyEmailMutation.isSuccess && (
          <div className="Success w-full flex flex-col items-center gap-2">
            <p>Email verficado correctamente</p>
            <div className="w-1/2 bg-white rounded p-2 flex justify-center items-center text-xl font-semibold text-black">
              <Link to="/auth/login">Ir al login</Link>
            </div>
          </div>
        )}
        {verifyEmailMutation.isError && (
          <div className="Error">
            {tokenExpired && (
              <div className="TokenExpired flex flex-col justify-center items-center gap-5">
                <p>Ups.. parece que este enlace a caducado</p>
                <button
                  className={classNames(
                    'w-1/2 p-2 rounded border-none outline-none font-semibold text-xl bg-white text-black mt-5 cursor-pointer flex justify-center items-center',
                    { 'opacity-80 cursor-not-allowed': resendEmailVerificationEmailMutation.isPending }
                  )}
                  onClick={() => resendEmailVerificationEmailMutation.mutate(userId)}
                >
                  {!resendEmailVerificationEmailMutation.isPending && <p>Solicitar nuevo enlace</p>}
                  {resendEmailVerificationEmailMutation.isPending && (
                    <div className="text-black">
                      <AnimatedSpinnerIcon />
                    </div>
                  )}
                </button>
                {resendEmailError && <div className="resendEmailError text-red-500">{resendEmailError}</div>}
                {resendEmailVerificationEmailMutation.isSuccess && (
                  <div className="resendEmailSuccess text-black">Se ha enviado un nuevo enlace a su email</div>
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
