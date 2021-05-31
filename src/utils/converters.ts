export const kelvinToCelsius = (kelvin: number): number => {
  const cero_kelvin = 273.15;
  return (kelvin - cero_kelvin);
};

export const kelvinToFahren = (kelvin: number): number => {
  return (kelvin * 9) / 5 - 459.67;
};

export const sentenceCapitalize = (sentence: string): string => {
  const words = sentence.split(" ");

  const capitalizedWords = words.map((w) => firstUpper(w));

  return capitalizedWords.join(" ");
};

export const firstUpper = (string: string): string => {
  const firstWord = string.charAt(0).toUpperCase();

  return firstWord + string.slice(1);
};
