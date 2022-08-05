import {Configuration} from "../Configuration";

export class Url {
    public static parseUrlParameters(url: string): string[] {
        let regex = new RegExp(Configuration.get('url').regex);
        let matches: RegExpExecArray | never[] | null = [];
        let result: string[] = [];

        while (matches = regex.exec(url)) {
            result.push(matches[1]);
        }

        return result;
    }

    public static getUrlParameters(url: string, parameters: { [key: string]: any } = {}): { [key: string]: any } {
        let urlParameterNames = this.parseUrlParameters(url);

        // @todo replace objects vs arrays so a variable can be used multiple times.
        let parameterObject: { [key: string]: any } = {};
        urlParameterNames.forEach(function (value, index) {
            if (!parameters || parameters[value] === undefined) {
                throw 'Missing parameter [' + value + '] to getUrlParameters()';
            }

            parameterObject[value] = parameters[value];
        })

        return parameterObject;
    }

    public static replaceUrlParameters(url: string, parameters: { [key: string]: any } = {}): string {
        let urlWithParameters = url;

        let parameterObject = this.getUrlParameters(url, parameters);

        Object.entries(parameterObject).forEach(entry => {
            const [key, value] = entry;

            // @todo let's make this configurable.
            if (value === null) {
                return;
            }

            urlWithParameters = urlWithParameters.replace('{' + key + '}', value);
        });

        return urlWithParameters;
    }
}
