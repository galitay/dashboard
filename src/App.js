import './App.css';
import Env from './Env';
import Nav from './Nav';
import React from 'react';

class App extends React.Component {

  configs = window.configs;

  state = {
      baseUrl: "https://www.itayg.com/toluna/dashboard",
      envs: []
  };

  componentDidMount() {
    this.setState(this.configs);
    this.getEnvs();
  }

  navigate = (envName) => {
        const {envs} = this.state;
        console.log("navigate");
        if (envs === null || envs.length === 0){
            return;
        }
        envs.forEach((env) => {
            if (env.envName === envName){
                env.isSelected = "true";
            }
            else{
                env.isSelected = "false";
            }
        });
        this.setState(envs);
  }

  getEnvs = () => {
    this.configs.envs.map((env) => (
      env.services.forEach((service) => {
        if (service.apiUrl !== null && service.apiUrl.length !== 0){
          this.getServiceStatus(env.envName, service.name, service.apiUrl);
        }
        else{
          service.isOnline = "missing";
          service.dbHealth = "db-missing";
          this.setState(this.configs);
        }
      })
    ))
  }

  getServiceStatus = (envName, serviceName, apiUrl) => {
      fetch(apiUrl, {
          method: 'GET',
          mode: 'cors',
          contentType: 'application/json'
      }).then((res) => res.json())
      .then(
          (data) => {
              this.processData(data, envName, serviceName);
          },
      ).catch((error) => {
        let serviceObj = this.findServiceObj(this.configs.envs, envName, serviceName);
        serviceObj.isOnline = "offline";
        serviceObj.dbHealth = "db-unknown"
        this.setState(this.configs);
        console.log("Could not get " + serviceName + " service status from " + apiUrl + ". Error: " + error);
    });
  };

  processData = (data, envName, serviceName) => {
      let serviceObj = this.findServiceObj(this.configs.envs, envName, serviceName);

      serviceObj.version = data.version;
      if (data.version === undefined){
        serviceObj.version = data.VERSION;
      }
     
      serviceObj.isOnline = "online";
      serviceObj.dbVersion = data.dbVersion;
      
      if (data.dbHealth){
        serviceObj.dbHealth = "db-up";
      }
      else if(data.dbHealth === "" || data.dbHealth === undefined || data.dbHealth === null){
        serviceObj.dbHealth = "db-missing";
      }
      else{
        serviceObj.dbHealth = "db-down";
      }
      
      // serviceObj.dbHealth = (data.dbHealth === "true") ? "db-up" : "db-down";


      this.setState(this.configs);
  };

  findServiceObj = (envs, envName, serviceName) => {
    let envObj = envs.find(env => env.envName === envName);
    if (envObj === null){
      return null;
    }
    return envObj.services.find(service => service.name === serviceName);
  }

  render(){
      const { envs } = this.state;
      return (
        <div className="app">
            <header>
                <img src="https://ti2020-qa.s3.amazonaws.com/ti2020-homepage/2021.3.1.1/assets/74b0585f0a3fea181f472250a4a1cd5b.png" alt="Toluna Logo" />
                <div className="header-dashboard">Dashboard</div>
            </header>
            <div className="content">
                <div className="envs-menu-container">
                    {envs.map((env) => {
                                return <Nav env={env} key={"nav-" + env.envName} baseUrl={this.state.baseUrl} navigate={this.navigate} />
                            })}  
                </div>
                <div className="index-container">
                    <div className="indexItem status-column">Status</div>
                    <div className="indexItem service-column">Service</div>
                    <div className="indexItem version-column">Version</div>
                    <div className="indexItem db-version-column">DB Version</div>
                    <div className="indexItem db-health-column">DB Health</div>
                    <div className="indexItem admin-url">Links</div>
                </div>
                    {envs.map((env) => {
                                return <Env env={env} key={env.envName} baseUrl={this.state.baseUrl} />
                            })}
            </div>
        </div>
      )
  }
}

export default App