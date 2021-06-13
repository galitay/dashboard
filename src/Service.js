import React from 'react';

class Service extends React.Component {
    
    render(){
        return (
            <div className={"service-container " + this.props.service.isOnline}>
                <div className="service-details">
                    <div className={"service-health status-column " + this.props.service.isOnline}>
                        <span className="status-dot">&#11044;</span>
                        {this.props.service.isOnline}
                    </div>
                    <div className="service-name">{this.props.service.name}</div>
                    <div className="service-version version-column">{this.props.service.version}</div>
                    <div className="service-db-version db-version-column">{this.props.service.dbVersion}</div>
                    <div className="service-db-health db-health-column">
                        <div className={"db-health " +  this.props.service.dbHealth}>
                        
                        </div>
                    </div>
                    <div className="service-intenal-api">
                        <a href={this.props.service.internalApiUrl}>
                            <img src="img\lock.png" alt="Interal API URL" />
                        </a>
                    </div>
                    <div className="service-external-api">
                        <a href={this.props.service.externalApiUrl}>
                            <img src="img\link_s.png" alt="External API URL" />
                        </a>
                    </div>
                    <div className="service-admin-url">
                        <a href={this.props.service.admin}>
                            <img src="img/admin.png" alt="Admin Page URL"/>
                        </a>
                    </div>

                </div>
          </div>
        )
    }
}

export default Service 