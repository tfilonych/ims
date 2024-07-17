import React, { useState, useEffect } from 'react';
import { createItem } from './../http';

const CategoryInput = ({ editRowData = null, row, categories = null }) => {
  const [inputValue, setInputValue] = useState({
    id: null,
    name: '',
  });
  const [isOnEditMode, setEditMode] = useState(false);

  useEffect(() => {
    const category = categories.find(
      (category) => category.id === row.category
    );
    setInputValue(category ? category : '');
  }, []);

  useEffect(() => {
    setEditMode(editRowData?.category === inputValue.id);
  }, [editRowData, inputValue.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
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
    <div className="grid-table-cell">
      {isOnEditMode ? (
        <>
          <input
            type="text"
            name="name"
            value={inputValue.name}
            onChange={handleChange}
            onBlur={updateListHandler}
            list="categories-list"
          />
          <datalist id="categories-list" data-category={categories[0]}>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </datalist>
        </>
      ) : (
        inputValue.name
      )}
    </div>
  );
};

export default CategoryInput;
