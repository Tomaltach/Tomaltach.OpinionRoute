import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AddressReturnModel, AnalysisModel, ComponentModel, IAddressReturnModel, IAnalysisModel, IComponentModel, IMetadataModel, MetadataModel } from "../../models/address-return.model";
import { IAddressModel } from "../../models/address.model";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  clientId = "d4aa6891-1b2c-470d-1fa6-08d824b9eaef";
  clientSecret = "660ffdf5-28e9-4f5b-a8b5-3321b015f11a";

  constructor(private httpClient: HttpClient) { }

  async getAddress(model: IAddressModel): Promise<IAddressReturnModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'clientId': this.clientId,
        'clientSecret': this.clientSecret
      })
    };

    const apiUrl = `${environment.apiBasePath}address?street=${model.address}&city=${model.city}&state=${model.state}`;
    try {
      const response = await this.httpClient.get<IAddressReturnModel[]>(apiUrl, httpOptions).toPromise();
      return response;
    } catch (exception) {
      return this.dummyData();
    }
  }

  private dummyData(): IAddressReturnModel[] {
    const results: IAddressReturnModel[] = [];

    const item = new AddressReturnModel();
    item.input_index = 0;
    item.candidate_index = 0;
    item.delivery_line_1 = "1500 W 3rd St";
    item.last_line = "Cleveland OH 44113-1467";
    item.delivery_point_barcode = "441131467991";
    item.components = this.getComponents();
    item.metadata = this.getMetadata();
    item.analysis = this.getAnalysis();

    results.push(item);

    return results;
  }
  private getComponents(): IComponentModel {
    const components = new ComponentModel();
    components.primary_number = "1500";
    components.street_predirection = "W";
    components.street_name = "3rd";
    components.street_suffix = "St";
    components.city_name = "Cleveland";
    components.default_city_name = "Cleveland";
    components.state_abbreviation = "OH";
    components.zipcode = "44113";
    components.plus4_code = "1467";
    components.delivery_point_point = "99";
    components.delivery_point_point_check_digit = "1";

    return components;
  }
  private getMetadata(): IMetadataModel {
    const metadata = new MetadataModel();
    metadata.record_type = "H";
    metadata.zip_type = "Standard";
    metadata.county_fips = "39035";
    metadata.county_name = "Cuyahoga";
    metadata.carrier_route = "C022";
    metadata.congrssional_district = "11";
    metadata.building_default_indicator = "Y";
    metadata.rdi = "Commercial";
    metadata.elot_sequence = "0214";
    metadata.elot_sort = "A";
    metadata.latitude = 41.497360;
    metadata.longitude = -81.605710;
    metadata.precision = "Zip9";
    metadata.time_zone = "Eastern";
    metadata.utc_offset = -5;
    metadata.dst = true;

    return metadata;
  }
  private getAnalysis(): IAnalysisModel {
    const analysis = new AnalysisModel();
    analysis.dpv_match_code = "D";
    analysis.dpv_footnotes = "AAN1";
    analysis.dpv_cmra = "N";
    analysis.dpv_vacant = "N";
    analysis.dpv_no_stat = "Y";
    analysis.active = "Y";
    analysis.footnotes = "H#N#";

    return analysis;
  }
}
