import { Component } from '../NotReact';
import { router } from '../Router';
import { type JSXIntrinsicElements } from '@shared/NotReact/jsx';

type LinkProps = JSXIntrinsicElements['a'] & {
  href: string;
  disabled?: boolean;
};

export class Link extends Component<LinkProps> {
  constructor(props: LinkProps) {
    super({}, props);
  }

  private onClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!this.props.disabled) {
      router.navigate(this.props.href);
      this.props.$click?.call(window, e);
    }
  };

  public render({ href, className, children }: LinkProps) {
    return (
      <a href={href} $click={this.onClick} className={className}>
        {children}
      </a>
    );
  }
}
