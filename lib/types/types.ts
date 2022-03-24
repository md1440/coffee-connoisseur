export interface CoffeeStore {
	id: number;
	name: string;
	imgUrl: string;
	websiteUrl: string;
	address: string;
	neighbourhood: string;
}

export interface Venue {
  fsq_id: string;
  categories: Category[];
  chains: any[];
  distance: number;
  geocodes: Geocodes;
  location: Location;
  name: string;
  related_places: Relatedplaces;
  timezone: string;
}

export interface Relatedplaces {
  parent?: Parent;
}

export interface Parent {
  fsq_id: string;
  name: string;
}

export interface Location {
  address: string;
  country: string;
  formatted_address: string;
  locality: string;
  postcode: string;
  region: string;
  cross_street?: string;
  neighborhood?: string[];
}

export interface Geocodes {
  main: Main;
  roof: Main;
}

export interface Main {
  latitude: number;
  longitude: number;
}

export interface Category {
  id: number;
  name: string;
  icon: Icon;
}

export interface Icon {
  prefix: string;
  suffix: string;
}
