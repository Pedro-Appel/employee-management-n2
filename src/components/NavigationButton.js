
import { Component } from 'react';
import { Link } from 'react-router-dom';

class NavigationButton extends Component{
  render(){
    return (
      <Link  to={this.props.routeToNavigate} className="nav-link"><button>{this.props.name}</button></Link>
    )
  }
}
export default NavigationButton