import template from './Textbox.hbs';
import { Component } from '@shared';
import './Textbox.css';

interface TextboxProps {
  type: HTMLInputElement['type'];
  label: string;
  error?: string;
}

export class Textbox extends Component {
  constructor(props: TextboxProps) {
    super({
      ...props,
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
