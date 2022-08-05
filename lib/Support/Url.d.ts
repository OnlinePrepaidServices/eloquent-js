export declare class Url {
    static parseUrlParameters(url: string): string[];
    static getUrlParameters(url: string, parameters?: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
    static replaceUrlParameters(url: string, parameters?: {
        [key: string]: any;
    }): string;
}
