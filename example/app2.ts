#!/usr/bin/env bun

import { env } from "node:process";
import {
  type Type,
  boolean,
  command,
  extendType,
  flag,
  option,
  run,
  string,
} from "../src";

const PrNumber = extendType(string, {
  async from(branchName) {
    const prNumber = branchName === "master" ? "10" : undefined;

    if (!prNumber) {
      throw new Error(`There is no PR associated with branch '${branchName}'`);
    }

    return prNumber;
  },
  defaultValue: () => "Hello",
  completions: () => ({
    _tag: "any-string",
  }),
});

const Repo: Type<string, string> = {
  ...string,
  defaultValue: () => {
    throw new Error("Can't infer repo from git");
  },
  description: "repository uri",
  displayName: "uri",
};

const app = command({
  name: "build",
  // biome-ignore lint/complexity/useLiteralKeys: nopez
  noArgsErrorBehaviour: (env["NO_ARGS_FALLBACK_FOR_TESTING"] ?? "help") as
    | "show-help"
    | "show-error",
  args: {
    user: option({
      type: string,
      env: "APP_USER",
      long: "user",
      short: "u",
    }),
    password: option({
      type: string,
      env: "APP_PASS",
      long: "password",
      short: "p",
    }),
    repo: option({
      type: Repo,
      long: "repo",
      short: "r",
    }),
    prNumber: option({
      type: PrNumber,
      short: "b",
      long: "pr-number",
      env: "APP_BRANCH",
    }),
    dev: flag({
      type: boolean,
      long: "dev",
      short: "D",
    }),
  },
  handler: ({ repo, user, password, prNumber, dev }) => {
    console.log({ repo, user, password, prNumber, dev });
  },
});

run(app, process.argv.slice(2));
