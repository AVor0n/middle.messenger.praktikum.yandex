import { Component } from '@shared';
import type { PropsWithChildren } from '@shared';
import './EditWindow.css';

type EditWindowProps = PropsWithChildren<{
  saveAvailable: boolean;
  onSave: (e: Event) => void;
  onClose: (e: Event) => void;
}>;
export class EditWindow extends Component<EditWindowProps> {
  constructor(props: EditWindowProps) {
    super({}, props);
  }

  public render({ onClose, onSave, saveAvailable }: EditWindowProps) {
    return (
      <form className="edit-window">
        <div className="edit-window__content">
          <div className="edit-window__fields">{this.props.children}</div>

          <div className="edit-window__btns">
            <button id="editWindowCancel" className="btn btn--ghost btn--wide btn--l" $click={onClose}>
              Отмена
            </button>

            <button
              id="editWindowSave"
              className="btn btn--primary btn--wide btn--l"
              $click={onSave}
              disabled={!saveAvailable}
            >
              Сохранить
            </button>
          </div>
        </div>
      </form>
    );
  }
}
