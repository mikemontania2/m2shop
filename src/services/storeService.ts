import sucursales from '../data/sucursales.json';

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  schedule: string;
  mapEmbed?: string;
}

export const getStores = async (): Promise<Store[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(sucursales as Store[]), 300));
};
