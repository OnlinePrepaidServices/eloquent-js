import {Collection} from "collect.js";
import {Line} from "./Line";

export class SourceFile {
    lines: Collection<Line> = new Collection<Line>();
    newLineCharacter: string;

    constructor(sourceCode: string, newLineCharacter: string = "\n") {
        this.newLineCharacter = newLineCharacter;
        this.splitText(sourceCode).forEach((line, lineNumber: number) => {
            this.lines.push(new Line(lineNumber + 1, line));
        })
    }

    protected splitText(text: string): string[] {
        return text.split(this.newLineCharacter);
    }

    public removeLine(lineNumber: number): this {
        this.lines.each((line, index) => {
            if (line.removed) {
                return;
            }

            if (line.isOriginal(lineNumber)) {
                // Remove previous line if this is a blank line.
                const previousLine = this.lines.where('originalKey', line.originalKey - 1).first();
                if (previousLine.isEmpty()) {
                    previousLine.remove();
                }

                line.remove();

                return;
            }

            if (line.gte(lineNumber)) {
                line.decreaseKey();

                return;
            }
        });

        return this;
    }

    public addLinesAtEndOfClass(text: string): void {
        const line: Line = this.findLastClosingBracket()

        if (typeof line === 'undefined') {
            console.log(this.lines);
        }

        this.splitText(text).forEach((newLine, lineNumber: number) => {
            this.insertLineAt(line, newLine);
        })
    }

    public insertLineAt(line: Line, value: string): void {
        const newLine: Line = new Line(line.key as number - 1, value);
        this.lines.where(line.key, '>=', line.key).each((currentLine) => {
            currentLine.increaseKey();
        });

        this.lines.push(newLine);
    }

    protected findLastClosingBracket(): Line {
        const lastClosingBracketLine: Collection<Line> = this.lines.reverse().filter((line) => {
            return !(line.removed || line.toString() !== '}');
        })

        return lastClosingBracketLine.first();
    }

    public toString(): string {
        let contents = '';

        const sortedLines = this.lines.sortBy('key');

        sortedLines.each((line) => {
            if (line.removed) {
                return;
            }

            contents = contents + this.newLineCharacter + line.toString();
        })

        contents = contents.trimStart();


        // // @todo this should be easier
        // Object.entries(this.lines.items).forEach((line) => {
        //     const currentLine = line[1] as Line;
        //     if (currentLine.isEmpty()) {
        //         emptyLines++
        //
        //         if (emptyLines <= 1) {
        //             contents = contents + this.newLineCharacter + currentLine.toString();
        //         }
        //
        //         return;
        //     }
        //
        //     emptyLines = 0;
        //     contents = contents + this.newLineCharacter + currentLine;
        // })

        return contents;
    }
}