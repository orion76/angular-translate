
export function trimSlash(str: string): string {
  return str.replace(/^\/+|\/+$/g, '');
}

export function clearDoubleSlash(str: string): string {
  return str.replace(/\/\//g, '\/');
}
