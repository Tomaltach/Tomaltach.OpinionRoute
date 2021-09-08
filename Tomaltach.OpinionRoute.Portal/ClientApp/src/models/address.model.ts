export interface IAddressModel {
  address: string;
  city: string;
  state: string;
}

export class AddressModel implements IAddressModel {
  address: string;
  city: string;
  state: string;
}
