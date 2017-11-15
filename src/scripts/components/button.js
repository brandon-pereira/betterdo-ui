import React, {Component} from 'react';
// import '../../styles/components/greeting.scss';

class Button extends Component {
  render() {
    return <button onClick={this.props.click}>
			{this.props.children}
		</button>;
  }
}
 
export default Button;