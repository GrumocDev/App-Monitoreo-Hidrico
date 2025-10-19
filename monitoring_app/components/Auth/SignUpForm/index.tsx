import { Formik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import TextField from '@/components/form/TextField'
import Button from '@/components/Buttons/Button';
import authBoxState from '@/atoms/auth/authBox';
import { useSetRecoilState } from 'recoil';
import { SignUpValues } from '@/types/auth/signup';

export default function SignUpForm() {

  const setAuthBox = useSetRecoilState(authBoxState)

  const validationSchema = Yup.object({
    email: Yup.string().email("Por favor, ingresa un email valido").required("Este campo es obligatorio"),
    password: Yup.string().required("Este campo es obligatorio"),
    nombres: Yup.string().required("Este campo es obligatorio"),
    apellidos: Yup.string().required("Este campo es obligatorio"),
    repeat_password:  Yup.string().required("Este campo es obligatorio"),
  });

  const initialValues : SignUpValues = {
    email: "",
    nombres: "",
    apellidos: "",
    password: "",
    repeat_password: "",
    recaptcha: ""
  };

  const onSubmit = (values: SignUpValues) => {

  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, values, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <fieldset className="flex flex-col mt-8 mb-5 gap-2">
            <TextField label="Nombres" name="nombres" type="text" required />
            <TextField label="Apellidos" name="apellidos" type="text" required />
            <TextField label="Email" name="email" type="email" required />
            <TextField label="Contraseña" name="password" type="password" required />
            <TextField label="Repetir Contraseña" name="repeat_password" type="password" required />
          </fieldset>
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
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}
