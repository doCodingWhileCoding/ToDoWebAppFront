import '../../assets/scss/resetpassword.scss'

import { Link, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import errorMessages from '../../constants/error_messages'
import { resetPassword, forgotPasswordByUserId } from '../../api/authAPI'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema } from '../../schemas/auth.schemas'
import VisibilityIcon from '../../assets/icons/VisibilityIcon'
import VisibilityOffIcon from '../../assets/icons/VisibilityOffIcon'
import AnimatedSpinnerIcon from '../../assets/icons/AnimatedSpinnerIcon'
import classNames from 'classnames'

const ResetPassword = () => {
  const { userId, uuid } = useParams()
  const [tokenExpired, setTokenExpired] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [resendEmailError, setResendEmailError] = useState('')

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onError: (error) => {
      if (error.response.data.errMsg === errorMessages.TOKEN_EXPIRED) {
        setTokenExpired(true)
      }
    },
  })
  const resendforgotPasswordEmailMutation = useMutation({
    mutationFn: forgotPasswordByUserId,
    onSuccess: () => {},
    onError: (error) => {
      if (error.response.data === errorMessages.TOO_MANY_REQUESTS) {
        setResendEmailError('Para poder enviar otro email espera 5 minutos')
      }
    },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  })
  const onSubmit = async (formData) => {
    const data = {
      newPassword: formData.password,
    }
    resetPasswordMutation.mutate({ userId: userId, uuid: uuid, data: data })
  }

  return (
    <div className="ResetPassword">
      <div className="ResetPassword_Content">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="password">
            <div className="input">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
              ></input>
              <div className="visibility" onClick={() => setShowPassword(!showPassword)}>
                {showPassword && <VisibilityIcon />}
                {!showPassword && <VisibilityOffIcon />}
              </div>
            </div>
            <div className="error">
              <p>{errors.password?.message}</p>
            </div>
          </div>
          <div className="confirmPassword">
            <div className="input">
              <input
                {...register('confirmPassword')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirmar Contraseña"
              ></input>
              <div className="visibility" onClick={() => setShowPassword(!showPassword)}>
                {showPassword && <VisibilityIcon />}
                {!showPassword && <VisibilityOffIcon />}
              </div>
            </div>
            <div className="error">
              <p>{errors.confirmPassword?.message}</p>
            </div>
          </div>
          {resetPasswordMutation.isError && (
            <div className="serverError">
              {tokenExpired && (
                <div className="TokenExpired">
                  <p>Ups.. parece que este enlace a caducado</p>
                  <button onClick={() => resendforgotPasswordEmailMutation.mutate(userId)}>
                    Solicitar nuevo enlace
                  </button>
                  {resendEmailError && <div className="resendEmailError">{resendEmailError}</div>}
                  {resendforgotPasswordEmailMutation.isSuccess && (
                    <div className="resendEmailSuccess">Se ha enviado un nuevo enlace a su email</div>
                  )}
                </div>
              )}
              {!tokenExpired && <div className="GeneralError">Ha ocurrido un error inesperado</div>}
            </div>
          )}
          {resetPasswordMutation.isSuccess && (
            <div className="resetPasswordSuccess">
              <p>Se ha cambiado la contraseña</p>
              <Link to="/auth/login">Ir al login</Link>
            </div>
          )}
          {!resetPasswordMutation.isError && (
            <button
              disabled={resetPasswordMutation.isPending}
              className={classNames({ isSubmitting: resetPasswordMutation.isPending })}
            >
              {!resetPasswordMutation.isPending && <p>Cambiar contraseña</p>}
              {resetPasswordMutation.isPending && <AnimatedSpinnerIcon />}
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
export default ResetPassword
