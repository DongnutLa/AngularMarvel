import { GenericImage, GenericModel } from "./base.model";

export class CharacterModel{
  id!: number;
  name!: string;
  description!: string;
  thumbnail!: GenericImage;
  modified!: Date;
  resourceURI!: string;
  comics!: GenericModel;
  series!: GenericModel;
  stories!: GenericModel;
  events!: GenericModel;
  urls!: Array<any>;
}

