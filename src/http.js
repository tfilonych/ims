const API_URL = import.meta.env.VITE_API_URL;

export const fetchItems = async (collection) => {
  try {
    const response = await fetch(`${API_URL}/${collection}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${collection}:`, error);
    throw error;
  }
};

export const updateItem = async (collection, data) => {
  try {
    const response = await fetch(`${API_URL}/${collection}/${data.id}`, {  
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(`Error updating ${collection} item:`, error);
    throw error;
  }
};

export const createItem = async (collection, data) => {
  try {
    const response = await fetch(`${API_URL}/${collection}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(`Error creating ${collection} item:`, error);
    throw error;
  }
};

export const deleteItem = async (collection, id) => {
  try {
    await fetch(`${API_URL}/${collection}/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error(`Error deleting ${collection} item:`, error);
    throw error;
  }
};
