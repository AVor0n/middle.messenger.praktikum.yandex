import template from './Login.hbs';
import { Component } from '@shared';
import './Login.css';

export class Login extends Component {
  constructor() {
    super({});
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
