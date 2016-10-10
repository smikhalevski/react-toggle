import uniqueId from 'lodash/uniqueId';
import noop from 'lodash/noop';
import React from 'react';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';

const {bool, number, string} = React.PropTypes;

/**
 * @class Toggle
 * @extends React.Component
 * @classdesc
 * Checkbox displayed as iOS-style toggle button.
 *
 * @property {React.Props} props Tag attributes.
 * @property {Boolean} [props.checked = false] Checkbox checked status.
 * @property {Boolean} [props.disabled = false] Disable control value from being changed.
 * @property {Number} [props.tabIndex] Focus order.
 * @property {String} [props.name] Name of the control, which is submitted with the form data.
 * @property {Boolean} [props.icon = '\uf111'] FontAwesome character code to use as an icon
 *           when toggle is turned on. Default is filled circle.
 * @property {CSS~ClassList} [props.modifiers] List of style modifiers:
 *           <ul>
 *             <li>**`checkbox`** Bootstrap checkbox block.</li>
 *             <li>**`checked-success`** Success colors are used when toggle is turned on.</li>
 *             <li>**`checked-attention`** Icon is painted with `@brand-warning` color.</li>
 *           </ul>
 * @property {Function} [props.onChange]
 */
export class Toggle extends React.Component {

  static propTypes = {
    checked: bool,
    disabled: bool,
    tabIndex: number,
    name: string,
    icon: string
  };
  static defaultProps = {
    checked: false,
    disabled: false,
    icon: '\uf111'
  };

  state = {focused: false};
  id = uniqueId();

  onFocus = e => this.setState({focused: true});

  onBlur = e => this.setState({focused: false});

  componentDidMount() {
    findDOMNode(this).addEventListener('focus', e => findDOMNode(this.refs.checkbox).focus());
  }

  render() {
    let {checked, disabled, tabIndex, name, icon, modifiers, ...rest} = this.props;

    return (
      <div {...rest}
           tabIndex="-1"
           className={classNames('toggle', modifiers, {checked, disabled, focused: this.state.focused})}>
        <input ref="checkbox"
               type="checkbox"
               id={this.id}
               name={name}
               disabled={disabled}
               checked={checked}
               onChange={noop}
               onFocus={this.onFocus}
               onBlur={this.onBlur}
               tabIndex={tabIndex}/>
        <label htmlFor={this.id}
               data-icon={icon}>
          {this.props.children}
        </label>
      </div>
    );
  }
}
