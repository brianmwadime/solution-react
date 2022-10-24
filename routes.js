const hashed = (path, hash) => {
  if ((typeof hash === 'string' && hash !== '') || typeof hash === 'number') {
    return `${path}#${hash}`;
  }
  return path;
};

export const queried = (path, params) => {
  const keys = typeof params === 'object' && params !== null && Object.keys(params)
    .filter(key => /string|number|boolean/.test(typeof params[key]));
  if (keys && keys.length > 0) {
    const queriedPath = path + '?' + keys
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
    return queriedPath;
  }
  return path;
};

export const parseQuery = (location, avaliableQueryParams) => {
  const params = {};
  location.search
    .substring(1)
    .split('&')
    .map(param => param.split('='))
    .map(kv => kv.map(decodeURIComponent))
    .filter(([paramName]) => !avaliableQueryParams || avaliableQueryParams.includes(paramName))
    .map(([paramName, paramValue]) => { params[paramName] = paramValue; });
  return params;
};

export const removeQueryParams = (location, removingParams = []) => {
  const rp = typeof removingParams === 'string' ? [removingParams] : removingParams;
  const search = location.search
    .substring(1)
    .split('&')
    .map(param => param.split('='))
    .filter(([paramName]) => !rp.includes(decodeURIComponent(paramName)))
    .map(pair => pair.join('='))
    .join('&'); // add '?' ?
  return { ...location, search };
};

export const addQueryParams = (location, params) => {
  const search = queried('', { ...parseQuery(location), ...params });
  return { ...location, search };
};

export const setQueryParams = (location, params) => {
  const search = queried('', { ...params });
  return { ...location, search };
};