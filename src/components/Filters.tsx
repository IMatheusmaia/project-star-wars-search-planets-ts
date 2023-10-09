import useFilters from '../hooks/useFilter';

function Filters() {
  const { inputs,
    handleChange,
    handleRemove,
    handleClearFilters,
    filterByValue,
    filterByNumericValues,
    filterOptions } = useFilters();

  return (
    <div className="filters-container">
      <label>
        <h2>Projeto Star Wars - Trybe</h2>
        <input
          value={ inputs.search }
          type="text"
          name="search"
          data-testid="name-filter"
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <form>
        <label>
          Coluna
          <select
            name="column"
            defaultValue={ inputs.column }
            data-testid="column-filter"
            onChange={ (event) => handleChange(event) }
          >
            {filterOptions.map((value, index) => (
              <option
                key={ index }
                value={ value }
              >
                {value}
              </option>
            ))}
          </select>
        </label>
        <label>
          Operador
          <select
            name="operator"
            defaultValue={ inputs.operator }
            data-testid="comparison-filter"
            onChange={ (event) => handleChange(event) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <input
          type="number"
          data-testid="value-filter"
          name="value"
          value={ inputs.value }
          onChange={ (event) => handleChange(event) }
        />
        <button
          data-testid="button-filter"
          onClick={ filterByValue }
        >
          FILTRAR
        </button>
      </form>

      <div>
        <label>
          Ordenar
          <select defaultValue={ inputs.order }>
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>

        <label>
          <input
            type="radio"
            name="ascendente"
            checked={ inputs.ascendente }
            onChange={ (event) => handleChange(event) }
          />
          Ascendente
        </label>
        <label>
          <input
            type="radio"
            name="descendente"
            checked={ inputs.descendente }
            onChange={ (event) => handleChange(event) }
          />
          Descendente
        </label>
        <button
          onClick={ () => {} }
        >
          ORDENAR
        </button>
      </div>
      {filterByNumericValues.length > 0 && (filterByNumericValues.map((card, index) => (
        <div
          key={ index }
          className="cardFilter-container"
        >
          <div
            className="cardFilter"
            data-testid="filter"
          >
            {`${card.column} ${card.operator} ${card.value}`}
            <button
              onClick={ (event) => handleRemove(event, card.column) }
              name={ card.column }
            >
              X
            </button>
          </div>
        </div>
      )))}
      <button
        data-testid="button-remove-filters"
        onClick={ handleClearFilters }
      >
        Remover todas filtragens
      </button>
    </div>
  );
}

export default Filters;
