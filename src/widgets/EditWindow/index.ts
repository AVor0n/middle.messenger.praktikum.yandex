import Handlebars from 'handlebars';
import editWindow from './EditWindow.hbs';
import './EditWindow.css';

Handlebars.registerPartial('editWindow', editWindow);
export const EditWindow = editWindow;
