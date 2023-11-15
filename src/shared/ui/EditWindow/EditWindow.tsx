import { Component, type PropsWithChildren } from '@shared/NotReact';
import './EditWindow.css';
import { clsx } from '@shared/utils';
import { Button } from '../Button';

export type EditWindowProps = PropsWithChildren<{
  contentCls?: string;
  saveAvailable?: boolean;
  onSave: (e: Event) => Promise<void> | void;
  onClose: (e: Event) => void;
}>;

export class EditWindow extends Component<EditWindowProps> {
  constructor(props: EditWindowProps) {
    super({}, props);
  }

  public render({ onClose, onSave, saveAvailable = true, contentCls }: EditWindowProps) {
    return (
      <div className="edit-window">
        <div className={clsx('edit-window__content', contentCls)}>
          <div className="edit-window__fields">{this.props.children}</div>

          <div className="edit-window__btns">
            <Button id="editWindowCancel" text="Отмена" buttonType="ghost" flex size="l" $click={onClose} />
            <Button
              id="editWindowSave"
              text="Сохранить"
              buttonType="primary"
              flex
              size="l"
              $click={onSave}
              disabled={!saveAvailable}
            />
          </div>
        </div>
      </div>
    );
  }
}
