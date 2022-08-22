import {Entity} from "../../Entity";

type entityObject = { entity: typeof Entity, filePath: string }[];

export class GetterAndSetterBag {
    entities: entityObject = [];

    push(entity: typeof Entity, filePath: string) {
        this.entities.push({
            entity,
            filePath
        });
    }

    forEach(callback: (entity: typeof Entity, filePath: string) => void) {
        this.entities.forEach((entity) => {
            callback(entity.entity, entity.filePath);
        })
    }
}
