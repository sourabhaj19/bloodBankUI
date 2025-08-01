import { Country } from "../country/country.model";

export interface State {
  id: number;
  name: string;
  country: Country;
}