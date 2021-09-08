import { Coordinates } from "../location/coordinates";

export class DistanceHelper {

  getDistanceFromLatLonInKm(coordsA: Coordinates, coordsB: Coordinates): number {
    const radius = 6371; // Radius of the earth in km
    const dLat = this.degreeToRadians(coordsB.latitude - coordsA.latitude);
    const dLon = this.degreeToRadians(coordsB.longitude - coordsA.longitude);
    const a = Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
      Math.cos(this.degreeToRadians(coordsA.latitude)) *
      Math.cos(this.degreeToRadians(coordsB.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c; // Distance in km
    return distance;
  }
  private degreeToRadians(degree: number): number {
    return degree * (Math.PI / 180);
  }
}
