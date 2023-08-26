import template from './EditWindow.hbs';
import { Component } from '@shared';
import './EditWindow.css';

interface EditWindowProps {
  username: string;
  avatar: string;
  message: string;
  time: string;
  unread_count?: number;
}

export class EditWindow extends Component {
  constructor(props: EditWindowProps) {
    super({
      ...props,
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
