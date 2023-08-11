import './Profile.css';
import data from './fake-data.json';
import template from './Profile.hbs';

export const Profile = () => template(data);
