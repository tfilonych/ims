import React, { useState, useEffect } from 'react';
import { createItem } from './../http';

const CategoryInput = ({ value, onChange, categories }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const category = categories.find((category) => category.id === value);
    setInputValue(category ? category.name : '');
  }, [value, categories]);

  const handleChange = (e) => {
    const name = e.target.value;
    setInputValue(name);
  };

  const updateListHandler = async () => {
    const category = categories.find(
      (category) => category.name === inputValue
    );
    if (category) {
      onChange(category.id);
    } else {
      const newCategory = await createItem('categories', { name: inputValue });
      onChange(newCategory.id);
    }
  };

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={updateListHandler}
        list="categories-list"
      />
      <datalist id="categories-list">
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </datalist>
    </>
  );
};

export default CategoryInput;
