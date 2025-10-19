import { Formik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import TextField from '@/components/form/TextField'
import Button from '@/components/Buttons/Button';
import authBoxState from '@/atoms/auth/authBox';
import { useSetRecoilState } from 'recoil';
import { LoginFormValues } from '@/types/auth/login';
import userState from '@/atoms/auth/userState'

export default function LoginForm() {

  const setAuthBox = useSetRecoilState(authBoxState)
  const setUser = useSetRecoilState(userState)

  const validationSchema = Yup.object({
    email: Yup.string().email("Por favor, ingresa un email valido").required("Este campo es obligatorio"),
    password: Yup.string().required("Este campo es obligatorio"),
  });

  const initialValues : LoginFormValues = {
    email: "",
    password: "",
    recaptcha: ""
  };

  const resetPassword = () => {
    setAuthBox((current) => ({...current, mode: 'reset'}))
  }

  const onSubmit = (values: LoginFormValues) => {
    setUser({
      isLoggedIn: true,
      role: "user", 
      email: values.email,
      username: values.email.split('@')[0]
    })
    setAuthBox((prev)=>({...prev, isOpen: false}))
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, values, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <fieldset className="flex flex-col mt-8 mb-5 gap-2">
            <TextField label="Email" name="email" type="email" required />
            <TextField label="Contraseña" name="password" type="password" required />
          </fieldset>
          <div className="mb-5 text-blue-link">
            <p className="text-sm font-medium">
              <span className="cursor-pointer text-blue-500" role="button" onClick={resetPassword}>
                ¿Olvidaste tu contraseña?{" "}
              </span>
            </p>
          </div>
          {/* <ReCaptchaField
            action={ReCaptchaActions.LOGIN}
            refreshToken={refreshToken}
            handleAfterRefresh={handleAfterRefresh}
            error={recaptchaError}
          />
          <NonFieldErrors errors={nonFieldErrors} /> */}
          <hr className="my-4" />
          <p className='text-xs mb-4 text-gray-400'>Este sitio es protegido por reCAPTCHA de Google{" "}</p>
          <div className="">
            <Button type="submit" disabled={isSubmitting} className='w-full uppercase'>
              {isSubmitting ? "Ingresando..." : "Ingresar"}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}
