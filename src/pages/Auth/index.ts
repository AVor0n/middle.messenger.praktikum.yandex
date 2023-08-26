import template from './Auth.hbs';
import { Component } from '@shared';
import './Auth.css';

export class Auth extends Component {
  constructor() {
    super({});
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
