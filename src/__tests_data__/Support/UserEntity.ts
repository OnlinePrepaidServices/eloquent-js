import {Entity} from "../../Entity";
import {AttributeBag} from "../../Bag/AttributeBag";
import {RelationBag} from "../../Bag/RelationBag";
import {Bag} from "../../Bag/Bag";
import {DateTimeCast} from "../../Casts/DateTimeCast";
import {CastsBag} from "../../Bag/CastsBag";

export class User extends Entity {
    protected static baseRoute(): string {
        return 'users';
    }

    protected attributes(attributes: AttributeBag): void {
        attributes
            .create('uuid')
            .create('firstName')
            .create('lastName')
            .create('email')
            .create('createdAt');
    }

    protected relations(relations: RelationBag) {
        relations
            .create('createdBy', User)
            .create('unit', User);
    }

    protected casts(casts: CastsBag) {
        casts.create('createdAt', DateTimeCast);
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

    get createdBy() {
        return this.get('createdBy');
    }

    set createdBy(value) {
        this.set('createdBy', value);
    }

    get createdAt() {
        return this.get('createdAt');
    }

    set createdAt(value) {
        this.set('createdAt', value);
    }
}