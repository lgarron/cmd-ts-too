# Flags

A command line flag is an argument or arguments in the following formats:

- `--long-key`
- `--long-key=true` or `--long-key=false`
- `-s`
- `-s=true` or `--long-key=false`

where `long-key` is "the long form key" and `s` is "a short form key".

Flags can also be stacked using their short form. Let's assume we have flags with the short form keys of `a`, `b` and `c`: `-abc` will be parsed the same as `-a -b -c`.

There are two ways to parse flags:

- [The `flag` parser](#flag) which parses one and only one flag
- [The `multiflag` parser](#multiflag) which parser none or multiple flags

## `flag`

Parses one and only one flag. Accepts a `Type` from `boolean` to any value to decode the users' intent.

In order to make this optional, either the type provided or a `defaultValue` function should be provided. In order to make a certain type optional, you can take a look at [`optional`](../included_types.md#optionaltype)

This parser will fail to parse if:

- There are zero flags that match the long form key or the short form key
- There are more than one flag that match the long form key or the short form key
- A value other than `true` or `false` was provided (if it was treated like [an option](./options.md))
- Decoding the user input fails

### Usage

```ts
import { command, boolean, flag } from 'cmd-ts-too;

const myFlag = flag({
  type: boolean,
  long: 'my-flag',
  short: 'f',
});

const cmd = command({
  name: 'my flag',
  args: { myFlag },
});
```

### Config

- `type` (required): A type from `boolean` to any value
- `long` (required): The long form key
- `short`: The short form key
- `description`: A short description regarding the option
- `displayName`: A short description regarding the option
- `defaultValue`: A function that returns a default value for the option
- `defaultValueIsSerializable`: Whether to print the defaultValue as a string in the help docs.

## `multiflag`

Parses multiple or zero flags. Accepts a `Type` from `boolean[]` to any value, letting you do the conversion yourself.

> **Note:** using `multiflag` will drop all the contextual errors. Every error on the type conversion will show up as if all of the options were errored. This is a higher level with less granularity.

This parser will fail to parse if:

- A value other than `true` or `false` was provided (if it was treated like [an option](./options.md))
- Decoding the user input fails

### Config

- `type` (required): A type from `boolean[]` to any value
- `long` (required): The long form key
- `short`: The short form key
- `description`: A short description regarding the flag
- `displayName`: A short description regarding the flag
