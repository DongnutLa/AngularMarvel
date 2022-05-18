import { GenericImage, GenericItemModel, GenericModel } from "./base.model";

export class ComicModel {
  id!: number;
  title!: string;
  description!: string;
  modified!: Date;
  pageCount!: number;
  resourceURI!: string;
  series!: GenericItemModel;
  prices!: Array<ComicPrice>;
  thumbnail!: GenericImage;
  creators!: GenericModel;
  characters!: GenericModel;
  stories!: GenericModel;
  events!: GenericModel;
}

export class ComicPrice {
  type!: string;
  price!: number;
}

export class FavoriteComic {
  id!: number;
  title!: string;
  image!: string;
}
