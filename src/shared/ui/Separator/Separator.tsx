import { Component } from '@shared/NotReact';
import * as styles from './Separator.module.css';

export class Separator extends Component {
  public render() {
    return <hr className={styles.separator} />;
  }
}
