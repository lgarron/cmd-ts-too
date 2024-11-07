import { expect, test } from "vitest";
import { createCmd } from "../example/negative-numbers";
import { runSafely } from "../src";

test("negative numbers", async () => {
  // biome-ignore lint/suspicious/noAsyncPromiseExecutor: TODO
  const result = await new Promise<number>(async (resolve, reject) => {
    const cmd = createCmd();
    cmd.handler = async ({ number }) => {
      resolve(number);
    };

    const runResult = await runSafely(cmd, ["--number", "-10"]);
    if (runResult._tag === "error") {
      reject(runResult.error);
    }

    // TODO: unresolved case?
  });

  expect(result).toEqual(-10);
});
