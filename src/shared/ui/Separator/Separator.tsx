import { Component, type Props } from '@shared/NotReact';
import * as styles from './Separator.module.css';

export class Separator extends Component {
  constructor(props: Props) {
    super({}, props);
  }

  public render() {
    return <hr className={styles.separator} />;
  }
}
