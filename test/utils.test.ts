import { describe, expect, it } from "bun:test";
import chalkTemplate from "chalk-template";
import stripAnsi from "strip-ansi";
import { type AllOrNothing, padNoAnsi } from "../src/utils";

describe("padNoAnsi", () => {
  it("pads start", () => {
    const expected = "hello".padStart(10, " ");
    const actual = padNoAnsi(
      chalkTemplate`{red h}{cyan e}{blue l}{green l}{red o}`,
      10,
      "start",
    );
    expect(stripAnsi(actual)).toEqual(expected);
  });
  it("pads end", () => {
    const expected = "hello".padEnd(10, " ");
    const actual = padNoAnsi(
      chalkTemplate`{red h}{cyan e}{blue l}{green l}{red o}`,
      10,
      "end",
    );
    expect(stripAnsi(actual)).toEqual(expected);
  });
  it("returns the string if it is shorter than the padding", () => {
    const str = chalkTemplate`{red h}{cyan e}{blue l}{green l}{red o}`;
    const actual = padNoAnsi(str, 2, "end");
    expect(actual).toEqual(str);
  });
});

it("passes type tests", () => {
  function identity<T>(t: T): T {
    return t;
  }

  expect(identity<TypeTests.test>("true")).toEqual("true");
});

namespace TypeTests {
  type Extends<A, B> = B extends A ? "true" : "false";
  type AssertTrue<A extends "true"> = Extends<"true", A>;
  type AssertFalse<A extends "false"> = Extends<"false", A>;
  type AllTrue<A extends "true"[]> = Extends<"true"[], A>;

  namespace AllOrNothingTests {
    type Person = { name: string; age: number };

    type accepts_all_elements = AssertTrue<
      Extends<AllOrNothing<Person>, { name: "Joe"; age: 100 }>
    >;

    type does_not_accept_partial = AssertFalse<
      Extends<AllOrNothing<Person>, { name: "joe" }>
    >;

    // biome-ignore lint/complexity/noBannedTypes: nopez
    type accepts_nothing = AssertTrue<Extends<AllOrNothing<Person>, {}>>;

    // biome-ignore lint/suspicious/noExportsInTest: nopez
    export type test = AssertTrue<
      AllTrue<[accepts_all_elements, does_not_accept_partial, accepts_nothing]>
    >;
  }

  // biome-ignore lint/suspicious/noExportsInTest: nopez
  export type test = AllTrue<[AllOrNothingTests.test]>;
}
