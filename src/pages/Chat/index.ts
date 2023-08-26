import template from './Chat.hbs';
import { chats } from './dake-data.json';
import { Component } from '@shared';
import './Chat.css';

export class Chat extends Component {
  constructor() {
    super({
      chats,
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
