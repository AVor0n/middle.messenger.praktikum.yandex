import './Error.css';
import { errorCodeToText } from './constants';

interface ErrorPageProps {
  code: keyof typeof errorCodeToText;
}

export const ErrorPage: VComponent<ErrorPageProps> = ({ code }) => (
  <div className="page error-page">
    <div className="error__code">{code}</div>
    <div className="error__text">{errorCodeToText[code]}</div>
    <a className="btn btn--ghost btn--flex btn--xl" href="#/chat">
      Назад к чатам
    </a>
  </div>
);
