import { App } from './App';
import { addErrorLinks } from '@features';
import { $, mount } from '@shared';
import './styles/index.css';

addErrorLinks();
await mount(<App />, $('#app'));
