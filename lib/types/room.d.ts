import ColourChoices from './colour-choices';

export interface Room {
  uuid: string;
  name: string;
  currentLocationID: string;
  colour: ColourChoices;
  createdAt: string;
  updatedAt: string;
}
