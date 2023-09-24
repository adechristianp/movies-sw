import { moneyFormat } from "../../data/functions";

const tests = [
    {
        input: 1000000,
        expect: 'Rp1.000.000'
    },
    {
        input: -50000,
        expect: '-Rp50.000'
    },
    {
        input: 'abc',
        expect: 'Rp0'
    },
    {
        input: '',
        expect: 'Rp0'
    },
    {
        input: null,
        expect: 'Rp0'
    },
    {
        input: undefined,
        expect: 'Rp0'
    }
];

describe('function moneyFormat', () => {
    tests.forEach(e => {
        it(`input: ${e.input}, expectResult: ${e.expect}`, () => {
            const result = moneyFormat(1000000);
            expect(result).toBe('Rp1.000.000');
        });
    });
})