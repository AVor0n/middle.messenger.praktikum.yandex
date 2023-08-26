import './Error.css';
import template from './Error.hbs';
import { errors } from './fake-data.json';
import { Component } from '@shared';

export class ErrorPage extends Component {
  constructor(code: number) {
    super({
      ...errors.find(error => error.code === code),
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
