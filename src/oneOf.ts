import { inspect } from "node:util";
import { CompletionsAlternatives } from "./completions";
import type { Type } from "./type";

/**
 * A union of literals. When you want to take an exact enum value.
 */
export function oneOf<T extends string>(
  literals: readonly T[],
): Type<string, T> {
  const examples = literals.map((x) => inspect(x)).join(", ");
  return {
    async from(str) {
      const value = literals.find((x) => x === str);
      if (!value) {
        throw new Error(`Invalid value '${str}'. Expected one of: ${examples}`);
      }
      return value;
    },
    description: `One of ${examples}`,
    completions: () => ({
      _tag: "alternatives",
      values: literals.map((t) => t.toString()),
    }),
  };
}
