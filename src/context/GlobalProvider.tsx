import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import GlobalContext, { GlobalContextType } from './GlobalContext';
import { APIType, CardAtribute } from '../types';

type GlobalProviderProps = {
  children: React.ReactNode
};

function GlobalProvider({ children }: GlobalProviderProps) {
  const { data, error, loading } = useFetch('https://swapi.dev/api/planets');

  const [filterPlanets, setFilterPlanets] = useState<APIType[]>([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState<CardAtribute[]>([]);
  const [searchPlanet, setSearchPlanet] = useState<APIType[]>([]);
  const [sorted, setSorted] = useState<boolean>(false);

  return (
    <GlobalContext.Provider
      value={
      {
        planets: data,
        loading,
        error,
        searchPlanet,
        setSearchPlanet,
        filterPlanets,
        setFilterPlanets,
        filterByNumericValues,
        setFilterByNumericValues,
        sorted,
        setSorted,
      } as GlobalContextType
}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
