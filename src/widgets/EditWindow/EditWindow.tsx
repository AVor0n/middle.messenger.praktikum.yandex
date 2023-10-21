import { Component, type Props } from '@shared';
import { TextBox, type TextBoxProps } from '@uikit';
import './EditWindow.css';

interface EditWindowProps extends Props {
  fields: TextBoxProps[];
}
export class EditWindow extends Component<EditWindowProps> {
  constructor(props: EditWindowProps) {
    super({}, props);
  }

  public render({ fields }: EditWindowProps) {
    return (
      <form className="edit-window">
        <div className="edit-window__content">
          <div className="edit-window__fields">
            {fields.map(fieldProps => (
              <TextBox {...fieldProps} />
            ))}
          </div>

          <div className="edit-window__btns">
            <button id="editWindowCancel" className="btn btn--ghost btn--wide btn--l">
              Отмена
            </button>
            <button id="editWindowSave" className="btn btn--primary btn--wide btn--l">
              Сохранить
            </button>
          </div>
        </div>
      </form>
    );
  }
}
