import memoize from 'lodash/memoize';
import isString from 'lodash/isString';
import values from 'lodash/values';
import isNumber from 'lodash/isNumber';
import round from 'lodash/round';
import max from 'lodash/max';
import { formatNumber, shouldRoundNumber } from './numbers';

const isBrowser = typeof window !== 'undefined';

export const inputHasText = (input: unknown): boolean => {
  if (typeof input !== 'string') {
    return false;
  }
  const trimmedInput = input.trim();
  return trimmedInput.length > 0;
};

export const getFirstTwoCapitalizedLetters = (input: string) => {
  const capitalizedLetters = input
    .replace('@', '')
    .replace(/[^A-Za-z]/g, '') // Remove non-alphabetic characters
    .match(/[A-Z]/g); // Find all uppercase letters

  if (capitalizedLetters && capitalizedLetters.length < 2) {
    return input
      .replace('@', '')
      .replace(/[^A-Za-z]/g, '')
      .slice(0, 2)
      .toUpperCase();
  }
  if (capitalizedLetters && capitalizedLetters.length >= 2) {
    return capitalizedLetters.slice(0, 2).filter(Boolean).join('');
  } else {
    return '';
  }
};

export const removeAllSpaces = (str?: string) => {
  return str ? str.replace(/\s/g, '') : '';
};

export const makeHumanReadble = (
  input: string | number | undefined | null,
  key?: string
): string => {
  if (!input && !isNumber(input)) {
    return '';
  }

  if (shouldRoundNumber(input, key)) {
    return formatNumber(input, {
      compact: false,
      minDecimals: 0,
      maximumDecimals: 2,
      useGrouping: true
    });
  }

  let convertedString: string;
  input = String(input);

  // Check if input is in snake case
  if (input.includes('_')) {
    convertedString = input.replace(/_/g, ' ').toLowerCase();
  }
  // Check if input is in camel case
  else if (input.charAt(0) === input.charAt(0).toLowerCase()) {
    convertedString = input.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
  }
  // Check if input is in pascal case
  else {
    convertedString = input.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
  }

  // Capitalize the first letter of each word
  const words = convertedString.split(' ');
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
};

let ctx: CanvasRenderingContext2D;
const getCanvasContext = () => {
  if (!ctx) {
    //@ts-ignore
    ctx = document.createElement('canvas').getContext('2d');
  }

  return ctx;
};

export const measureTextWidth = memoize(
  (text: string, font: any = {}) => {
    if (isBrowser) {
      const { fontSize, fontFamily = 'sans-serif', fontWeight, fontStyle, fontVariant } = font;
      const ctx = getCanvasContext();
      // @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/font
      ctx.font = [fontStyle, fontWeight, fontVariant, `${fontSize || 13.6}px`, fontFamily].join(
        ' '
      );
      const metrics = ctx.measureText(isString(text) ? text : '');

      return {
        width: metrics.width,
        height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
      };
    }
    return {
      width: 0,
      height: 0
    };
  },
  (text: string, font = {}) => [text, ...values(font)].join('')
);
