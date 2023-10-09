import { createContext } from 'react';
import { APIType, CardAtribute } from '../types';

export type GlobalContextType = {
  planets: APIType[] | [],
  loading: boolean,
  error: string | null,
  searchPlanet: APIType[],
  setSearchPlanet: (searchPlanet: APIType[]) => void,
  filterPlanets : APIType[],
  setFilterPlanets: (planets: APIType[]) => void,
  filterByNumericValues: CardAtribute[],
  setFilterByNumericValues:(card: CardAtribute[]) => void,
};

const GlobalContext = createContext({} as GlobalContextType);

export default GlobalContext;
