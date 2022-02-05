import React, {useState, useEffect} from 'react';
import PlantDataService from '../services/plants';
import {Link} from 'react-router-dom';

const PlantsList = props => {
    const [plants, setPlants] = useState([]);

    useEffect(()=>{
        retrievePlants();
    }, []);

    const retrievePlants = ()=>{
        PlantDataService.getAll()
        .then(response => {
            console.log(response.data);
            setPlants(response.data.plants);
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    return (
        <>
          <div className="content-title mb-5">
            <h2>Pelajari Penanganan Tanaman</h2>
            <span className="text-secondary">Pelajari lebih lanjut metode pencegahan dan penanganan Hama.</span>
          </div>
          <div className="content-main">
            <div className="mb-5">
              <div className="prev-preds container">
                <div className="row">
                  {plants.map((plant) => {
                    return (
                      <div className="col-sm-4 mb-4 d-flex ps-0 pe-3">
                        <Link to={"/plants/"+plant.name} className="normal-link shadow-sm border rounded w-100">
                          <div className="resp-card-img rounded">
                            <img src={"http://localhost:5000"+plant.image_url} className="rounded-top" alt={plant.name}/>
                          </div>
                          <div className="w-100 p-2">
                            <div>
                                <p className="mb-0 prev-pred-title">{plant.name}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
    );
};

export default PlantsList;
