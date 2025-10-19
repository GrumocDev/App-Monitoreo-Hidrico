import React from 'react'
import Button from '@/components/Buttons/Button'
import useFilterSensors from '@/hooks/sensors/useFilterSensors';
import { Formik, Form, Field } from 'formik';
import DatePickerField from '@/components/form/DatePickerField';


type DateValues = {
  startDate: Date,
  endDate: Date
}

export default function DateFilter() {

  const { filterDate } = useFilterSensors()

  const initialvalues : DateValues = {
    startDate: new Date(),
    endDate: new Date()
  }

  const handleSubmit = (values : DateValues, { setSubmitting }:{setSubmitting:any}) => {
    filterDate(values?.startDate, values?.endDate)
    setSubmitting(false)
  }

  const handleRemove = () => {
    filterDate(null, null)
  }

  return (
    <div className='flex gap-4 flex-col'>
      <Formik 
        initialValues={initialvalues}
        onSubmit={handleSubmit}>
        {({values, isSubmitting})=>(
          <Form>
            <div className='flex gap-3 flex-col'>
              <div className='flex flex-col gap-1'>
                <p className='text-sm'>Desde:</p>
                <Field
                  name="startDate"
                  id="startDate"
                  component={DatePickerField}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm'>Hasta:</p>
                <Field
                  name="endDate"
                  id="endDate"
                  disable={values.endDate ? false : true}
                  component={DatePickerField}
                />
              </div>
              <div className='flex justify-end'>
                <div className='flex gap-2'>
                  <Button 
                    type="button"
                    onClick={handleRemove}
                    disabled={isSubmitting}
                    className="bg-gray-500 hover:bg-gray-600"
                    >
                    Limpiar
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-500 hover:bg-green-600"
                    >
                    Enviar
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
