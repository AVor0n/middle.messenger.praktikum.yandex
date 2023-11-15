import { Component, type Props } from '@shared/NotReact';
import { clsx } from '@shared/utils';
import * as styles from './Toast.module.css';
import { Button } from '../../../../ui/Button';
import { type FullToastInfo } from '../../types';

interface ToastProps extends Props {
  toast: FullToastInfo;
  onClose: (toastId: number) => void;
}

export class Toast extends Component<ToastProps> {
  constructor(props: ToastProps) {
    super({}, props);
  }

  public render() {
    const { toast, onClose } = this.props;

    return (
      <div className={clsx(styles.toast, styles[toast.type])}>
        <div className={styles.header}>
          <strong className={styles.title}>{toast.title}</strong>
          <Button
            className={styles.closeBtn}
            size="s"
            text="x"
            circle
            buttonType="ghost"
            $click={() => onClose(toast.id)}
          />
        </div>
        <div className={styles.body}>{toast.body}</div>
      </div>
    );
  }
}
