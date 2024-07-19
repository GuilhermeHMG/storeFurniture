function flattenObject(obj, parentKey = "") {
  return Object.keys(obj).reduce((acc, key) => {
    const prefixedKey = parentKey ? `${parentKey}[${key}]` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], prefixedKey));
    } else {
      acc[prefixedKey] = obj[key];
    }
    return acc;
  }, {});
}

export function toQueryString(obj) {
  if (!obj) return "";
  const flattenedObj = flattenObject(obj);
  return `?${Object.keys(flattenedObj)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(flattenedObj[key])}`
    )
    .join("&")}`;
}
