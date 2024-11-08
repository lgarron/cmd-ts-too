import { execa } from "execa";

export function app(
  scriptPath: string,
): (args: string[]) => ReturnType<typeof execa> {
  return (args) =>
    execa("bun", ["run", scriptPath, ...args], {
      all: true,
      reject: false,
      env: {
        FORCE_COLOR: "true",
      },
    });
}
