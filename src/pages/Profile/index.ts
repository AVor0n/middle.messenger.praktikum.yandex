import './Profile.css';
import data from './fake-data.json';
import { addPageHandlers } from './Profile';
import template from './Profile.hbs';

export const Profile = () => {
  setTimeout(addPageHandlers);
  return template(data);
};
