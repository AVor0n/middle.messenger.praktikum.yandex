/** Возвращает причину ошибки для HttpErrorBody или конвертит ошибку в строку */
export const stringifyApiError = (error: unknown) => {
  if (error && typeof error === 'object') {
    return 'reason' in error ? (error.reason as string) : JSON.stringify(error);
  }
  return String(error);
};
