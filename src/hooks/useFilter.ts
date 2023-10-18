import React, { useState, useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import { APIType, CardAtribute } from '../types';

const useFilters = () => {
  const { planets,
    searchPlanet,
    setSearchPlanet,
    filterPlanets,
    setFilterPlanets,
    filterByNumericValues,
    setFilterByNumericValues,
    error,
    loading,
    sorted,
    setSorted,
  } = useContext(GlobalContext);

  const INITIAL_STATE = {
    search: '',
    column: 'population',
    operator: 'maior que',
    value: 0,
    order: 'population',
    ascendente: false,
    descendente: false,
  };

  const planetAtributes = [
    'population',
    'rotation_period',
    'orbital_period',
    'diameter',
    'surface_water',
  ];
  const [inputs, setInputs] = useState(INITIAL_STATE);
  const [filterOptions, setFilterOptions] = useState<string[]>(planetAtributes);
  const [orderOptions, setOrderOptions] = useState<string[]>(planetAtributes);

  // função que recebe o valor da search bar e filtra planetas com base no valor
  const searchByName = (search: string) => {
    const filter = planets.filter(
      (planet) => planet.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    );
    setSearchPlanet(filter);
  };

  // função que atualiza o estado de acordo com o input alterado e atualiza estado de planetas filtrados
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { target } = event;
    const { name, value } = target;
    if (name === 'search') {
      searchByName(value);
    }
    if (name === 'ascendente') {
      setInputs((prevInputs) => (
        { ...prevInputs, ascendente: true, descendente: false }
      ));
    }
    if (name === 'descendente') {
      setInputs((prevInputs) => (
        { ...prevInputs, ascendente: false, descendente: true }
      ));
    }
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  // função que filtra planetas de acordo com valor e operador
  const filterByAtribute = (
    list:APIType[],
    operator:string,
    column:string,
    value:number,
  ) => (list.filter((planet:APIType) => {
    if (operator === 'maior que' && Number(planet[column]) > value) {
      return planet;
    }
    if (operator === 'menor que' && Number(planet[column]) < value) {
      return planet;
    }
    if (operator === 'igual a' && Number(planet[column]) === Number(value)) {
      return planet;
    }
    return '';
  }));

  // função que dispara ao clicar no botão de filtrar e retorna planetas filtrados e o seu card de filtro
  const filterByValue = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // select, operador e valor ativos no momento do clique
    const { column, operator, value } = inputs;

    // função que decide se filtra planetas já filtrados ou todos os planetas (caso não haja filtro ativo)
    const planetsToFilter = () => {
      return filterPlanets.length > 0 ? filterPlanets : planets;
    };

    const list = planetsToFilter();
    if (list !== undefined) {
      const filter = filterByAtribute(list, operator, column, value);
      setFilterPlanets(filter);
    }
    const newCard = { column, operator, value };
    setFilterByNumericValues([...filterByNumericValues, newCard]);
    const filtered = filterOptions.filter((option) => option !== column);
    setFilterOptions([...filtered]);
    const nextColumn = filtered.find((atribute) => atribute !== column);
    if (nextColumn !== undefined) {
      setInputs({ ...inputs,
        column: nextColumn });
    }
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>, column: string) => {
    event.preventDefault();
    // analisar lógica abaixo

    const reduceCardFilter = filterByNumericValues.filter(
      (atribute) => atribute.column !== column,
    );
    setFilterByNumericValues(reduceCardFilter);
    setFilterOptions([...filterOptions, column]);

    const remainingAtributes = filterByNumericValues.filter(
      (atribute) => atribute.column !== column,
    );
    remainingAtributes.forEach((atribute: CardAtribute) => {
      const values = Object.values(atribute);
      const [coluna, operador, valor] = values;
      const list = filterByAtribute(
        planets,
        operador.toString(),
        coluna.toString(),
        Number(valor),
      );
      setFilterPlanets([...list]);
    });
  };

  const handleClearFilters = () => {
    setFilterByNumericValues([]);
    setFilterPlanets([]);
  };
  const sortAsc = (list: APIType[], order:string) => {
    const result = list.sort((a, b) => {
      if (a[order] === 'unknown'
      && b[order] !== 'unknown'
      ) return 1;
      if (a[order] !== 'unknown'
      && b[order] === 'unknown'
      ) return -1;
      if (Number(a[order]) < Number(b[order])) return -1;

      return 0;
    });
    return result;
  };
  const sortDesc = (list: APIType[], order:string) => {
    const result = list.sort((a, b) => {
      if (a[order] === 'unknown' && b[order] !== 'unknown') return 1;
      if (a[order] !== 'unknown' && b[order] === 'unknown') return -1;
      if (Number(a[order]) > Number(b[order])) return -1;

      return 0;
    });
    return result;
  };
  const orderByValue = () => {
    const { order, ascendente, descendente } = inputs;
    const list = filterPlanets.length > 0 ? filterPlanets : planets;

    if (ascendente) {
      const sortedDefault = sortAsc(list, order);
      setFilterPlanets([...sortedDefault]);
    }
    if (descendente) {
      const sortedInverted = sortDesc(list, order);
      setFilterPlanets([...sortedInverted]);
    }
    setSorted(true);
  };

  return {
    planets,
    searchPlanet,
    setSearchPlanet,
    filterPlanets,
    filterByValue,
    inputs,
    handleChange,
    handleRemove,
    handleClearFilters,
    error,
    loading,
    filterByNumericValues,
    filterOptions,
    setFilterOptions,
    orderOptions,
    setOrderOptions,
    orderByValue,
    sorted,
  };
};

export default useFilters;
