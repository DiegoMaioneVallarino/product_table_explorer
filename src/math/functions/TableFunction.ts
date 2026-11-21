/**
 * Función aplicada a cada producto de la tabla.
 * Recibe la base activa para que pueda operar sobre dígitos coherentes con
 * lo que el usuario está viendo.
 */
export type TableFunction =
  (value: number, base: number) => number;
