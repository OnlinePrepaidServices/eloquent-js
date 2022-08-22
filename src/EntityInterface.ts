import {Collection} from "collect.js";

export interface EntityInterface {
    getAttributesData(): Collection<any>;
}

export type EntityInterfaceConstructor = new(attributes?: object | undefined, fetchedFromServer?: boolean | undefined) => EntityInterface;

export declare var EntityInterface: EntityInterfaceConstructor;