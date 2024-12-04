# @chriscdn/to-date

A utility for converting numbers and strings to `Date`.

## Motivation

This package adds a few conveniences over simply calling `new Date(value)`:

- returns `undefined` instead of an `Invalid Date` object if the result is not a valid date
- detects whether a `number` input is in seconds, milliseconds, or microseconds, and converts accordingly
- includes an `isDate` function to test if an object is a valid date

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

The `toDate` function accepts a `number` (seconds, ms or μs), `string`, `Date`, `null`, or `undefined`, and returns a `Date` or `undefined`.

For numbers, the method makes a best guess as to whether the value is in seconds, milliseconds, or microseconds, and converts accordingly.

**Examples:**

```js
import { toDate } from "@chriscdn/to-date";

toDate("2024-04-04T00:00:00");
// 2024-04-03T22:00:00.000Z

toDate(1712226790000000);
// 2024-04-04T10:33:10.000Z
```

Ambiguity as to whether the number is in seconds, milliseconds, or microseconds can be removed with the `EpochUnit` enum. This shouldn't be an issue for dates after 1971.

```js
import { toDate, EpochUnit } from "@chriscdn/to-date";

toDate(1712226790000000, EpochUnit.MICROSECONDS);
// 2024-04-04T10:33:10.000Z
```

### isDate

The `isDate` function accepts a value, and returns `true` if the value is a valid `Date` object.

**Example:**

```js
import { isDate } from "@chriscdn/to-date";

isDate("2024-04-04T00:00:00");
// false

isDate(new Date("hello"));
// false

isDate(new Date());
// true
```

## License

[MIT](LICENSE)
