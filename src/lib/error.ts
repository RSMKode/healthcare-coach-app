
export const AUTHENTICATION_ERROR_MESSAGE =
  "Tienes que iniciar sesión para ver esta página";

export const AuthenticationError = class AuthenticationError extends Error {
  constructor(message?: string) {
    super(message ?? AUTHENTICATION_ERROR_MESSAGE);
    this.name = "AuthenticationError";
  }
};

export const AUTHORIZATION_ERROR_MESSAGE = "No tienes permisos";
export const AuthorizationError = class AuthorizationError extends Error {
  constructor(message?: string) {
    super(message ?? AUTHORIZATION_ERROR_MESSAGE);
    this.name = "AuthorizationError";
  }
};

export const NOT_FOUND_ERROR_MESSAGE = "No se ha encontrado el recurso";
export const NotFoundError = class NotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? NOT_FOUND_ERROR_MESSAGE);
    this.name = "NotFoundError";
  }
};


