# @chriscdn/to-date

A utility for converting numbers and strings into `Date` objects.

## Motivation

This package offers several improvements over directly calling `new Date(value)`, including:

- Returning `null` instead of an `Invalid Date` object when the input is not a valid date.
- Automatically detecting whether a `number` input is in seconds, milliseconds, or microseconds and converting accordingly.
- Providing an `isDate` function to check if a value is a valid `Date` object.

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

The `toDate` function accepts a `number`, `string`, `Date`, `null`, or `undefined` and returns either a `Date` or `null`.

For numeric inputs, it determines whether the value represents seconds, milliseconds, or microseconds and converts accordingly.

Date strings without a specified time zone are interpreted using the device's time zone.

**Examples:**

```ts
import { toDate } from "@chriscdn/to-date";

// Interprets in the device's time zone (e.g., CET)
toDate("2024-04-04T00:00:00");
// 2024-04-03T22:00:00.000Z

toDate(1712226790000000);
// 2024-04-04T10:33:10.000Z
```

To resolve ambiguity about whether a numeric input represents seconds, milliseconds, or microseconds, use the `EpochUnit` enum. For dates after 1971, this distinction should not be an issue.

```ts
import { toDate, EpochUnit } from "@chriscdn/to-date";

toDate(1712226790000000, EpochUnit.MICROSECONDS);
// 2024-04-04T10:33:10.000Z
```

### toDateUTC

The `toDateUTC` function has the same interface as `toDate`, but parses string dates in Coordinated Universal Time (UTC). This is especially useful when a string representation lacks time zone information (for example, `2025-02-27T15:00:00`). Without UTC conversion, such strings are parsed according to the time zone on the server, which can lead to inconsistent results across different environments.

To perform the conversion, the function first calls `toDate` on the input, extracts the year, month, day, hours, minutes, and seconds, and then creates a new `Date` object in UTC with those values.

**Example:**

```ts
import { toDateUTC } from "@chriscdn/to-date";

toDateUTC("2024-04-04T00:00:00");
// 2024-04-04T00:00:00.000Z
```

### toDateInTimeZone

Similar to `toDateUTC`, this function accepts a time zone parameter, allowing the date to be parsed in that time zone and returning the result in UTC format.

**Example:**

```ts
import { toDateInTimeZone } from "@chriscdn/to-date";

toDateInTimeZone("2025-06-27T14:00:00", "America/Toronto");
// 2025-06-27T18:00:00.000Z
```

### isDate

The `isDate` function checks whether a given value is a valid `Date` object and returns `true` if it is.

**Examples:**

```ts
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
