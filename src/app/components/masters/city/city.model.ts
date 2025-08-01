import { State } from "../state/state.model";

export interface City {
  id?: number;
  name: string;
  state: State;
}