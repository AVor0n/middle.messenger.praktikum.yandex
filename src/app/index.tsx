import { mount } from '@shared/NotReact';
import { $ } from '@shared/utils';
import { App } from './App';
import { addErrorLinks } from '@features';
import './styles/index.css';

addErrorLinks();
mount(<App />, $('#app'));
