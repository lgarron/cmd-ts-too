export type CompletionsAlternatives = {
  _tag: "alternatives";
  alternatives: string[];
};

export type CompletionsCommmand = {
  _tag: "command";
  name: string;
};

export type CompletionsSubcommands = {
  _tag: "subcommands";
  subcommands: Record<string, CompletionsInfo>;
};

export type CompletionsAnyString = {
  _tag: "any-string";
};

export type CompletionsPath = {
  // TODO: is it possible to distinguish between when files and folders are valid args?
  _tag: "path";
};

export type CompletionsInfo =
  | CompletionsAlternatives
  | CompletionsCommmand
  | CompletionsSubcommands
  | CompletionsAnyString
  | CompletionsPath
  | Optional<any>;

export type Optional<T extends CompletionsInfo> = {
  _tag: "optional";
  completions: T;
};

export function completionsAnyString(): CompletionsAnyString {
  return { _tag: "any-string" };
}

export function completionsFilePath(): CompletionsAnyString {
  return { _tag: "any-string" };
}
