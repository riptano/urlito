import qs from 'qs';
import isEqual from 'lodash/isEqual';
import { createBrowserHistory } from 'history';

const setUriSearchString = search => {
    const history = createBrowserHistory();
    
    history.replace({
        ...window.location,
        search: typeof search === 'object' ? qs.stringify(search) : search,
    });
};

// window.location.search returns ?data=1&data=2 for example (notice with the question mark)
export const getValuesFromUri = (keys, defaults = {}) => {
    const values = { ...defaults };
    
    try {
        const query = qs.parse(window.location.search.substring(1));
        
        keys.forEach(key => {
            if (key in query) {
                values[key] = query[key];
            }
        });
    }
    catch (e) {
        // This block is intentionally left blank to defang ESLint no-empty rule.
    }
    
    return values;
};

export const setValuesToUri = (keys, values = {}, defaults = {}) => {
    const query = qs.parse(window.location.search.substring(1));
    const newQuery = { ...query };
    
    keys.forEach(key => {
        const value = values[key];
        
        if (Object.is(value, defaults[key])) {
            delete newQuery[key];
        }
        else {
            newQuery[key] = value;
        }
    });
    
    if (!isEqual(query, newQuery)) {
        setUriSearchString(newQuery);
    }
};

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
