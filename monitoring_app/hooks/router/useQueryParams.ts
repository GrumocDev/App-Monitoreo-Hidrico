"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { arrayToQuery } from "utils/querys";
import { Filters } from "types/SensorFilter";

export default function useQueryParams() {
  const { push } = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();

  const set = async (queryParam: URLSearchParams) => {
    push(`${pathname}${`?${queryParam.toString()}`}`);
  };

  const add = (param: string, value: string = "", multiple = false) => {
    const queries = new URLSearchParams(query?.toString());
    const queryValue = query?.get(param);

    if (multiple) {
      if (query && query?.getAll(param)?.length > 0) {
        if (query?.getAll(param).indexOf(value) === -1 && queryValue) {
          queries.append(param, value);
        } else {
          const valueParam = query?.getAll(param).filter((val) => val !== value);
          queries.delete(param);
          valueParam?.map((value) => queries.append(param, value));
        }
      } else {
        if (queryValue === value) {
          queries.delete(param);
        } else {
          if (queryValue !== undefined && queryValue) {
            queries.append(param, value);
          } else {
            queries.set(param, value);
          }
        }
      }
      return set(queries);
    }

    if (value) {
      queries.set(param, value);
    } else {
      queries.delete(param);
    }
    return set(queries);
  };

  const addMany = (params: Array<Filters>) => {
    const queries = arrayToQuery(query, params);
    return set(queries);
  };

  const remove = (params: Array<string>) => {
    const queries = new URLSearchParams(query?.toString());
    for (const param of params) {
      queries.delete(param);
    }
    return set(queries);
  };

  const clear = (param: string | null, value: string | number | null) => {
    let queries: URLSearchParams;

    if (param && value) {
      queries = new URLSearchParams(`${param}=${value}`);
    } else {
      queries = new URLSearchParams();
    }

    set(queries);
  };

  return {
    query,
    set,
    add,
    addMany,
    remove,
    clear,
  };
}
