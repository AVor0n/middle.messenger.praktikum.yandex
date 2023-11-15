import { Component } from '@shared/NotReact';
import { router } from '@shared/Router';

type LinkProps = JSX.IntrinsicElements['a'] & {
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
