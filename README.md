# Urlito

Declarative API for persisting application state to URL

## Synopsis

```javascript
import ViewModel from 'statium';
import stateToUri from 'urlito';

const defaultState = {
    foo: 'bar',
    qux: {
        time: Date.now(),
    },
};

const [getStateFromUri, setStateToUri] = stateToUri(defaultState, [
    'foo',
    {
        key: 'qux.time',
        uriKey: 'time',
        fromUri: time => parseInt(time, 10),
        toUri: time => String(time),
    },
});

const Component = () => (
    <ViewModel initialState={getStateFromUri}
        observeStateChange={setStateToUri}>
        
        {/* ... */}
    </ViewModel>
);
```

## Introduction

A helper library for [Statium](https://github.com/riptano/statium), Urlito makes it easier
to persist application state to the `query` portion of its URL.

The default export is a function (`stateToUri`) that accepts two arguments. The first
argument is an object with keys and values corresponding to the default state of the
ViewModel. The second argument is state key descriptors enumerating keys that should be
retrieved from the URL by getter function, and persisted to the URL by the setter function.
The return value is a tuple of these functions: `[getStateFromUri, setStateToUri]`.

## Retrieving state

To read state from URI, the `getStateFromUri` function should be called with no arguments.
It will iterate over the state keys defined in `stateToUri` call, and if the key is present
in the `query` portion of the URL, its value will be used instead of default.

The return value is an object with initial state of the ViewModel.

## Persisting state

To write state to the URI, the `setStateToUri` function should be called with one argument:
an object containing actual ViewModel state. For each state key defined in the `stateToUri`
call, the actual value will be compared with default value; if the value in the actual state
object is defined and does not equal to default, it will be persisted to the `query` portion
of the URL. If the value in the actual state object equals to default, this key will be
deleted from the `query` portion of the URL.

There is no return value for this function.

## State key descriptors

The second argument to `stateToUri` function is a data structure that describes state keys
we are interested in. This can be an object describing keys and their properties, or
an array of descriptors.

An array is the simplified form:

```javascript
const stateKeys = [
    // Read parameter 'foo' in the URL query, set the value to key 'foo' in the state object
    'foo',
    
    // Read parameter 'bar.baz' in the URL query, set the value to key 'baz' contained
    // in the object 'bar' of the state object. Selectors are in lodash get/set format.
    'bar.baz',
    
    { ... }, // See object form below
];
```

An object has the following format:

```javascript
const stateKeys = {
    foo: {
        // Define key selector in array format, ignored for object format
        key: 'foo',
        
        // Name of the URL 'query' portion parameter to read from/write to
        uriKey: 'foobaroo',
        
        // Function that parses the value when reading from the URL.
        // Default is to return the value as is.
        fromUri: value => value,
        
        // Function that stringifies the value when writing to the URL.
        // Default is no conversion.
        toUri: value => value,
        
        // Function to compare default value with actual value when reading from
        // URL (after parsing) and writing to URL (before stringification).
        // This function is passed two arguments and is expected to return true
        // when they are equal, false otherwise.
        // Default is lodash.isEqual()
        equals: (a, b) => isEqual(a, b),
    },
};
```

