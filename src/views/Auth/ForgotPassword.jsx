import '../../assets/scss/forgotpassword.scss'

import { forgotPasswordByEmail } from '../../api/authAPI'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import errorMessages from '../../constants/error_messages'
import { forgotPasswordSchema } from '../../schemas/auth.schemas'
import classNames from 'classnames'
import AnimatedSpinnerIcon from '../../assets/icons/AnimatedSpinnerIcon'

const ForgotPassword = () => {
  const [serverError, setServerError] = useState('')

  const sendForgotPasswordEmailMutation = useMutation({
    mutationFn: forgotPasswordByEmail,
    onSuccess: () => {},
    onError: (error) => {
      if (error.response.data === errorMessages.TOO_MANY_REQUESTS) {
        setServerError('Para poder enviar otro email espera 5 minutos')
      } else {
        setServerError('Vaya parece que algo no ha ido bien')
      }
    },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  })
  const onSubmit = async (formData) => {
    const data = {
      email: formData.email,
    }
    sendForgotPasswordEmailMutation.mutate(data)
  }
  return (
    <div className="ForgotPassword">
      <div className="ForgotPassword_Content">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="email">
            <div className="input">
              <input {...register('email')} type="email" placeholder="Email" name="email" />
            </div>
            <div className="error">
              <p>{errors.email?.message}</p>
            </div>
          </div>

          {sendForgotPasswordEmailMutation.isError && (
            <div className="serverError">
              <p>{serverError}</p>
            </div>
          )}
          {sendForgotPasswordEmailMutation.isSuccess && (
            <div className="sendEmailSuccess">
              Se ha enviado un nuevo enlace a su email para tramitar el cambio de contraseña
            </div>
          )}
          <button
            disabled={sendForgotPasswordEmailMutation.isPending}
            className={classNames({ isSubmitting: sendForgotPasswordEmailMutation.isPending })}
          >
            {!sendForgotPasswordEmailMutation.isPending && <p>Solicitar cambio de contraseña</p>}
            {sendForgotPasswordEmailMutation.isPending && <AnimatedSpinnerIcon />}
          </button>
        </form>
      </div>
    </div>
  )
}
export default ForgotPassword
