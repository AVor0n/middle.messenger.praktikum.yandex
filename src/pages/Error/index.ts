import './Error.css';
import template from './Error.hbs';
import data from './fake-data.json';

export const ErrorPage = (code: number) => template(data.errors.find(error => error.code === code));
