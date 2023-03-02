import React from 'react'

const FormInput = ({param, register}) => {
  return (
    <div className="flex gap-3 ml-10">
        <label htmlFor={param.name}>{param.name}</label>
        <input className="border-2" id={param.name} type={param.type} {...register(param.name)} />
    </div>
  )
}

export default FormInput