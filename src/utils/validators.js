// Validaciones de formularios (RNF02–RNF04).
// Cada función devuelve un mensaje de error o una cadena vacía si el valor es válido.

export const required = (value, campo) => (String(value ?? '').trim() ? '' : `Ingresa ${campo}.`);

export const minLength = (value, min, campo) =>
  String(value ?? '').trim().length >= min ? '' : `${campo} debe tener al menos ${min} caracteres.`;

export const dni = (value) => (/^\d{8}$/.test(String(value ?? '').trim()) ? '' : 'El DNI debe tener 8 dígitos.');

export const telefono = (value) =>
  /^9\d{8}$/.test(String(value ?? '').replace(/\s/g, '')) ? '' : 'El teléfono debe tener 9 dígitos y empezar con 9.';

export const correo = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value ?? '').trim()) ? '' : 'Ingresa un correo electrónico válido.';

export const montoNoNegativo = (value) =>
  value !== '' && Number.isFinite(Number(value)) && Number(value) >= 0 ? '' : 'El monto debe ser un número mayor o igual a 0.';

// Ejecuta las reglas de cada campo y devuelve solo los campos con error.
export function validate(values, rules) {
  const errors = {};
  for (const [field, fieldRules] of Object.entries(rules)) {
    for (const rule of fieldRules) {
      const msg = rule(values[field]);
      if (msg) {
        errors[field] = msg;
        break;
      }
    }
  }
  return errors;
}
