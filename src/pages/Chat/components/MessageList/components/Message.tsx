import { Component, type Props } from '@shared/NotReact';
import { clsx } from '@shared/utils';
import * as styles from './Message.module.css';

interface MessageProps extends Props {
  time: string;
  content: string;
  authorName: string;
  income: boolean;
}

export class Message extends Component<MessageProps> {
  constructor(props: MessageProps) {
    super({}, props);
  }

  public render() {
    const { authorName, content, time, income } = this.props;

    return (
      <div className={clsx(styles.container, income ? styles.income : styles.outcome)}>
        <div className={styles.header}>
          <span className={styles.author}>{authorName}</span>
          <span className={styles.time}>{time}</span>
        </div>
        <div className={styles.content}>{content}</div>
      </div>
    );
  }
}
