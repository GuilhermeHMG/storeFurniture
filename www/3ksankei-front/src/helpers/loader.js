import { ref } from "vue";

// FIXME: Typing Incomplete

/**
 * @template T
 * @template U
 *
 * @param {(args: U) => T} loadFunction
 * @returns {{
 *  loading: boolean,
 *  data: Awaited<T>,
 *  rows: number,
 *  totalRecords: number,
 *  load: (args: U) => Promise<Awaited<T>>,
 *  loadPage: (args: U, force: boolean|undefined) => Promise<Awaited<T>>,
 *  onPage: (params: import("./types").OnPageChangeParams) => Promise<Awaited<T>>,
 *  onSort: (sortInfo: string|number) => void
 * }}
 */
export const Loader = (loadFunction, defaultData = undefined) => {
  const l = {
    loading: ref(false),
    data: ref(defaultData),
    options: {},
    setOptions: (options) => {
      l.options = options;
    },
    load: async (options) => {
      l.loading.value = true;
      l.options = options;
      const data = await loadFunction(options);
      l.totalRecords.value = +data?.total ?? data?.length ?? 0;
      l.loadedPages = {};
      l.data.value = data;
      l.loading.value = false;
      return data;
    },
    rows: ref(10),
    page: ref(1),
    totalRecords: ref(0),
    loadedPages: {},
    loadPage: async (options, force = false) => {
      l.loading.value = true;
      const page = options.page;
      const per_page = options.per_page;
      l.rows.value = per_page;

      let data = l.loadedPages[page];
      const rowsChanged = data && data?.data?.length !== per_page;

      if (!data || rowsChanged || force) {
        data = await loadFunction(options);
        const newTotal = +data?.total ?? data?.length ?? 0;

        if (newTotal !== l.totalRecords.value) {
          l.loadedPages = {};
          l.totalRecords.value = newTotal;
        }

        l.options = options;
        l.loadedPages[page] = data;
      }

      if (options.page === l.page.value) {
        l.data.value = data;
      }

      l.loading.value = false;
      return data;
    },
    /**
     * @param {import("@/components/ConsultasTable/types").OnPageChangeParams} params
     */
    onPage: async (params) => {
      l.page.value = params.page + 1;
      l.rows.value = params.rows;
      const options = l.mountOptions();

      const data = await l.loadPage(options);

      l.totalRecords.value = +data?.total ?? data?.length ?? 0;
      return data;
    },
    sort_dir: undefined,
    sort_by: undefined,
    flag_sort_dir: undefined,
    flag_sort_by: undefined,
    sorting: ref(false),
    onSort: async (sortInfo) => {
      if (typeof sortInfo === "number") {
        const dir = sortInfo < 0 ? "desc" : "asc";
        l.sort_dir = dir;
        l.flag_sort_dir = true;
      }
      if (typeof sortInfo === "string") {
        l.sort_by = sortInfo;
        l.flag_sort_by = true;
      }
      // Flag cause this function is called twice with the sort values
      if (l.flag_sort_by && l.flag_sort_dir) {
        if (l.sorting.value) return;
        l.sorting.value = true;
        l.page.value = 1;
        l.totalRecords.value = 1;
        const options = l.mountOptions();
        l.loadedPages = {};
        l.data.value = defaultData;

        const data = await l.loadPage(options);

        l.flag_sort_by = undefined;
        l.flag_sort_dir = undefined;
        l.sorting.value = false;
        l.totalRecords.value = +data?.total ?? data?.length ?? 0;
        return data;
      }
    },
    mountOptions: () => {
      const options = Object.assign({}, l.options);
      options.page = l.page.value;
      options.per_page = l.rows.value;
      options.sort_by = l.sort_by;
      options.sort_dir = l.sort_dir;

      for (const key of Object.keys(options)) {
        if (options[key] === undefined) {
          delete options[key];
        }
      }

      return options;
    },
  };
  return l;
};
