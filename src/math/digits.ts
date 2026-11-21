/**
 * Operaciones sobre los dígitos de un entero en una base dada (2–36).
 * Todo es aritmético: no pasa por strings, y es la única fuente de verdad
 * para "los dígitos de un número" en el proyecto.
 */

function toNatural(value: number): number {
  return Math.abs(Math.trunc(value));
}

/** Dígitos de `value` en `base`, del más significativo al menos significativo. */
export function digitsOf(value: number, base: number): number[] {

  let n = toNatural(value);

  if (n === 0) {
    return [0];
  }

  const digits: number[] = [];

  while (n > 0) {
    const digit = n % base;
    digits.push(digit);
    n = (n - digit) / base; // división exacta (evita errores de redondeo)
  }

  return digits.reverse();

}

/** Suma de los dígitos de `value` en `base`. */
export function digitSum(value: number, base: number): number {

  let n = toNatural(value);
  let sum = 0;

  while (n > 0) {
    const digit = n % base;
    sum += digit;
    n = (n - digit) / base;
  }

  return sum;

}

/** Suma de dígitos aplicada `passes` veces (por defecto 2). */
export function repeatedDigitSum(
  value: number,
  base: number,
  passes = 2
): number {

  let result = value;

  for (let i = 0; i < passes; i++) {
    result = digitSum(result, base);
  }

  return result;

}

/** Raíz digital: suma de dígitos repetida hasta quedar un solo dígito. */
export function digitalRoot(value: number, base: number): number {

  const n = toNatural(value);

  return n === 0 ? 0 : 1 + ((n - 1) % (base - 1));

}
