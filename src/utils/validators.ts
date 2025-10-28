// ========================================
// src/utils/validators.ts - Validadores
// ========================================

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Valida formato de email
 */
export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    errors.push('El email es requerido');
  } else if (!emailRegex.test(email)) {
    errors.push('El formato del email no es válido');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida contraseña
 */
export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];

  if (!password) {
    errors.push('La contraseña es requerida');
  } else {
    if (password.length < 6) {
      errors.push('La contraseña debe tener al menos 6 caracteres');
    }
    if (password.length > 50) {
      errors.push('La contraseña no puede tener más de 50 caracteres');
    }
    if (!/[A-Za-z]/.test(password)) {
      errors.push('La contraseña debe contener al menos una letra');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('La contraseña debe contener al menos un número');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida que las contraseñas coincidan
 */
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  const errors: string[] = [];

  if (password !== confirmPassword) {
    errors.push('Las contraseñas no coinciden');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida nombre
 */
export const validateName = (name: string): ValidationResult => {
  const errors: string[] = [];

  if (!name) {
    errors.push('El nombre es requerido');
  } else {
    if (name.trim().length < 3) {
      errors.push('El nombre debe tener al menos 3 caracteres');
    }
    if (name.trim().length > 100) {
      errors.push('El nombre no puede tener más de 100 caracteres');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida teléfono paraguayo
 */
export const validatePhone = (phone: string): ValidationResult => {
  const errors: string[] = [];
  const phoneRegex = /^[0-9]{9,10}$/;

  if (phone && !phoneRegex.test(phone.replace(/\s/g, ''))) {
    errors.push('El formato del teléfono no es válido (ej: 0981234567)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida CI (Cédula de Identidad) paraguaya
 */
export const validateCI = (ci: string): ValidationResult => {
  const errors: string[] = [];
  const ciRegex = /^[0-9]{6,8}$/;

  if (ci && !ciRegex.test(ci.replace(/\./g, ''))) {
    errors.push('El formato de CI no es válido (6-8 dígitos)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida RUC paraguayo
 */
export const validateRUC = (ruc: string): ValidationResult => {
  const errors: string[] = [];
  const rucRegex = /^[0-9]{6,8}-[0-9]{1}$/;

  if (ruc && !rucRegex.test(ruc)) {
    errors.push('El formato de RUC no es válido (ej: 12345678-9)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida formulario de login completo
 */
export const validateLoginForm = (
  email: string,
  password: string
): ValidationResult => {
  const errors: string[] = [];

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.push(...emailValidation.errors);
  }

  if (!password) {
    errors.push('La contraseña es requerida');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida formulario de registro completo
 */
export const validateRegisterForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): ValidationResult => {
  const errors: string[] = [];

  const nameValidation = validateName(name);
  if (!nameValidation.isValid) {
    errors.push(...nameValidation.errors);
  }

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.push(...emailValidation.errors);
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.push(...passwordValidation.errors);
  }

  const matchValidation = validatePasswordMatch(password, confirmPassword);
  if (!matchValidation.isValid) {
    errors.push(...matchValidation.errors);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

