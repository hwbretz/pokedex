import { url } from "inspector";
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

    const cacheCheck = this.cache.get(locationURL);
    if(cacheCheck){
      return cacheCheck;
    }

    try{
      const response = await fetch(locationURL, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const result: Location = await response.json();
      this.cache.add(locationURL, result);
       return result;
    } catch (err) {
      throw new Error(`ERROR: ${(err as Error).message}`);
    }
   
  };
  async fetchPokemon(pokemonName?: string) : Promise<Pokemon> {
    const pokemonURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const cacheCheck = this.cache.get(pokemonURL);
    if(cacheCheck){
      return cacheCheck;
    }

    try {
      const response = await fetch(pokemonURL, {
        method: "GET",
      });
      if(!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      const newPokemon: Pokemon = {
        name: result.name,
        base_experience: result.base_experience,
        height: result.height,
        weight: result.weight,
        stats: result.stats,
        types: result.types,    
      }
      this.cache.add(pokemonURL,newPokemon);
      return newPokemon;
    } catch (err) {
      throw new Error(`ERROR: ${(err as Error).message}`);
    }

  };
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

export type Pokemon = {
    name: string,
    base_experience: number,
    height: number,
    weight: number,
    stats: {
      base_stat: number,
      effort: number,
      stat: {
        name: string,
        url: string,
      };
    }[];
    types: {
      slot: number;
      type: {
        name: string,
        url: string,
      };
    }[];
};