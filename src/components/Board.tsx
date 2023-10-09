import { APIType } from '../types';

type DataProp = {
  data: APIType[]
};

function Board({ data }: DataProp) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          const keys = Object.values(item);
          return (
            <tr
              key={ item.url }
            >
              {keys.map((info, index) => (
                <td
                  key={ index }
                >
                  { info }
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Board;
