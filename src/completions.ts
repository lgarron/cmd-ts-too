export type CompletionsAlternatives = {
  _tag: "alternatives";
  values: string[];
};
export type SubcommandsEnum = {
  _tag: "subcommands";
  subcommands: Record<string, CompletionsInfo>;
};

export type CompletionsInfo = CompletionsAlternatives | SubcommandsEnum;
