import { binary, command, oneOf, option, optional, run } from "./index";

const outputFormats = ["text", "link", "json-text"] as const;

const cmd1 = command({
  name: "foo",
  args: {
    format: option({
      description: `Output format. One of: ${outputFormats.join(", ")}`,
      type: optional(oneOf(outputFormats)),
      long: "format",
      short: "f",
    }),
  },
  handler: () => {
    // console.log("foo handler");
    cmd1.printCompletions("fish");
  },
});

await run(binary(cmd1), process.argv);
