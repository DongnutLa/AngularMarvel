export class GenericModel {
  available!: number;
  collectionURI!: string;
  items!: Array<GenericItemModel>;
  returned!: number;
}

export class GenericItemModel{
  name!: string;
  resourceURI!: string;
  type?: string;
  role?: string;
}

export class GenericImage{
  path!: string;
  extension!: string;
}

export class ResponseModel<T> {
  code!: number;
  status!: string;
  copyright!: string;
  attributionText!: string;
  attributionHTML!: string;
  etag!: string;
  data!: dataModel<T>;
}

export class dataModel<T> {
  offset!: number;
  limit!: number;
  total!: number;
  count!: number;
  results!: Array<T>
}

export class Params {
  name: string = '';
  limit: number = 10;
  offset: number = 0;
  orderBy: string = '';
}
