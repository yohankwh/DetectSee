import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';

import PlantList from "./components/plants-list";

function App() {
  return (
    <div>
      <nav className="main-nav border-bottom">
        <div className="top-nav d-flex justify-content-between align-items-center">
            <div className="left-nav col d-flex align-items-center">
                <div className="logo d-flex align-items-center">
                    <img className="logo-png" src={logo}/>
                </div>
                <div className="site-title d-flex align-items-center">
                    <a href="" className="normal-link"><p className="mb-0 site-title-text">DetectSee</p></a>
                </div>
            </div>
            <div className="right-nav col d-flex align-items-center justify-content-end">
                <div className="right-nav-content d-flex align-items-center">
                    <div className="search-bar d-flex align-items-center p-2">
                        <button type="submit" disabled="" className="search-icon ps-2 py-1">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                        <input type="text" placeholder="Cari Hama atau Tanaman" className="search-field py-1 pe-2"/>
                    </div>
                </div>
            </div>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/plants"]} component={PlantList} />
          {/* <Route 
            path="/plants/:id"
            render={(props) => (
              <Restaurant {...props} />
            )}
          /> */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
