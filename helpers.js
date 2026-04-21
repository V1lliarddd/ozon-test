export function validateNumberInput(value) {
  if (value > 100) value = 100;
  if (value < 0) value = 0;
  return value;
}
