import qs from 'qs';
import isEqual from 'lodash.isequal';
import cloneDeep from 'lodash.clonedeep';
import has from 'lodash.has';
import get from 'lodash.get';
import set from 'lodash.set';
import unset from 'lodash.unset';
import { createBrowserHistory } from 'history';

const identity = o => o;

const setUriSearchString = search => {
    const history = createBrowserHistory();
    
    history.replace({
        ...window.location,
        search: typeof search === 'object' ? qs.stringify(search) : search,
    });
};

export const normalizeKeys = keys => {
    if (Array.isArray(keys)) {
        return keys.map(key => ({
            key,
            uriKey: key,
            fromUri: identity,
            toUri: identity,
            equals: isEqual,
        }));
    }
    else {
        return Object.keys(keys).map(key => {
            const options = keys[key];
            
            return {
                key,
                uriKey: options.uriKey || key,
                fromUri: options.fromUri || identity,
                toUri: options.toUri || identity,
                equals: options.comparator || isEqual,
            };
        });
    }
};

// window.location.search returns ?data=1&data=2 for example (notice with the question mark)
export const getValuesFromUri = (stateKeys, defaults = {}) => {
    const values = cloneDeep(defaults);

    try {
        const query = qs.parse(window.location.search.substring(1));
        const keys = normalizeKeys(stateKeys);
        
        for (const { key, uriKey, fromUri, equals } of keys) {
            if (has(query, uriKey)) {
                const value = fromUri(get(query, uriKey));
                const defaultValue = get(defaults, key);
                
                if (!equals(value, defaultValue)) {
                    set(values, key, value);
                }
            }
        }
    }
    catch (e) {
        // This block is intentionally left blank to defang ESLint no-empty rule.
    }
    
    return values;
};

export const setValuesToUri = (stateKeys, values = {}, defaults = {}) => {
    const query = qs.parse(window.location.search.substring(1));
    const newQuery = cloneDeep(query);
    
    const keys = normalizeKeys(stateKeys);
    
    for (const { key, uriKey, toUri, equals } of keys) {
        const value = get(values, key);
        const defaultValue = get(defaults, key);
        
        if (equals(value, defaultValue)) {
            unset(newQuery, uriKey);
        }
        else {
            set(newQuery, uriKey, toUri(value));
        }
    }
    
    if (!isEqual(query, newQuery)) {
        setUriSearchString(newQuery);
    }
};

const stateToUri = (defaultState, stateKeys) => {
    stateKeys = stateKeys || Object.keys(defaultState);
    
    return [
        () => getValuesFromUri(stateKeys, defaultState),
        store => setValuesToUri(stateKeys, store, defaultState)
    ];
};

export default stateToUri;

// Test utilities
let oldSearch;

export const getLocation = () => location;

export const mockSearch = search => {
    oldSearch = window.location.search;
    
    setUriSearchString(search);
};

export const unmockSearch = () => {
    setUriSearchString(oldSearch);
};
