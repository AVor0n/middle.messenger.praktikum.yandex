import { Component, type Props, type State } from '@shared/NotReact';
import { clsx } from '@shared/utils';
import * as styles from './Search.module.css';

interface SearchState extends State {
  value: string;
}

interface SearchProps extends Props, Partial<Omit<JSX.IntrinsicElements['input'], 'type' | '$input'>> {
  onChange: (value: string) => void;
}

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super({ value: '' }, props);
  }

  public render(props: SearchProps) {
    return (
      <search>
        <input
          {...props}
          className={clsx(styles.search, props.className)}
          type="search"
          placeholder={props.placeholder ?? 'Поиск'}
          $input={e => this.props.onChange((e.target as HTMLInputElement).value)}
        />
      </search>
    );
  }
}
