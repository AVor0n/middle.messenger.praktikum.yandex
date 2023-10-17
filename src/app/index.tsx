import { initRouter } from './routes';
import { addErrorLinks } from '@features';
import { registerUIKit } from '@uikit';
import { registerAppComponents } from '@widgets';
import './styles/index.css';

registerUIKit();
registerAppComponents();
initRouter();
addErrorLinks();
