import React from 'react'

const FormInput = ({param, register}) => {
  return (
    <div className="grid grid-cols-[1fr_3fr] gap-3">
        <label htmlFor={param.name}>{param.name}</label>
        <input className="border-2" id={param.name} type={param.type} {...register(param.name)} />
    </div>
  )
}

export default FormInput