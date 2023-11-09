import { Component, type Props } from '@shared/NotReact';
import { clsx } from '@shared/utils';
import * as styles from './Button.module.css';

export interface ButtonProps extends Props, Partial<Omit<HTMLButtonElement, 'children'>> {
  text: string;
  size: 's' | 'm' | 'l' | 'xl';
  flex?: boolean;
  buttonType?: 'primary' | 'ghost';
  circle?: boolean;
  showLoader?: boolean;
}

export class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super({}, props);
  }

  public render({
    text,
    showLoader = false,
    size,
    buttonType = 'primary',
    circle,
    flex,
    disabled,
    className,
    ...props
  }: ButtonProps) {
    const classNames = clsx(
      className,
      styles.button,
      styles[size],
      styles[buttonType],
      flex && styles.wide,
      circle && styles.circle,
      (disabled ?? showLoader) && styles.disabled,
      showLoader && styles.loading,
    );

    return (
      <button type="button" className={classNames} disabled={showLoader || disabled} {...props}>
        {showLoader ? '' : text}
      </button>
    );
  }
}
