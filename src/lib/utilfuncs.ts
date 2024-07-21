import { ZodSchema } from "zod";
import { Result } from "./result";
import { BodyParseError } from "./errors/bodyParseError";

export const registerNumber = () => {
  const length = 18;
  const moment = Date.now().toString();
  const randomLength = length - moment.length;
  const randomSalt = Math.random()
    .toString()
    .slice(2, 2 + randomLength);
  return `${moment}${randomSalt}`;
};

export const replaceTokens = (
  templateString: string,
  tokenReplacements: Record<string, string>
) => {
  let replacedString = templateString;
  for (const token in tokenReplacements) {
    const replacement = tokenReplacements[token];
    replacedString = replacedString.replaceAll(`{{${token}}}`, replacement);
  }
  return replacedString;
};

export const drill = (obj: Record<string, any>, drillProps: string[]): any => {
  if (drillProps.length === 0) {
    return obj;
  }

  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const currentKey = drillProps[0];
  if (obj[currentKey] === undefined || obj[currentKey] === null) {
    return undefined;
  }

  return drill(obj[currentKey], drillProps.slice(1));
};

export const toAmount = (value: number) =>
  value.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

export const parseRequestBody = async <T>(
  request: Request,
  schema: ZodSchema<T>
): Promise<Result<T, BodyParseError>> => {
  try {
    const data = await request.json();

    const result = schema.safeParse(data);
    if (result.success) {
      return {
        ok: true,
        value: result.data,
      };
    }

    return {
      ok: false,
      error: new BodyParseError("body-parse/invalid-data"),
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: new BodyParseError("body-parse/cannot-parse"),
    };
  }
};
