import { useState, useEffect } from 'react';

function useFetch(URL: string) {
  const [data, setData] = useState([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  const request = () => {
    setLoading(true);
    fetch(URL)
      .then((response) => response.json())
      .then((resolved) => setData(resolved.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    setLoading(false);
  };

  useEffect(() => {
    request();
  }, []);

  return { loading, error, data, request };
}

export default useFetch;
