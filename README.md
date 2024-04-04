# @chriscdn/to-date

A utility for converting numbers and strings to a `Date`.

## Motivation

This package adds a few conveniences over simply calling `new Date(value)`:

- returns `undefined` instead of an `Invalid Date` object if the result is not a valid date
- detects whether a `number` input is in milliseconds or microseconds, and converts accordingly
- includes an `isDate` function to detect if an object is valid date

## Installation

Using npm:

```bash
npm install @chriscdn/to-date
```

Using yarn:

```bash
yarn add @chriscdn/to-date
```

## Usage

### toDate

The `toDate` function accepts `number` (ms or μs), `string`, `Date`, `null`, or `undefined` and returns either a `Date` or `undefined`.

For numbers, the method examines the magnitude of the number and makes a best guess as to whether it represents milli- or microseconds, and converts accordingly.

**Example:**

```js
import { toDate, ToDateNumberUnit } from "@chriscdn/to-date";

toDate("2024-04-04T00:00:00");

toDate(1712226790000000)
> 2024-04-04T10:33:10.000Z
```

By default, a best guess is made whether a number is in milliseconds or microseconds. Ambiguity can be removed with the `ToDateNumberUnit` enum:

```js
toDate(1712226790000000, ToDateNumberUnit.MICROSECONDS)
> 2024-04-04T10:33:10.000Z
```

### isDate

The `isDate` function accepts a value, and returns `true` if the value is a valid `Date`.

**Example:**

```js
import { isDate } from "@chriscdn/to-date";

isDate("2024-04-04T00:00:00"); // false

isDate(new Date("hello")); // false

isDate(new Date()); // false
```

## License

[MIT](LICENSE)
