export class Converter {
    static toSnakeCase(value: string): string {
        return value.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }

    static toCamelCase(value: string): string {
        return value.replace(/([-_]\w)/g, g => g[1].toUpperCase());
    }

    static objectKeysToSnakeCase(object: { [key: string]: any }): { [key: string]: any } {
        let result: { [key: string]: any } = {};

        for (const [key, value] of Object.entries(object)) {
            result[this.toSnakeCase(key)] = value;
        }

        return result;
    }

    static objectKeysToCamelCase(object: { [key: string]: any }) : { [key: string]: any } {
        let result: { [key: string]: any } = {};

        for (const [key, value] of Object.entries(object)) {
            result[this.toCamelCase(key)] = value;
        }

        return result;
    }
}
