import data from './fake-data.json';
import template from './Profile.hbs';
import { Component } from '@shared';
import './Profile.css';

export class Profile extends Component {
  constructor() {
    super({
      ...data,
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
