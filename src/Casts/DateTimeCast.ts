import {Cast} from "./Cast";
import * as moment from "moment/moment";

export class DateTimeCast extends Cast {
    static get(value: any): any {
        if (!value) {
            return null;
        }

        return moment(value);
    }

    static set(value: any): any {
        let date;
        if (!value) {
            return null;
        }

        if (typeof value === 'string' && (date = moment(value)) && date.isValid()) {
            return date.format();
        }

        return value.format();
    }
}