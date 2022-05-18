import { GenericImage, GenericItemModel, GenericModel } from "./base.model";

export class SerieModel {
  id!: number;
  title!: string;
  description!: string;
  modified!: Date;
  resourceURI!: string;
  stories!: GenericItemModel;
  thumbnail!: GenericImage;
  creators!: GenericModel;
  characters!: GenericModel;
  comics!: GenericModel;
  events!: GenericModel;
}
