import { Formik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import TextField from '@/components/form/TextField'
import Button from '@/components/Buttons/Button';
import authBoxState from '@/atoms/auth/authBox';
import { useSetRecoilState } from 'recoil';

export default function ResetForm() {

  const setAuthBox = useSetRecoilState(authBoxState)

  const validationSchema = Yup.object({
    email: Yup.string().email("Por favor, ingresa un email valido").required("Este campo es obligatorio"),
  });

  const initialValues : {email: string} = {
    email: ""
  };

  const backToLoginForm = () => {
    setAuthBox((current) => ({...current, mode: 'login'}))
  }

  const onSubmit = (values: {email: string}) => {

  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, values, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <fieldset className="flex flex-col mt-8 mb-5 gap-8">
            <div className='grid gap-2'>
              <h1 className='text-xl font-bold text-gray'>Recuperar Contraseña</h1>
              <p className='text-gray font-light'>Por favor ingresa el email de tu cuenta. Te enviaremos un correo electrónico para que resetees la contraseña.</p>
            </div>
            <TextField label="Email" name="email" type="email" required />
          </fieldset>
          {/* <ReCaptchaField
            action={ReCaptchaActions.LOGIN}
            refreshToken={refreshToken}
            handleAfterRefresh={handleAfterRefresh}
            error={recaptchaError}
          />
          <NonFieldErrors errors={nonFieldErrors} /> */}
          <p className='text-xs mb-4 text-gray-400'>Este sitio es protegido por reCAPTCHA de Google{" "}</p>
          <div>
            <Button type="submit" disabled={isSubmitting} className='w-full uppercase'>
              {isSubmitting ? "Enviando correo electrónico..." : "Recuperar contraseña"}
            </Button>
          </div>
          <hr className="my-6" />
          <div className="mb-5 text-sm font-medium text-center">
            <span className="cursor-pointer text-blue-500" role="button" onClick={backToLoginForm}>
              Regresar a formulario de ingreso{" "}
            </span>
          </div>
        </form>
      )}
    </Formik>
  )
}
