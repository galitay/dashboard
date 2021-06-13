import React from 'react';
import Service from './Service';

class Env extends React.Component {
    
    render(){
        return (
            <div className={"env-container " + (this.props.env.isSelected === "true" ? "selected" : "")}>
                {this.props.env.services.map((service) => {
                    return <Service service={service} key={"service-" + service.name} baseUrl={this.props.baseUrl} />
                  })}
          </div>
        )
    }
}

export default Env 