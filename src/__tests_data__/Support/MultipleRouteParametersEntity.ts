import {Entity} from "../../Entity";
import {AttributeBag} from "../../Bag/AttributeBag";
import {RelationBag} from "../../Bag/RelationBag";

/**
 * @class Entity
 */
export class MultipleRouteParametersEntity extends Entity {
    protected static baseRoute(): string {
        return 'users/{unit}';
    }

    protected attributes<T>(attributes: AttributeBag): void {
        attributes
            .create('uuid')
            .create('firstName')
            .create('lastName')
            .create('email');
    }

    get uuid() {
        return this.get('uuid');
    }

    set uuid(value: string) {
        this.set('uuid', value);
    }

    get firstName() {
        return this.get('firstName');
    }

    set firstName(value) {
        this.set('firstName', value);
    }

    get lastName() {
        return this.get('lastName');
    }

    set lastName(value: string) {
        this.set('lastName', value);
    }

    get email() {
        return this.get('email');
    }

    set email(value) {
        this.set('email', value);
    }
}