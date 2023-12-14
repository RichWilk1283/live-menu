import { useForm } from '@inertiajs/react';
import React from 'react';
import FormGroup from './FormGroup';

export default function UserLogin() {
  const { data, setData, post, reset, processing, errors } = useForm({
    email: '',
    password: '',
  })

  function handleSubmit(e) {
    e.preventDefault();
    post('/login', {
      onSuccess: () => {
        reset();
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center mx-auto w-11/12">
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
      <button className="orange-btn">Login in</button>
    </form>
  )
}
