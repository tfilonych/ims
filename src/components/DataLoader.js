import React, { useState, useEffect } from 'react';
import { fetchItems } from '../http';

const DataLoader = ({ endpoint, children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchItems(endpoint);
        setData(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return children(data, loading);
};

export default DataLoader;
