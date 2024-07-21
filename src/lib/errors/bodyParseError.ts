export type BodyParseErrorCode =
  | "body-parse/cannot-parse"
  | "body-parse/invalid-data";

export class BodyParseError extends Error {
  code: BodyParseErrorCode;

  constructor(code: BodyParseErrorCode) {
    super(code);
    this.code = code;
  }
}
