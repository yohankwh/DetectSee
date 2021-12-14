import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import * as tf from '@tensorflow/tfjs';
import ModelList from '../tensorflow/model-list';
import PredictionDataService from '../services/predictions';
import DiseaseDataService from '../services/diseases';

const Predictor = props => {
    //terminologies: Class -> Jenis Tanaman | InterClass/Type -> Jenis Penyakit
    const plantClasses = ["Cabai","Kacang Panjang","Timun","Tomat"];//entar fetch lewat helper

    //statuses
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasPredicted, setHasPredicted] = useState(false);
    const [selectedModel, setSelectedModel] = useState("Default");
    //models
    const [plantModel, setPlantModel] = useState(null);
    const [diseaseModels, setDiseaseModels] = useState(null);
    //attributes
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUp, setImageUp] = useState(null);
    const [predUrl, setPredUrl] = useState(null);
    const [sampleImgs, setSampleImgs] = useState([]);
    //results
    const [predPlant, setPredPlant] = useState(null);
    const [predDisease, setPredDisease] = useState(null);
    const [predAcc, setPredAcc] = useState(null)
    //expected result: predPlant - predDisease
    //disease data
    const [disease, setDisease] = useState(null);

    const imageRef = useRef();

    useEffect(()=>{
        loadMainModel();//load plant model, then load disease models
    },[]);

    const loadMainModel = async () => {
        setIsModelLoading(true);
        try{
            const mainModel = await tf.loadGraphModel('models/Plant/model.json');
            setPlantModel(mainModel);
            setIsModelLoading(false);
            console.log("finished loading main model");

            loadDiseaseModels();
        }catch(err){
            console.log(err);
            setIsModelLoading(false);
        }
    }

    const loadDiseaseModels = async () => {
        const models = {};
        setIsModelLoading(true);
        try{
            for(const class_name of plantClasses ){
                models[class_name] = await tf.loadGraphModel('models/'+class_name+'/model.json');
            }
            setDiseaseModels(models);
            setIsModelLoading(false);
            console.log("finished loading all models");
        }catch(err){
            console.log(err);
            setIsModelLoading(false);
        }
    }

    const loadImage = (e) => {
        const {files} = e.target;
        if(files.length>0){
            const url = URL.createObjectURL(files[0]);
            setImageUrl(url);
            setImageUp(files[0]);
        }else{
            setImageUrl(null);
            setImageUp(null);
        }
    }

    const changeModel = async (e) => {
        setSelectedModel(e.target.value);
    }

    const identify = async () => {
        //convert image
        setHasPredicted(true);
        const imageTensor = tf.browser.fromPixels(imageRef.current);
        const newImage = tf.cast(
            tf.image.resizeBilinear(imageTensor, [200, 200]),
            'float32'
        )
        const norm = tf.fill([200, 200, 3], 255)
        const normalisedImage = tf.div(newImage, norm)
        const predictme = tf.cast(tf.expandDims(normalisedImage), 'float32')

        let plantLabel;
        let predictedClassDisease;
        let maxAccDisease;
        if(selectedModel === "Default"){
            //do initial prediction: determining main class
            const plantPredResults = await plantModel.predict(predictme).dataSync();

            //get the class with the max accuracy, and load the model
            let maxAcc = Math.max.apply(Math,plantPredResults);
            plantLabel = plantClasses[plantPredResults.indexOf(maxAcc)];

            setPredPlant(plantLabel);

            let diseaseModel = diseaseModels[plantLabel];

            //do interclass prediction: determining plant diseasess
            const diseaseLabels = ModelList.getClassNamesByPlant(plantClasses[plantPredResults.indexOf(maxAcc)]);
            const diseaseClassResults = await diseaseModel.predict(predictme).dataSync();

            //calculate end prediction result
            maxAccDisease = Math.max.apply(Math,diseaseClassResults);
            // console.log("max disease: "+interClassResults.indexOf(maxAccInter));
            predictedClassDisease = diseaseLabels[diseaseClassResults.indexOf(maxAccDisease)];
        }else{
            plantLabel=selectedModel;
            setPredPlant(plantLabel);
            const diseasesList = ModelList.getClassNamesByPlant(selectedModel);
            let diseaseModel = diseaseModels[selectedModel];
            const diseasePredResults = await diseaseModel.predict(predictme).dataSync();
            maxAccDisease = Math.max.apply(Math,diseasePredResults);
            predictedClassDisease = diseasesList[diseasePredResults.indexOf(maxAccDisease)];
        }
        
        let examples = [];
        for(let i=0;i<3;i++){
            examples.push("http://localhost:5000/uploads/diseases/"+
                            plantLabel.replace(/\s/g, "_")+"-"
                            +predictedClassDisease.replace(/\s/g, "_")+"-"+(i+1)+".jpg");
        }
        setSampleImgs(examples);

        // console.log("dieases is: "+predictedClassInter);
        maxAccDisease = maxAccDisease.toFixed(2);
        setPredDisease(predictedClassDisease);
        setPredAcc(maxAccDisease);

        //fetch disease data
        DiseaseDataService.get(predictedClassDisease)
        .then((fetched)=>{
            setDisease(fetched.data);
        }
        ).catch(err=>{
            console.log(err);
        });

        /*
        const formData = new FormData();
        formData.append("plant_name",classLabel);
        formData.append("disease_name",predictedClassInter);
        formData.append("confidence",parseFloat(maxAccInter));
        formData.append("image_plant",imageUp);

        //submit post data
        setIsSubmitting(true);
        PredictionDataService.post(formData)
        .then((res)=>{
            setPredUrl(res.data.inserted_id);
            setIsSubmitting(false);
        })
        .catch((err)=>{
            console.log(err);
            setIsSubmitting(false);
        })*/
    }

    return (
        <>
            <div className="content-title mb-3 text-center">
                <h2 className="">Deteksi Tanaman Baru</h2>
                <p className="mb-0">Pilih jenis tanaman atau deteksi langsung jenis penyakit</p>
            </div>
            <div className="content-main">
                <div className="pb-4 border-bottom">
                    <div className="mb-3 d-flex justify-content-center">
                        <div className="bg-steps steps-col rounded w-75 border">
                            <div className="container d-flex py-2 border-bottom gap-3 justify-content-center">
                                <button value="Default" onClick={changeModel}
                                        className={`btn rounded border bg-light py-1 px-3 ${selectedModel === "Default" && "model-nav-active"}`}>Semua</button>
                                <button value="Cabai" onClick={changeModel}
                                        className={`btn rounded border bg-light py-1 px-3 ${selectedModel === "Cabai" && "model-nav-active"}`}>Cabai</button>
                                <button value="Kacang Panjang" onClick={changeModel}
                                        className={`btn rounded border bg-light py-1 px-3 ${selectedModel === "Kacang Panjang" && "model-nav-active"}`}>Kacang Panjang</button>
                                <button value="Timun" onClick={changeModel}
                                        className={`btn rounded border bg-light py-1 px-3 ${selectedModel === "Timun" && "model-nav-active"}`}>Timun</button>
                                <button value="Tomat" onClick={changeModel}
                                        className={`btn rounded border bg-light py-1 px-3 ${selectedModel === "Tomat" && "model-nav-active"}`}>Tomat</button>
                            </div>
                            <div className="py-3">
                                <p className="text-center"><small>Gunakan kamera atau unggah foto.</small></p>
                                <div className="input-wrapper d-flex justify-content-center">
                                    <label className="items-center px-2 py-1 bg-white rounded" style={{cursor: "pointer"}}>
                                        <span className="text-base leading-normal">Ambil Foto</span>
                                        <input type="file" accept="image/*" className="uploadInput d-none" onChange={loadImage}></input>
                                    </label>
                                </div>
                                <div className="image-wrapper p-2 d-flex justify-content-center">
                                    <div className="image-holder bg-light m-auto">
                                        {imageUrl && <img src={imageUrl} crossOrigin="anonymous" ref={imageRef}/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center flex-column">
                        {
                            isModelLoading ? 
                                <>
                                    <div className="d-flex justify-content-center">
                                        <img className="loading-i" src={process.env.PUBLIC_URL + 'assets/spinner.svg'} alt="loading"/>
                                    </div>
                                    <p className="text-center"><b>Loading Model</b></p>
                                </>
                            :
                            <div className="w-25 m-auto d-flex justify-content-center">
                                <button className="btn border rounded primary-green-btn weight-500" onClick={identify}>Identifikasi</button>
                            </div>
                        }
                    </div>
                </div>
                {hasPredicted && 
                    <>
                        {!isSubmitting && predDisease ?
                            <>
                                <div className="d-flex justify-content-center">
                                    <div className="mb-3 py-3 text-center">
                                        <h4>Hasil Diagnosis</h4>
                                        <div className="rounded">
                                            <small>Diagnosis yang mungkin untuk Tanaman Anda</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="pred-card-wrap w-75 m-auto flex-row mb-4">
                                    <div className="pred-card border rounded shadow-sm p-3 pb-2 w-75 m-auto">
                                        <div>
                                            <div className="pb-3">
                                                <div className="d-flex">
                                                    <div className="col">
                                                        <p className="text-end mb-0 font-08em"><b>Confidence: {parseInt(parseFloat(predAcc)*100)}%</b></p>
                                                        <h5 className="mb-0">{predPlant+" "+predDisease}</h5>
                                                        <p className="text-secondary mb-0">{disease && disease.sp}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="pred-card-images container py-2">
                                                <div className="row justify-content-center">
                                                    {
                                                        sampleImgs.map((sample, idx)=>{
                                                            return(
                                                                <div key={idx} className="col-4">
                                                                    <img src={sample} className="rounded"/>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            {
                                                predDisease==="Sehat"?
                                                <div className="pt-3">
                                                    <h5 className="text-center">Tanaman Anda Sehat!</h5>
                                                </div>
                                                :
                                                <>
                                                <div className="pt-3">
                                                    <h5>Gejala</h5>
                                                    <ul className="ps-3">
                                                    {disease && disease.gejala && disease.gejala.length>0 && 
                                                        disease.gejala.map((gejala, idx) => {
                                                            return (
                                                            <li key={idx}>{gejala}</li>
                                                        )})
                                                    }
                                                    </ul>
                                                </div>
                                                <p className="text-end"><Link to={"/diseases/"+predDisease}>Lihat Selengkapnya</Link></p>
                                                </>
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="pred-card-wrap w-75 m-auto flex-row mb-4">
                                    <div className="pred-card border rounded shadow-sm p-3 pb-2 w-75 m-auto">
                                        <div>
                                            <div className="pb-2">
                                                <div className="d-flex">
                                                    <div className="col">
                                                        <p className="text-end mb-0 font-08em"><i>Confidence: 69%</i></p>
                                                        <h5 className="mb-0">Tanaman Hama Tulis</h5>
                                                        <p className="text-secondary mb-0">Deezospora Nuterillo</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button className="btn collapse-btn"
                                                data-toggle="collapse" data-target="#pred-2"
                                                aria-expanded="false" aria-controls="pred-2">
                                                    <p className="mb-0 text-center text-secondary font-08em">klik untuk detail</p>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="collapse" id="pred-2">
                                            <div className="pred-card-images container py-2">
                                                <div className="row justify-content-center">
                                                    <div className="col-3 px-0">
                                                        <img src="assets/example.jpg" className="rounded"/>
                                                    </div>
                                                    <div className="col-3 px-0 mx-3">
                                                        <img src="assets/example.jpg" className="rounded"/>
                                                    </div>
                                                    <div className="col-3 px-0">
                                                        <img src="assets/example.jpg" className="rounded"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-3">
                                                <h5>Gejala</h5>
                                                <ul className="ps-3">
                                                    <li>Abc</li>
                                                    <li>Def</li>
                                                </ul>
                                            </div>
                                            <p className="text-end"><a href="">Lihat Selengkapnya</a></p>
                                        </div>
                                    </div>
                                </div> */}
                            </>
                            :
                            <>
                                <div className="d-flex justify-content-center">
                                    <img className="loading-mini" src={process.env.PUBLIC_URL + 'assets/spinner.svg'} alt="loading"/>
                                </div>
                                <p className="text-center"><b>Model is Predicting</b></p>
                            </>
                        }
                    </>
                }
            </div>
        </>
    );
}

export default Predictor;