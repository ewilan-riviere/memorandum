// Capitalize first character
export const capitalize = (string = '') =>
  [...string].map((char, index) => (index ? char : char.toUpperCase())).join('')
