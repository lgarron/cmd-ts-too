import { type ExecaReturnValue, execa } from "execa";

export function app(
  scriptPath: string,
): (args: string[]) => Promise<ExecaReturnValue> {
  return async (args) => {
    const result = await execa("bun", ["run", scriptPath, ...args], {
      all: true,
      reject: false,
      env: {
        FORCE_COLOR: "true",
      },
    });
    return result;
  };
}
