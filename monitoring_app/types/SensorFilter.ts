type CategoriesMap = {
  [key: string]: Array<string>;
};

type Filters = [string, number | string | boolean | undefined | Date];

export type { CategoriesMap, Filters };
