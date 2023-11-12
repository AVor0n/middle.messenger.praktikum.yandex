export interface FullToastInfo {
  id: number;
  type: string;
  title?: string;
  body: string;
  timeoutId: ReturnType<typeof setTimeout>;
}

export type ToastInfo = Pick<FullToastInfo, 'title' | 'body'>;
