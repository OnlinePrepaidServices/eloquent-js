import {GetterAndSetterBag} from "./GetterAndSetterBag";
import * as fs from "fs";
import {parse, simpleTraverse, TSESTree, TSESTreeOptions} from "@typescript-eslint/typescript-estree";
import {GeneralObject} from "../../GeneralTypes";
import {Collection} from "collect.js";
import {SourceFile} from "./SourceFile";
import {Entity} from "../../Entity";

const range = (start: number, stop: number, step = 1) =>
    Array(Math.ceil((stop - start + 1) / step)).fill(start).map((x, y) => x + y * step)

const options: TSESTreeOptions = {
    comment: false,
    jsx: false,
    range: true,
    loc: true
}

export class GetterAndSetterCommand {
    protected getSetBag: GetterAndSetterBag;

    constructor(getSetBag: GetterAndSetterBag) {
        this.getSetBag = getSetBag;
    }

    public handle(lineEndings: string) {
        this.getSetBag.forEach((entity, filePath) => {
            this.processFile(entity, filePath, lineEndings);
        })
    }

    protected processFile(entity: typeof Entity, filePath: string, lineEndings: string) {
        const source = fs.readFileSync(filePath, 'utf8')
        const file = new SourceFile(source, lineEndings);

        const entityObject: Entity = new entity();

        const attributesCollection: Collection<any> = entityObject.getAttributesData();
        const keys: string[] = attributesCollection.pluck('key').toArray();

        this.removeAttributeGetterAndSetters(file, source, keys);
        this.addAttributeGettersAndSetters(file, keys, attributesCollection);

        fs.writeFile(filePath, file.toString(), () => {
            console.log(`Saved file ${entity.name}`);
        });
    }

    protected addAttributeGettersAndSetters(file: SourceFile, keys: string[], attributesCollection: Collection<any>) {
        keys.forEach((key: string) => {
            const attributeData = attributesCollection.where('key', key).first();
            const type: string = attributeData.type?.length ? `: ${(attributeData.type as unknown as string[]).join(' | ')}` : '';
            const setType: string = attributeData.setType?.length ? `: ${(attributeData.setType as unknown as string[]).join(' | ')}` : '';

            const template =
                `
    get ${key}()${type} {
        return this.get('${key}');
    }

    set ${key}(value${setType}) {
        this.set('${key}', value);
    }`

            file.addLinesAtEndOfClass(template);
        })
    }

    protected removeAttributeGetterAndSetters(file: SourceFile, source: string, keys: string[]) {
        const program = parse(source, options);

        simpleTraverse(program, {
            enter(node: any) {
                if (node.type === 'MethodDefinition' && keys.includes((node.key as GeneralObject).name)) {
                    range(node.loc.start.line, node.loc.end.line).forEach((line: number) => {
                        file.removeLine(line);
                    })
                }
            }
        });
    }
}
