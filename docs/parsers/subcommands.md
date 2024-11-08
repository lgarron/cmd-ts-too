# `subcommands`

This is yet another combinator, which takes a couple of [`command`](./command.md)s and produce a new command that the first argument will choose between them.

### Config

- `name` (required): A name for the container
- `version`: The container version
- `cmds`: An object where the keys are the names of the subcommands to use, and the values are [`command`](./command.md) instances. You can also provide `subcommands` instances to nest a nested subcommand!

### Usage

```ts
import { command, subcommands, run } from 'cmd-ts-too;

const cmd1 = command({
  /* ... */
});
const cmd2 = command({
  /* ... */
});

const subcmd1 = subcommands({
  name: 'my subcmd1',
  cmds: { cmd1, cmd2 },
});

const nestingSubcommands = subcommands({
  name: 'nesting subcommands',
  cmds: { subcmd1 },
});

run(nestingSubcommands, process.argv.slice(2));
```
