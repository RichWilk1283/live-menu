import { useForm } from '@inertiajs/react';
import React from 'react';
import FormGroup from './FormGroup';

export default function EditMenuItemForm({ categories, menuItem }) {

  const { data, setData, patch, reset, errors } = useForm({
    title: menuItem.title,
    description: menuItem.description,
    price: menuItem.price,
    category: menuItem.categories[0].name,
    vegetarian: menuItem.vegetarian,
    vegan: menuItem.vegan,
    glutenfree: menuItem.glutenfree,
    active: menuItem.active,
    dbid: menuItem.id
  })

  function handleSubmit(e) {
    e.preventDefault();

    patch('/editmenuitem');
  }

  return (
    <div className="w-11/12 md:w-1/3 flex flex-col items-center mt-3 border-4 border-[#005E5B]">
      <h3 className="text-xl ml-3 -translate-y-4 bg-[#F5F6F8] w-44 text-center text-[#F3651E]">Edit Menu Item:</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center mx-auto w-11/12">
        <FormGroup
          label="Title"
          type="text"
          value={data.title}
          name="title"
          onChange={e => setData('title', e.target.value)}
          errorMessage={errors.title}
          className="w-full flex flex-col"
        />
        <FormGroup
          label="Description"
          type="textarea"
          value={data.description}
          name="description"
          onChange={e => setData('description', e.target.value)}
          errorMessage={errors.description}
          className="w-full flex flex-col"
        />
        <FormGroup
          label="Price"
          type="number"
          value={data.price}
          name="price"
          onChange={e => setData('price', e.target.value)}
          errorMessage={errors.price}
          className="w-full flex flex-col"
        />
        <div className="flex flex-col border border-gray-500 w-1/2 items-center rounded-md gap-2">
          <label htmlFor="category">Category:</label>
          {categories.map((category) => (
            <div key={category.id}>
            <input              
              type="radio"
              name="category"
              id="category"
              value={category.name}
              checked={data.category === category.name}
              onChange={e => setData('category', e.target.value)}
              className="mr-2"
              />
              {category.name}
            </div>
          ))}
        </div>
        <FormGroup
          label="Vegetarian"
          type="checkbox"
          checked={data.vegetarian}
          name="vegetarian"
          onChange={e => setData('vegetarian', e.target.checked)}
          errorMessage={errors.vegetarian}
          className="w-full flex gap-2 justify-center"
        />
        <FormGroup
          label="Vegan"
          type="checkbox"
          checked={data.vegan}
          name="vegan"
          onChange={e => setData('vegan', e.target.checked)}
          errorMessage={errors.vegan}
          className="w-full flex gap-2 justify-center"
        />
        <FormGroup
          label="Gluten free"
          type="checkbox"
          checked={data.glutenfree}
          name="glutenfree"
          onChange={e => setData('glutenfree', e.target.checked)}
          errorMessage={errors.glutenfree}
          className="w-full flex gap-2 justify-center"
        />
        <FormGroup
          label="Active"
          type="checkbox"
          checked={data.active}
          name="active"
          onChange={e => setData('active', e.target.checked)}
          errorMessage={errors.active}
          className="w-full flex gap-2 justify-center"
        />
        <button className="orange-btn mb-3">Save</button>
      </form>
    </div>
  )
}