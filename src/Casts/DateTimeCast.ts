import {Cast} from "./Cast";
import moment from "moment";

export class DateTimeCast extends Cast {
    public static get(value: any, parameters: any): any {
        if (!value) {
            return null;
        }

        return moment(value);
    }

    static set(value: any, parameters: any): any {
        let date;
        if (!value) {
            return null;
        }

        if (typeof value === 'string' && (date = moment(value)) && date.isValid()) {
            return date.toISOString();
        }

        return value.toISOString();
    }
}
