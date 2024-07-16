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
