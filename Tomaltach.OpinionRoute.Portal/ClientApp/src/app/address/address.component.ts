import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactorTreeHelper } from "../../helpers/factor-tree/factor-tree.helper";
import { Coordinates } from "../../helpers/location/coordinates";
import { IAddressReturnModel } from "../../models/address-return.model";
import { AddressModel } from "../../models/address.model";
import { AddressService } from "./address.service";
import { LocationHelper } from "../../helpers/location/location.helper";
import { DistanceHelper } from "../../helpers/distance/distance.helper";

@Component({
  selector: 'opro-address',
  templateUrl: './address.component.html',
  styleUrls: ["./address.component.css"]
})
export class AddressComponent implements OnInit {
  pageTitle: string;

  address: string;
  city: string;
  state: string;

  hasData: boolean = true;
  addresses: IAddressReturnModel[];
  zipCode: string;
  localTime: Date;
  offset: string;
  reverse: string;
  timeToExecute: number;
  latitude: number;
  longitude: number;
  zipCodeDivision: number;
  distance: number;

  constructor(private router: Router, private addressService: AddressService) { }

  async ngOnInit(): Promise<void> { this.pageTitle = "Address"; }

  async submit() {
    const model = new AddressModel();
    model.address = this.address;
    model.city = this.city;
    model.state = this.state;

    const start = new Date().getMilliseconds();
    const result = await this.addressService.getAddress(model);
    this.timeToExecute = new Date().getMilliseconds() - start;
    if (this.timeToExecute <= -1) this.timeToExecute = this.timeToExecute * -1;

    this.addresses = result;
    this.processData();
  }
  getAddress(event) { this.address = event; }
  getCity(event) { this.city = event; }
  getState(event) { this.state = event; }

  async processData(): Promise<void> {
    if (this.addresses.length <= 0) {
      this.hasData = false;
      return;
    }
    this.hasData = true;
    const address = this.addresses[0];
    this.zipCode = address.components.zipcode;
    this.localTime = new Date();
    this.offset = this.getLocalTimeForUtcOffset(address.metadata.utc_offset);
    this.reverse = this.reverseWords(address.delivery_line_1);
    this.latitude = this.roundTo(address.metadata.latitude, 2);
    this.longitude = this.roundTo(address.metadata.longitude, 2);
    this.zipCodeDivision = this.getZipCodeDivision(address.components.zipcode);
    this.distance = await this.getDistance(address.metadata.latitude, address.metadata.longitude);
  }
  getLocalTimeForUtcOffset(offset: number): string {
    return offset - (this.localTime.getTimezoneOffset() / 60) + "";
  }
  reverseWords(strIn: string): string {
    const splitArray = strIn.split(" ");
    let str = "";
    for (let item of splitArray.reverse()) {
      str += item + " ";
    }
    return str;
  }
  roundTo(num: number, places: number): number {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  }
  getZipCodeDivision(zipCode: string): number {
    const factorTree = new FactorTreeHelper();
    return factorTree.run(+zipCode);
  }
  async getDistance(latitude: number, longitude: number): Promise<number> {
    const coordsA = new Coordinates();
    coordsA.latitude = latitude;
    coordsA.longitude = longitude;

    const locationHelper = new LocationHelper();
    const currentPosition = await locationHelper.getPosition();

    const coordsB = new Coordinates();
    coordsB.latitude = currentPosition.latitude;
    coordsB.longitude = currentPosition.longitude;

    const distanceHelper = new DistanceHelper();
    const distance = distanceHelper.getDistanceFromLatLonInKm(coordsA, coordsB);

    return this.roundTo(distance, 2);
  }
}
