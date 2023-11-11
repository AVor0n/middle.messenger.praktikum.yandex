import { Component, type Props, type State } from '@shared/NotReact';

interface MessageListState extends State {}

interface MessageListProps extends Props {}

export class MessageList extends Component<MessageListProps, MessageListState> {
  constructor(props: MessageListProps) {
    super({}, props);
  }

  public render() {
    return <div>message list</div>;
  }
}
