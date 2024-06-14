export function indexBy<T>(array: T[], key: keyof T) {
  const indexedData = {} as any;

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const keyValue = item[key];

    indexedData[keyValue] = item;
  }

  return indexedData;
}
