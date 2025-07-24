type QueryStringParams<T> = {
  [K in keyof T]: string | number | boolean | undefined
}

export const buildQueryString = <T,>(params: QueryStringParams<T>) =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`
    )
    .join('&')
