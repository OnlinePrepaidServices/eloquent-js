import {EE} from "../Support/Event/EE";
import {TestListener} from "../__tests_data__/Support/TestListener";
import {TestEvent} from "../__tests_data__/Support/TestEvent";

jest.mock("../__tests_data__/Support/TestListener", () => {
    return {
        TestListener: jest.fn().mockImplementation((key) => {
            return {key: key, handle: jest.fn()}
        })
    }
});
const mockedWildcardTestListener = TestListener as jest.Mocked<typeof TestListener>;

describe('EventEmitter', () => {
    it('can emit an event', () => {
        const mockedWildcardTestListener = TestListener as jest.Mocked<typeof TestListener>;

        EE.on(new mockedWildcardTestListener('test.test'))

        EE.emit(new TestEvent('test.test'));
    });

    it('can catch all events emitted', () => {
        const mock = new mockedWildcardTestListener('*');
        EE.on(mock);

        EE.emit(new TestEvent('test.test'));

        expect(mock.handle).toBeCalled();
    })
});


//
//
// EventEmitter.on(new class extends AbstractListener {
//     readonly key: string
//
//     constructor(entity: Entity) {
//         super();
//         this.key = EventKey.from(EventKey.RETRIEVED).prefixKey(entity.constructor.name);
//     }
//
//     handle(): void {
//         console.log('Yeah Baby');
//     }
//
// }(new User()));EventEmitter.on(new class extends AbstractListener {
//     readonly key: string
//
//     constructor(entity: Entity) {
//         super();
//         this.key = EventKey.from(EventKey.RETRIEVED).prefixKey(entity.constructor.name);
//     }
//
//     handle(): void {
//         console.log('Yeah Baby 3');
//     }
//
// }(new User()));
//
// EventEmitter.on(new class extends AbstractListener {
//     readonly key: string
//
//     constructor(entity: Entity) {
//         super();
//         this.key = 'entity.retrieved.*';
//     }
//
//     handle(): void {
//         console.log('Yeah Baby 2');
//     }
//
// }(new User()));EventEmitter.on(new class extends AbstractListener {
//     readonly key: string
//
//     constructor(entity: Entity) {
//         super();
//         this.key = 'entity.retrieved';
//     }
//
//     handle(): void {
//         console.log('Yeah Baby 2');
//     }
//
// }(new User()));
//
// EventEmitter.emit(new class extends AbstractEvent {
//     readonly key: string = 'entity.retrieved.user';
//
//     constructor() {
//         super();
//     }
// })
