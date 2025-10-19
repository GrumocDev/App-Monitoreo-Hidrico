import React, { useState } from 'react'
import { Filters } from '@/types/SensorFilter';
import SensorParams from '@/constans/sensors/SensorParams'
import useQueryParams from '../router/useQueryParams';

export default function useFilterSensors() {

  const [filterProduct, setFilterProduct] = useState([]);
  const { addMany } = useQueryParams()

  const mergeFilters = (filters: Filters[], filterProduct: Filters[]) => {
    if (filterProduct) {
      const set = new Set(filterProduct);
      const filter = Array.from(set);
  
      filters.forEach(([name, value]) => {
        const index = filter.find(([filterName]) => filterName === name);
        if (index) {
          set.delete(index);
          set.add([name, value]);
        } else {
          set.add([name, value]);
        }
      });
  
      return Array.from(set);
    }
  
    return filters;
  };

  const filterDate = (gt: Date | null, lt: Date | null) => {
    
    let filters: Array<Filters> = [
      [SensorParams.DATE_GTE, gt || undefined],
      [SensorParams.DATE_LTE, lt || new Date()]
    ];

    addMany(filters);

  }

  return {
    filterDate
  }
}
