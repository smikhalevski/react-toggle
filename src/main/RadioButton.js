import React from 'react';
import classNames from 'classnames';

const {any, bool, number, string} = React.PropTypes;

function noop() {}

export class RadioButton extends React.Component {

  static propTypes = {
    className: any,
    checked: bool,
    disabled: bool,
    tabIndex: number,
    name: string,
    id: string
  };
  static defaultProps = {
    checked: false,
    disabled: false
  };

  state = {focused: false};

  onFocus = event => this.setState({focused: true});

  onBlur = event => this.setState({focused: false});

  componentDidMount() {
    const {button, input, label} = this.refs;
    input.id = label.htmlFor = this.props.id || Math.random();
    button.addEventListener('focus', event => input.focus());
  }

  render() {
    const {id, checked, disabled, tabIndex, name, className, ...rest} = this.props;

    return (
      <div {...rest}
           ref="button"
           tabIndex="-1"
           className={classNames('radio-button', className, {checked, disabled, focused: this.state.focused})}>
        <input ref="input"
               type="radio"
               name={name}
               disabled={disabled}
               checked={checked}
               onChange={noop}
               onFocus={this.onFocus}
               onBlur={this.onBlur}
               tabIndex={tabIndex}/>
        <label ref="label">
          {this.props.children}
        </label>
      </div>
    );
  }
}
