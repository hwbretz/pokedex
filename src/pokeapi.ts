import { Cache } from "./pokecache.js";
import { CacheEntry } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache: Cache; 

  constructor(interval: number) {
    this.cache = new Cache(interval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const locationURL = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    //console.log(this.cache);
    // returns undefined if not present in cache
    if(this.cache.get(locationURL)){
      return this.cache.get(locationURL);
    }
    else {
      const response = await fetch(locationURL, {
          method: "GET",
      });
      type APIList<T> = { count: number; next: string | null; previous: string | null; results: T[] };
      type LocationListItem = { name: string; url: string };
      const result: APIList<LocationListItem> = await response.json();
      let shallowLocations: ShallowLocations = {
          next: result.next,
          previous: result.previous,
          results: result.results.map((r) => r.name),
      };
      this.cache.add(locationURL,shallowLocations);
      
      return this.cache.get(locationURL);
        //return shallowLocations;
    }
  }

  async fetchLocation(locationName?: string ): Promise<Location> {
    const locationURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const response = await fetch(locationURL, {
        method: "GET",
    });

    const result: Location = await response.json();
    
    /*let location: Location = {
        name: result.name,
        url: result.url,
        pokemon: result.pokemon_encounters.map((r) => r.pokemon);
    };*/
    return result;
  }
}

export type ShallowLocations = {
  next: string | null,
  previous: string | null,
  results: string[],
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};