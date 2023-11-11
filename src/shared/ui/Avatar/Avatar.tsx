import { Component, type Props } from '@shared/NotReact';
import { $, clsx } from '@shared/utils';
import * as styles from './Avatar.module.css';
import defaultAvatar from './default.svg';

interface AvatarProps extends Props, Partial<Omit<JSX.IntrinsicElements['img'], '$change'>> {
  $change?: (file: File) => Promise<void> | void;
  containerCls?: string;
}


export class Avatar extends Component<AvatarProps> {
  constructor(props: AvatarProps) {
    super({}, props);
  }


  onClickAvatar = () => {
    const fileInput = $('#avatarInput', this.ref as HTMLElement);
    fileInput.click();
  };

  onChangeAvatar = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.props.$change?.(file)
    }
  };

  public render({src, containerCls, className, $change, ...props} : AvatarProps) {
    const editable = !!$change;
    return (
      <figure className={containerCls}>
        <img
          className={clsx(styles.avatar, editable && styles.editable, className)}
          src={src ?? defaultAvatar}
          title={editable ? "Сменить изображение" : undefined}
          $click={editable ? this.onClickAvatar : undefined}
          {...props}
        />
        <input type="file" hidden id="avatarInput" $change={this.onChangeAvatar} accept=".jpg, .png, .jpeg, .gif" />
      </figure>
    );
  }
}
