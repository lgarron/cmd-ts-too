import { execa } from "execa";

export function app(
  scriptPath: string,
): (args: string[], env?: Record<string, string>) => ReturnType<typeof execa> {
  return (args: string[], env?: Record<string, string>) =>
    execa("bun", ["run", scriptPath, ...args], {
      all: true,
      reject: false,
      env: {
        ...env,
        FORCE_COLOR: "true",
      },
    });
}
