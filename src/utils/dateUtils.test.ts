import { getHour, getRandomDate } from "./dateUtils";

describe('getHour', () => {
    it('return Invalid date for 22.10.2022', () => {
        expect(getHour('22.10.2022')).toBe('Invalid date');
    });

    it('return Invalid date for empty string', () => {
        expect(getHour('')).toEqual('Invalid date');
    })

    it('return 15:00 from new Date()', () => {
        expect(getHour('Sun Mar 06 2022 15:00:29 GMT+0100 (Central European Standard Time)')).toBe('15:00');
    })
});

describe('getRandomDate', () => {
    it('return object', () => {
        expect(typeof getRandomDate()).toBe('object');
    });
});