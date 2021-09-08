export interface IAddressReturnModel {
  input_index: number;
  candidate_index: number;
  delivery_line_1: string;
  last_line: string;
  delivery_point_barcode: string;
  components: IComponentModel;
  metadata: IMetadataModel;
  analysis: IAnalysisModel;
}
export interface IComponentModel {
  primary_number: string;
  street_predirection: string;
  street_name: string;
  street_suffix: string;
  city_name: string;
  default_city_name: string;
  state_abbreviation: string;
  zipcode: string;
  plus4_code: string;
  delivery_point_point: string;
  delivery_point_point_check_digit: string;
}
export interface IMetadataModel {
  record_type: string;
  zip_type: string;
  county_fips: string;
  county_name: string;
  carrier_route: string;
  congrssional_district: string;
  building_default_indicator: string;
  rdi: string;
  elot_sequence: string;
  elot_sort: string;
  latitude: number;
  longitude: number;
  precision: string;
  time_zone: string;
  utc_offset: number;
  dst: boolean;
}
export interface IAnalysisModel {
  dpv_match_code: string;
  dpv_footnotes: string;
  dpv_cmra: string;
  dpv_vacant: string;
  dpv_no_stat: string;
  active: string;
  footnotes: string;
}

export class AddressReturnModel implements IAddressReturnModel {
  input_index: number;
  candidate_index: number;
  delivery_line_1: string;
  last_line: string;
  delivery_point_barcode: string;
  components: IComponentModel;
  metadata: IMetadataModel;
  analysis: IAnalysisModel;
}
export class ComponentModel implements IComponentModel {
  primary_number: string;
  street_predirection: string;
  street_name: string;
  street_suffix: string;
  city_name: string;
  default_city_name: string;
  state_abbreviation: string;
  zipcode: string;
  plus4_code: string;
  delivery_point_point: string;
  delivery_point_point_check_digit: string;
}
export class MetadataModel implements IMetadataModel {
  record_type: string;
  zip_type: string;
  county_fips: string;
  county_name: string;
  carrier_route: string;
  congrssional_district: string;
  building_default_indicator: string;
  rdi: string;
  elot_sequence: string;
  elot_sort: string;
  latitude: number;
  longitude: number;
  precision: string;
  time_zone: string;
  utc_offset: number;
  dst: boolean;
}
export class AnalysisModel implements IAnalysisModel {
  dpv_match_code: string;
  dpv_footnotes: string;
  dpv_cmra: string;
  dpv_vacant: string;
  dpv_no_stat: string;
  active: string;
  footnotes: string;
}
