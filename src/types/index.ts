export type APIType = {
  [column: string]: string | string[] | undefined,
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents?: string[],
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type CardAtribute = {
  column : string,
  operator: string,
  value: number,
};
