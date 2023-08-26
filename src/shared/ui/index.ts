import { Textbox } from './Textbox';
import { registerComponent } from '@shared';

export const registerUIKit = () => {
  registerComponent('Textbox', Textbox);
};
