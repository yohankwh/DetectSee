import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import * as tf from '@tensorflow/tfjs';
import ModelList from '../tensorflow/model-list'

const Predictor = props => {
    //terminologies: Class -> Jenis Tanaman | InterClass/Type -> Jenis Penyakit
    const classes = ["Kacang","Tomat"];//entar fetch lewat helper

    //statuses
    const [isModelLoading, setIsModelLoading] = useState(false);
    //models
    const [classModel, setClassModel] = useState(null);
    const [interClassModels, setInterClassModels] = useState(null);
    //attributes
    const [imageUrl, setImageUrl] = useState(null);
    //results
    const [predClass, setPredClass] = useState(null);
    const [predInterClass, setPredInterClass] = useState(null);
    const [predAcc, setPredAcc] = useState(null)
    //expected result: predClass - predInterClass

    const imageRef = useRef();

    useEffect(()=>{
        loadMainModel();
    },[]);

    const loadMainModel = async () => {
        setIsModelLoading(true);
        try{
            const mainModel = await tf.loadGraphModel('models/Kacang/model.json');
            setClassModel(mainModel);
            setIsModelLoading(false);
            console.log("finished loading main model");

            loadInterClassModels();
        }catch(err){
            console.log(err);
            setIsModelLoading(false);
        }
    }

    const loadInterClassModels = async () => {
        const models = {};
        setIsModelLoading(true);
        try{
            for(const class_name of classes ){
                models[class_name] = await tf.loadGraphModel('models/'+class_name+'/model.json');
            }
            setInterClassModels(models);
            setIsModelLoading(false);
            console.log("finished loading all models");
            console.log(models);
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
        }else{
            setImageUrl(null);
        }
    }

    // const identify-single = async () => {
    //     const imageTensor = tf.browser.fromPixels(imageRef.current);
    //     const newImage = tf.cast(
    //         tf.image.resizeBilinear(imageTensor, [200, 200]),
    //         'float32'
    //     )
    //     const norm = tf.fill([200, 200, 3], 255)
    //     const normalisedImage = tf.div(newImage, norm)
    //     const predictme = tf.cast(tf.expandDims(normalisedImage), 'float32')
    
    //     const results = await classModel.predict(predictme).dataSync();

    //     const classLabels = ModelList.getClassNamesByPlant("Kacang");
    
    //     console.log(results)
    //     let maxAcc = Math.max.apply(Math,results);
    //     let predictedClass = classLabels[results.indexOf(maxAcc)];
    //     maxAcc = maxAcc.toFixed(2);
    //     console.log("Kelas: "+predictedClass);
    //     setPredInterClass(predictedClass);
    //     console.log("Akurasi: "+maxAcc);
    //     setPredAcc(maxAcc);
    // }

    const identify = async () => {
        //convert image
        const imageTensor = tf.browser.fromPixels(imageRef.current);
        const newImage = tf.cast(
            tf.image.resizeBilinear(imageTensor, [200, 200]),
            'float32'
        )
        const norm = tf.fill([200, 200, 3], 255)
        const normalisedImage = tf.div(newImage, norm)
        const predictme = tf.cast(tf.expandDims(normalisedImage), 'float32')
    
        //do initial prediction: determining main class
        const classResults = await classModel.predict(predictme).dataSync();

        //get the class with the max accuracy, and load the model
        let maxAcc = Math.max.apply(Math,classResults);
        const classLabel = classes[classResults.indexOf(maxAcc)];
        setPredClass(classLabel);
        console.log("CLASS YANG ADA:")
        console.log(classes);
        console.log("CLASS RESULTS:")
        console.log(classResults)
        console.log("JADI KELASNYA ADALAH:")
        console.log(classLabel)
        let interModel = interClassModels[classLabel];

        console.log("INTERMODELNYA ADALAH:");
        console.log(interModel);

        //do interclass prediction: determining plant diseasess
        const classLabels = ModelList.getClassNamesByPlant(classes[classResults.indexOf(maxAcc)]);
        const interClassResults = await interModel.predict(predictme).dataSync();

        //calculate end prediction result
        console.log(interClassResults)
        let maxAccInter = Math.max.apply(Math,interClassResults);
        let predictedClassInter = classLabels[interClassResults.indexOf(maxAccInter)];
        maxAccInter = maxAccInter.toFixed(2);
        console.log("Kelas: "+predictedClassInter);
        setPredInterClass(predictedClassInter);
        console.log("Akurasi: "+maxAccInter);
        setPredAcc(maxAccInter);
    }

    return (
        <>
            <div className="content-title mb-4">
                <h2 className="text-center">Deteksi Tanaman Baru</h2>
            </div>
            <div className="content-main">
                <div className="pb-4 border-bottom">
                    <div className="mb-3 d-flex justify-content-center">
                        <div className="bg-steps steps-col rounded w-75 border">
                            <div className="container d-flex justify-content-center pt-4 pb-2 border-bottom">
                                <small>Gunakan Kamera atau Unggah Foto</small>
                            </div>
                            <div className="py-3">
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
                <div className="d-flex justify-content-center">
                    <div className="mb-3 py-3 text-center">
                        <h4>Hasil Diagnosis</h4>
                        <div className="rounded">
                            <small>Tanaman Anda mungkin termasuk dari salah satu penyakit di bawah ini.</small>
                        </div>
                    </div>
                </div>
                <div className="pred-card-wrap w-75 m-auto flex-row mb-4">
                    <div className="pred-card border rounded shadow-sm p-3 pb-2 w-75 m-auto">
                        <div>
                            <div className="pb-2">
                                <div className="d-flex">
                                    <div className="col">
                                        <p className="text-end mb-0 font-08em"><i>Confidence: {parseInt(parseFloat(predAcc)*100)}%</i></p>
                                        <h5 className="mb-0">{predClass+" "+predInterClass}</h5>
                                        <p className="text-secondary mb-0">Deezospora Nuterillo</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="btn collapse-btn" data-toggle="collapse" data-target="#pred-1"
                                aria-expanded="false" aria-controls="pred-1">
                                    <p className="mb-0 text-center text-secondary font-08em">&#8595; klik untuk detail &#8595;</p>
                                </button>
                            </div>
                        </div>
                        <div className="collapse show" id="pred-1">
                            <div className="pred-card-images container py-2">
                                <div className="row justify-content-center">
                                    <div className="col-3 px-0">
                                        <img src="./assets/example.jpg" className="rounded"/>
                                    </div>
                                    <div className="col-3 px-0 mx-3">
                                        <img src="./assets/example.jpg" className="rounded"/>
                                    </div>
                                    <div className="col-3 px-0">
                                        <img src="./assets/example.jpg" className="rounded"/>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3">
                                <h5>Gejala</h5>
                                <ul className="ps-3">
                                    <li>Deez</li>
                                    <li>Nuts</li>
                                </ul>
                            </div>
                            <p className="text-end"><a href="">Lihat Selengkapnya</a></p>
                        </div>
                    </div>
                </div>
                <div className="pred-card-wrap w-75 m-auto flex-row mb-4">
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
                                    <li>Deez</li>
                                    <li>Nuts</li>
                                </ul>
                            </div>
                            <p className="text-end"><a href="">Lihat Selengkapnya</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Predictor;