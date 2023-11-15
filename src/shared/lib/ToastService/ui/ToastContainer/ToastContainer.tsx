import { Component, type State, type Props } from '@shared/NotReact';
import * as styles from './ToastContainer.module.css';
import { toastService } from '../../ToastService';
import { type FullToastInfo } from '../../types';
import { Toast } from '../Toast';

interface ToastContainerState extends State {
  toasts: FullToastInfo[];
}

export class ToastContainer extends Component<Props, ToastContainerState> {
  constructor(props: Props) {
    super({ toasts: toastService.toasts }, props);
  }

  protected init(): void {
    toastService.on('updateToasts', toasts => {
      this.state.toasts = toasts;
    });
  }

  public render() {
    return (
      <div className={styles.container}>
        {this.state.toasts.map(toast => (
          <Toast toast={toast} onClose={() => toastService.removeToast(toast.id)} key={toast.id} />
        ))}
      </div>
    );
  }
}
