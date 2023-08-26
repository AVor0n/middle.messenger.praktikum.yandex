import { ChatPreview } from './ChatPreview';
import { EditWindow } from './EditWindow';
import { registerComponent } from '@shared';

export const registerAppComponents = () => {
  registerComponent('ChatPreview', ChatPreview);
  registerComponent('EditWindow', EditWindow);
};
