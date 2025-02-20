class CustomError extends Error {
  code: number | null;

  constructor(message: string, code: number | null = null) {
    super(message);
    this.code = code;
  }
}

export function throwError(message: string, code: number | null = null): never {
  throw new CustomError(message, code);
}
