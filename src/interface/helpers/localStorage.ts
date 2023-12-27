export default class LocalStorage {
  storage = window.localStorage;

  constructor(private prefix: string) {}

  /**
   *
   * @param key string key name
   * @param def default value. return type depends on default value
   */
  get(key: string, def: number): number;
  get(key: string, def: string): string;
  get(key: string, def: boolean): boolean;
  get(key: string, def: number | string | boolean): number | string | boolean {
    if (!this.storage) return def;
    const value = this.storage.getItem(`${this.prefix}:${key}`);
    switch (typeof def) {
      case "number":
        return value !== null ? Number(value) || 0 : def;
      case "string":
        return value !== null ? value : def;
      case "boolean":
        return value !== null ? !!Number(value) : def;
    }
  }

  /**
   *
   * @param key string key name
   * @param value value of 3 types
   * @returns
   */
  public set(key: string, value: number | string | boolean) {
    if (!this.storage) return console.error("Local storage not set");
    if (!this.prefix.length) return console.warn("Prefix not set");
    switch (typeof value) {
      case "number":
        this.storage.setItem(`${this.prefix}:${key}`, value.toString());
        break;
      case "string":
        this.storage.setItem(`${this.prefix}:${key}`, value);
        break;
      case "boolean":
        this.storage.setItem(`${this.prefix}:${key}`, Number(value).toString());
        break;
    }
  }
}
