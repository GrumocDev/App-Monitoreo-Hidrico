type FiltersType = {
  [key: string]: string|boolean|number
}
import { Filters } from "types/SensorFilter";


const arrayToQuery = (query: URLSearchParams, params: Array<Filters>) => {
  const queries = new URLSearchParams(query.toString());
  for (const filter of params) {
    const key = filter[0];
    if (filter[1]) {
      queries.set(key, filter[1].toString());
    } else {
      queries.delete(key);
    }
  }
  return queries;
};

function buildUrlWithFilters(baseUrl: string, filters: FiltersType, ordering?:string): string {

  if(ordering){
    filters = {
      ...filters,
      ordering: ordering
    }
  }

  const entries = Object.entries(filters)
  const queryString = entries.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`).join('&');
  
  return `${baseUrl}?${queryString}`;
  
}

export { arrayToQuery, buildUrlWithFilters };
