import { GenericImage, GenericItemModel, GenericModel } from "./base.model";

export class EventModel {
  id!: number;
  title!: string;
  description!: string;
  modified!: Date;
  resourceURI!: string;
  series!: GenericItemModel;
  thumbnail!: GenericImage;
  creators!: GenericModel;
  characters!: GenericModel;
  comics!: GenericModel;
  stories!: GenericModel;
}
