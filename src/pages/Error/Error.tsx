import { Component, type Props } from '@shared/NotReact';
import { Link } from '@shared/NotReactRouter';
import { errorCodeToText } from './constants';
import { PAGES } from 'app/constants';
import './Error.css';

interface ErrorPageProps extends Props {
  code: keyof typeof errorCodeToText;
}

export class ErrorPage extends Component<ErrorPageProps> {
  constructor(props: ErrorPageProps) {
    super({}, props);
  }

  public render({ code }: ErrorPageProps) {
    return (
      <div className="page error-page">
        <div className="error__code">{code}</div>
        <div className="error__text">{errorCodeToText[code]}</div>
        <Link className="btn btn--ghost btn--flex btn--xl" href={PAGES.CHAT}>
          Назад к чатам
        </Link>
      </div>
    );
  }
}
