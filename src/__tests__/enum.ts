import {EventKey} from "../Enum/EventKey";

describe('Enum', () => {
    it('can create an enum from name', () => {
        const retrievingEnum = EventKey.fromKey('RETRIEVED');
        expect(retrievingEnum).toBeInstanceOf(EventKey);
        expect(retrievingEnum.value).toEqual(EventKey.RETRIEVED);
    });
});