import {Entity} from "../../Entity";
import {AttributeBag} from "../../Bag/AttributeBag";
import {RelationBag} from "../../Bag/RelationBag";
import {DateTimeCast} from "../../Casts/DateTimeCast";
import {CastsBag} from "../../Bag/CastsBag";
import {Moment} from "moment";

export class User extends Entity {
    protected static baseRoute(): string {
        return 'users';
    }

    protected attributes(attributes: AttributeBag): void {
        attributes
            .create('uuid', undefined, ['string'])
            .create('firstName', undefined, ['string'])
            .create('lastName', undefined, ['string'])
            .create('email', undefined, ['string'])
            .create('createdAt', undefined, ['Moment'], ['string']);
    }

    protected relations(relations: RelationBag) {
        relations
            .create('createdBy', User)
            .create('createdByMultiple', User, true)
            .create('unit', User);
    }

    protected casts(casts: CastsBag) {
        casts.create('createdAt', DateTimeCast);
    }

    get uuid(): string {
        return this.get('uuid');
    }

    set uuid(value: string) {
        this.set('uuid', value);
    }

    get firstName(): string {
        return this.get('firstName');
    }

    set firstName(value: string) {
        this.set('firstName', value);
    }

    get lastName(): string {
        return this.get('lastName');
    }

    set lastName(value: string) {
        this.set('lastName', value);
    }

    get email(): string {
        return this.get('email');
    }

    set email(value: string) {
        this.set('email', value);
    }

    get createdAt(): Moment {
        return this.get('createdAt');
    }

    set createdAt(value: Moment | string) {
        this.set('createdAt', value);
    }

    get createdBy(): User {
        return this.get('createdBy');
    }

    set createdBy(value: User) {
        this.set('createdBy', value);
    }

    get createdByMultiple(): User[] {
        return this.get('createdByMultiple');
    }

    set createdByMultiple(value: User[]) {
        this.set('createdByMultiple', value);
    }

    get unit(): User {
        return this.get('unit');
    }

    set unit(value: User) {
        this.set('unit', value);
    }
}
