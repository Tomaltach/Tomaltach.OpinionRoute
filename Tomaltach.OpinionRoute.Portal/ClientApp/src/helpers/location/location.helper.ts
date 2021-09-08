import { Coordinates } from "./coordinates";

export class LocationHelper {

  async getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(response => {
          const coords = new Coordinates();
          coords.latitude = response.coords.latitude;
          coords.longitude = response.coords.longitude;
          resolve(coords);
        },
        err => {
          reject(err);
        });
    });
  }
}
