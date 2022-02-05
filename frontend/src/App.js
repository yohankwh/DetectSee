import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faCompass} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Home from "./components/home";
import PlantsList from './components/plants-list';
import Predictor from './components/predictor';
import PlantView from './components/plant-view';
import DiseaseView from './components/disease-view';

function App() {
  return (
    <>
      <nav className="main-nav border-bottom">
        <div className="top-nav d-flex justify-content-between align-items-center">
            <div className="left-nav col d-flex align-items-center">
                <div className="logo d-flex align-items-center">
                    <img className="logo-png" src='/assets/logo.png' alt='logo'/>
                </div>
                <div className="site-title d-flex align-items-center">
                    <Link to={'/'} className="normal-link">
                      <p className="mb-0 site-title-text">DetectSee</p>
                    </Link>
                </div>
            </div>
        </div>
      </nav>

      <div className="d-block d-sm-none mobile-nav bg-light w-100 d-flex justify-content-center align-items-center">
        <div className="container d-flex justify-content-between text-center align-items-center">
            <div className="col">
              <Link to={'/'}>
                <FontAwesomeIcon className="text-secondary" icon={faHome}></FontAwesomeIcon>
              </Link>
            </div>
            <div className="col">
              <Link to={'/predict'}>
                <img src="/assets/scanner.png" className="alt-nav-icon-img" alt="predict icon"/>
              </Link>
            </div>
            <div className="col">
              <Link to={'/plants'}>
                <FontAwesomeIcon className="text-secondary" icon={faCompass}></FontAwesomeIcon>
              </Link>
            </div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="d-flex h-100">
          <div className="col-3 d-sm-block d-none w-22-5">
            <div className="sidenav-wrapper d-flex flex-column h-100 p-4">
                <div className="sidenav-item p-2">
                    <div className="p-3">
                        <div className="bg-normal-nav h-100 w-100 rounded p-1">
                            <Link to={"/"} className="normal-link normal-nav">
                                <div className="h-100 d-flex justify-content-between p-3 align-items-center">
                                    <div className="col-3 d-flex justify-content-center align-items-center">
                                      <FontAwesomeIcon className="fa-2rem" icon={faHome}></FontAwesomeIcon>
                                    </div>
                                    <div className="col-8 d-flex align-items-center">
                                      <p className="mb-0 sidenav-item-text">Home</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="sidenav-item p-2">
                    <div className="p-3">
                        <div className="bg-normal-nav h-100 w-100 rounded p-1">
                            <Link to={"/predict"} className="normal-link normal-nav">
                                <div className="h-100 d-flex justify-content-between p-3 align-items-center">
                                    <div className="col-3 d-flex justify-content-center align-items-center">
                                        <img src="/assets/scanner3.png" style={{height:'2rem',width:'2rem'}} alt="predict icon"/>
                                    </div>
                                    <div className="col-8 d-flex align-items-center">
                                        <p className="mb-0 sidenav-item-text">Deteksi</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="sidenav-item p-2">
                    <div className="p-3">
                        <div className="bg-normal-nav h-100 w-100 rounded p-1">
                            <Link to={"/plants"} className="normal-link normal-nav">
                                <div className="h-100 d-flex justify-content-between p-3 align-items-center">
                                    <div className="col-3 d-flex justify-content-center align-items-center">
                                      <FontAwesomeIcon className="fa-2rem" icon={faCompass}></FontAwesomeIcon>
                                    </div>
                                    <div className="col-8 d-flex align-items-center">
                                        <p className="mb-0 sidenav-item-text">Pelajari</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
          </div>
          <div className="col p-4 pb-2">
              <div className="content-section p-2 h-100 scrollable-section">
                <Switch>
                  <Route exact path="/"
                    render={(props) => (
                      <Home {...props} />
                    )}
                  />
                  <Route exact path="/plants"
                    render={(props) => (
                      <PlantsList {...props} />
                    )}
                  />
                  <Route exact path="/predict"
                    render={(props) => (
                      <Predictor {...props} />
                    )}
                  />
                  <Route 
                    path="/plants/:id"
                    render={(props) => (
                      <PlantView {...props} />
                    )}
                  />
                  <Route 
                    path="/diseases/:id"
                    render={(props) => (
                      <DiseaseView {...props} />
                    )}
                  />
                </Switch>
              </div>
          </div>
        </div>
      </div>              
    </>
  );
}

export default App;
