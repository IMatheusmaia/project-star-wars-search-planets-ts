import { useState, useEffect } from 'react';
import useFilters from '../hooks/useFilter';
import Loading from './Loading';
import Board from './Board';
import { APIType } from '../types';

function Table() {
  const {
    planets,
    searchPlanet,
    filterPlanets,
    filterByNumericValues,
    error, loading } = useFilters();

  const [render, setRender] = useState<APIType[]>([]);

  useEffect(() => {
    if (searchPlanet.length > 0) {
      setRender(searchPlanet);
    }
    if (searchPlanet.length <= 0
      && filterPlanets.length > 0
    ) {
      setRender(filterPlanets);
    }
    if ((filterPlanets.length === 0
      && searchPlanet.length <= 0)
      || (filterByNumericValues.length === 0 && searchPlanet.length <= 0)) {
      setRender(planets);
    }
  }, [planets, searchPlanet, filterByNumericValues, filterPlanets]);

  const dataLessResidentes = render.map((item:APIType) => {
    delete item.residents;
    return item;
  });

  if (loading) {
    return <Loading />;
  }
  if (error === null) {
    return (
      <Board data={ dataLessResidentes } />
    );
  }
  return (
    <h2>
      { error }
    </h2>
  );
}

export default Table;
