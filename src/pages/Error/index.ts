import './Error.css';
import template from './Error.hbs';

interface ErrorPageProps {
  code: number;
  text: string;
}

export const ErrorPage = (props: ErrorPageProps) => template(props);
