import { REMOVE_TOAST_DELAY } from './constants';
import { type FullToastInfo, type ToastInfo } from './types';
import { EventBus, onChangeEvent } from '../EventBus';

class ToastService extends EventBus<{
  updateToasts: (toasts: FullToastInfo[]) => void;
}> {
  @onChangeEvent('updateToasts')
  private accessor _toasts: FullToastInfo[] | undefined;

  public get toasts(): FullToastInfo[] {
    return this._toasts ?? [];
  }

  private createToast(type: FullToastInfo['type'], data: ToastInfo): void {
    const toast: FullToastInfo = {
      type,
      id: Date.now(),
      title: data.title,
      body: data.body,
      timeoutId: setTimeout(() => this.removeToast(toast.id), REMOVE_TOAST_DELAY),
    };

    this._toasts = [toast, ...this.toasts];
  }

  public removeToast(toastId: number): void {
    const toastForDelete = this.toasts.find(toast => toast.id === toastId);
    if (!toastForDelete) return;

    clearTimeout(toastForDelete.timeoutId);
    this._toasts = this.toasts.filter(toast => toast.id !== toastId);
  }

  public error(toast: ToastInfo): void {
    this.createToast('error', toast);
  }

  public ok(toast: ToastInfo): void {
    this.createToast('ok', toast);
  }

  public warning(toast: ToastInfo): void {
    this.createToast('warning', toast);
  }
}

export const toastService = new ToastService();
