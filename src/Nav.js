import React from 'react';

class Nav extends React.Component {
    
    render(){
        return (
            <div className={"env-menu-item " + (this.props.env.isSelected === "true" ? "selected" : "")} onClick={() => this.props.navigate(this.props.env.envName)}>
                {this.props.env.envName}
          </div>
        )
    }
}

export default Nav