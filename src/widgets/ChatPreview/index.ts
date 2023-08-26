import template from './ChatPreview.hbs';
import { Component } from '@shared';
import './ChatPreview.css';

interface ChatPreviewProps {
  username: string;
  avatar: string;
  message: string;
  time: string;
  unread_count?: number;
}

export class ChatPreview extends Component {
  constructor(props: ChatPreviewProps) {
    super({
      ...props,
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
