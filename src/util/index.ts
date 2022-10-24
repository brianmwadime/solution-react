export const handleSectionNavigation = (id) => {
  const element = document.getElementById(id);
  const offset = 45;
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element?.getBoundingClientRect().top ?? 0;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

export function debounce(callback, wait, context = this) {
  let timeout = null;
  let callbackArgs = null;

  const later = () => callback.apply(context, callbackArgs);

  return function (...args) {
      callbackArgs = args;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
  };
}

/* eslint-disable no-mixed-operators */
export function randomInt(a, b) {
  const min = (b ? a : 0) - 0.5;
  const max = b || a || Number.MAX_SAFE_INTEGER;
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export const fileNameFormat = (str = '', ext = '') => {
  const name = str.replace(/[^a-zA-Z0-9]/g, '_');
  return `${name}${ext}`;
};

export const toUnderscore = (s) =>
    s
        .split(/(?=[A-Z])/)
        .join('_')
        .toLowerCase();

export const getUniqueFilter = (keys) => (item, i, list) =>
    !list.some((item2, j) => j < i && keys.every((key) => item[key] === item2[key] && item[key] !== undefined));

export const numberWithCommas = (x) => (x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0);

export const numberCompact = (x) => (x >= 1000 ? x / 1000 + 'k' : x);

export const filterList = <T extends Record<string, any>>(
  list: T[],
  searchQuery: string,
  testKeys: string[],
  searchCb?: (listItem: T, query: RegExp
) => boolean): T[] => {
  if (searchQuery === '') return list;
  const filterRE = getRE(searchQuery, 'i');
  let _list = list.filter((listItem: T) => {
      return testKeys.some((key) => filterRE.test(listItem[key]) || searchCb?.(listItem, filterRE));
  });
  return _list;
}

export const convertNumberRange = (oldMax, oldMin, newMin, newMax, currentValue) => {
  let newValue;
  let newRange;
  const oldRange = oldMax - oldMin;

  if (oldRange === 0) {
      newValue = newMin;
  } else {
      newRange = newMax - newMin;
      newValue = ((currentValue - oldMin) * newRange) / oldRange + newMin;
  }
  return newValue;
};

export const isValidUrl = urlString => {
  var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
  return !!urlPattern.test(urlString);
}

export const confirm = (message, callback) => {
  const sure = window.confirm(message);
  if (!sure) return;
  callback();
};

const KB = 1 << 10;
const MB = KB << 10;
const GB = MB << 10;
export function formatBytes(bt: number): string {
    if (bt > GB) {
        return `${Math.trunc((bt / GB) * 1e2) / 1e2}GB`;
    }
    if (bt > MB) {
        return `${Math.trunc((bt / MB) * 1e2) / 1e2}MB`;
    }
    if (bt > KB) {
        return `${Math.trunc((bt / KB) * 1e2) / 1e2}KB`;
    }
    return `${bt}B`;
}

export function percentOf(part: number, whole: number): number {
    return whole > 0 ? (part * 100) / whole : 0;
}

export function fileType(url: string) {
    const filename = url.split(/[#?]/)
    if (!filename || filename.length == 0) return ''
    const parts = filename[0].split('.')
    if (!parts || parts.length == 0) return ''
    return parts.pop().trim();
}

export function fileName(url: string) {
    if (url) {
        var m = url.toString().match(/.*\/(.+?)\./);
        if (m && m.length > 1) {
            return `${m[1]}.${fileType(url)}`;
        }
    }
    return '';
}

export const camelCased = (val) =>
    val.replace(/_([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });

export function capitalize(s: string) {
    if (s.length === 0) return s;
    return s[0].toUpperCase() + s.slice(1);
}

export const titleize = (str) => {
    let upper = true;
    let newStr = '';
    for (let i = 0, l = str.length; i < l; i++) {
        // Note that you can also check for all kinds of spaces  with
        // str[i].match(/\s/)
        if (str[i] == ' ') {
            upper = true;
            newStr += str[i];
            continue;
        }
        if (str[i] == '_') {
            upper = true;
            newStr += ' ';
            continue;
        }
        newStr += upper ? str[i].toUpperCase() : str[i].toLowerCase();
        upper = false;
    }
    return newStr;
};

export const sliceListPerPage = <T extends Array<any>>(list: T, page: number, perPage = 10): T => {
  const start = page * perPage;
  const end = start + perPage;
  return list.slice(start, end) as T;
};

export const positionOfTheNumber = (min, max, value, length) => {
  const interval = (max - min) / length;
  const position = Math.round((value - min) / interval);
  return position;
};

export const unserscoreToSpaceAndCapitalize = (str) => {
  return str.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const convertToCSV = (headers, objArray) => {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  const headersMap = headers.reduce((acc, curr) => {
      acc[curr.key] = curr;
      return acc;
  }, {});

  str += headers.map((h) => h.label).join(',') + '\r\n';

  for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in headersMap) {
          if (line !== '') line += ',';
          line += array[i][index];
      }
      str += line + '\r\n';
  }

  return str;
};

export const exportCSVFile = (headers, items, fileTitle) => {
  var jsonObject = JSON.stringify(items);
  var csv = convertToCSV(headers, jsonObject);
  var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
      var link = document.createElement('a');
      if (link.download !== undefined) {
          var url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', exportedFilenmae);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
};

export const fetchErrorCheck = async (response: any) => {
  if (!response.ok) {
      return Promise.reject(response);
  }
  return response.json();
};

export const compareJsonObjects = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export function millisToMinutesAndSeconds(millis: any) {
  const minutes = Math.floor(millis / 60000);
  const seconds: any = ((millis % 60000) / 1000).toFixed(0);
  return minutes + 'm' + (seconds < 10 ? '0' : '') + seconds + 's';
}
