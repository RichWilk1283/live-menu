import { useForm } from '@inertiajs/react';
import React from 'react';
import FormGroup from './FormGroup';

export default function UserRegistration() {
  const { data, setData, post, reset, processing, errors } = useForm({
    email: '',
    password: '',
    name: '',
  })

  function handleSubmit(e) {
    e.preventDefault();
    post('/register', {
      onSuccess: () => {
        reset();
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center mx-auto w-11/12">
      <FormGroup
        label="Full Name"
        type="text"
        value={data.name}
        name="name"
        onChange={e => setData('name', e.target.value)}
        errorMessage={errors.name}
        className="w-full flex flex-col pb-2"
      />
      <FormGroup
        label="E-mail"
        type="email"
        value={data.email}
        name="email"
        onChange={e => setData('email', e.target.value)}
        errorMessage={errors.email}
        className="w-full flex flex-col pb-2"
      />
      <FormGroup
        label="Password"
        type="password"
        value={data.password}
        name="password"
        onChange={e => setData('password', e.target.value)}
        errorMessage={errors.password}
        className="w-full flex flex-col pb-2"
      />

      <button  className="orange-btn">Sign Up</button>
    </form>
  )
}
