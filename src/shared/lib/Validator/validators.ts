import { validate } from './utils';
import type { Validator } from './type';

export const required: Validator = value => ({
  isValid: !!value,
  error: 'Это поле обязательно для заполнения',
});

export const minLength: (min: number) => Validator = min => (value: string) => ({
  isValid: value.length > min,
  error: `Минимальная длина - ${min}`,
});

export const maxLength: (max: number) => Validator = max => (value: string) => ({
  isValid: value.length < max,
  error: `Максимальная длина - ${max}`,
});

export const onlyLetters: Validator = (value: string) => ({
  isValid: !/[^-a-zа-яё]/iu.test(value),
  error: `Разрешены только латинские и кириллические буквы`,
});

export const firstUpperLetter: Validator = (value: string) => ({
  isValid: value.startsWith(value[0].toLocaleUpperCase()),
  error: 'Первая буква должна быть заглавной',
});

export const atLeastOneLetter: Validator = (value: string) => ({
  isValid: /[a-zа-яё]/iu.test(value),
  error: 'Требуется хотя бы одна буква',
});

export const atLeastOneUpperLetter: Validator = (value: string) => ({
  isValid: /[A-ZЁА-Я]/u.test(value),
  error: 'Требуется хотя бы одна заглавная буква',
});

export const atLeastOneDigit: Validator = value => ({
  isValid: /\d/u.test(value),
  error: 'Требуется хотя бы одна цифра',
});

export const email: Validator = (value: string) => ({
  isValid: /^[\w-]+@[\w-]+\.[\w-]+$/iu.test(value),
  error: 'Введите email в формате iivanov@mail.ru',
});

export const login: Validator = (value: string) => {
  if (/[^\w-]/iu.test(value)) {
    return {
      isValid: false,
      error: 'Использованы недопустимые символы',
    };
  }
  return validate(value, minLength(3), atLeastOneLetter, maxLength(20));
};

export const password: Validator = (value: string) =>
  validate(value, atLeastOneDigit, atLeastOneUpperLetter, minLength(8), maxLength(40));

export const repeatPassword: (pass: string) => Validator = pass => (value: string) => ({
  isValid: value === pass,
  error: 'Пароли не совпадают',
});

export const phone: Validator = (value: string) => ({
  isValid: /^\+?\d{10,15}$/u.test(value),
  error: 'Некорректный номер',
});
