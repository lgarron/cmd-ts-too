import { command, run, subcommands } from "./index";

const cmd1 = command({
  name: "foo",
  args: {},
  handler: () => {
    console.log("foo");
  },
});

const cmd2 = command({
  name: "bar",
  args: {},
  handler: () => {
    console.log("bar");
  },
});

const subcmd1 = subcommands({
  name: "my subcmd1",
  cmds: { cmd1, cmd2 },
});

const nestingSubcommands = subcommands({
  name: "commandy",
  cmds: { subcmd1 },
});

run(nestingSubcommands, process.argv.slice(2));
