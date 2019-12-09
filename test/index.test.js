import {
    getValuesFromUri, setValuesToUri, getLocation, mockSearch, unmockSearch
} from '../src';

afterEach(() => {
    unmockSearch();
});

describe("getValuesFromUri", () => {
    test("when values present in the uri, should return them", () => {
        mockSearch("foo=bar&blerg=hloom");
        
        const values = getValuesFromUri(['foo', 'blerg'], {
            foo: 'kazoo',
            blerg: 'grunk',
        });
        
        expect(values).toEqual({
            foo: 'bar',
            blerg: 'hloom',
        });
    });
    
    test("when values are not present in the uri, should return defaults", () => {
        mockSearch("klutz=mabble&pom=qux");
        
        const values = getValuesFromUri(['durg', 'ghfex'], {
            durg: 'jak',
            ghfex: 'throbbe',
        });
        
        expect(values).toEqual({
            durg: 'jak',
            ghfex: 'throbbe',
        });
    });
});

describe("setValuesToUri", () => {
    test("given non-default values, should set them to uri", () => {
        setValuesToUri(['antz', 'plugh', 'krackle'], {
            antz: 'mumg',
            plugh: 'niom',
            krackle: 'efik',
        });
        
        const { search } = getLocation();
        
        expect(search).toBe("?antz=mumg&plugh=niom&krackle=efik");
    });
    
    test("given default values, should unset them from uri", () => {
        mockSearch("zumg=borg&donk=wuut");
        
        setValuesToUri(['donk', 'jang', 'blutz'], {
            donk: 'dink',
            jang: 'prung',
            blutz: 'qyes',
            kloogh: 'erop',
        }, {
            donk: 'dink',
            jang: 'karoo',
            blutz: 'yuam',
        });
        
        const { search } = getLocation();
        
        expect(search).toEqual("?zumg=borg&jang=prung&blutz=qyes");
    });
});
