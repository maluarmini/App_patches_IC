import React, { useState, useEffect } from 'react';
import './App.css';
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import '../src/large_image/carcinoma.png'
import large_img from '../src/large_image/carcinoma.png';
import $ from 'jquery'; 

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../api/teste', false, /\.(png|jpe?g|svg)$/));

// console.log(images);
{
var result = Object.keys(images).map(function(key) {
  console.log(images[key].default);
  return [images[key].default];
});
}


function App() {
  const [status, setStatus] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [unselectedImages, setUnselectedImages] = useState([]);

  // setUnselectedImages([...result]);
  // console.log(unselectedImages);

  useEffect(() => {
    console.table(images);
    setSelectedImages([...images])
  }, [images])

  async function teste() {
    await fetch('/status').then(res => res.json()).then(data => {
          setStatus(data.status);
          console.log('API Flask OK')
        });
    var i=0    
    for(i=0; i < result.length;i++){
      setUnselectedImages(result[i])
    }
    console.log(unselectedImages);
  }

  async function benignos() {
    for(var x = 0;x <= selectedImages.length-1; x++ ){
      var a = $("<a>")
          .attr("href", `http://localhost:3000${selectedImages[x].src}`)
          .attr("download", "img.png")
          .appendTo("body");
  
      a[0].click();
  
      a.remove();
      }
  }

  function sendImages() {
    var i;
    for(i=0; i < selectedImages.length; i++){
      console.log(selectedImages[i].src)
    }
  }

function malignos(url, filename) {
  var url = "http://localhost:3000/"

    for(var x = 0;x <= selectedImages.length-1; x++ ){
    if( x < 10)
    var url = url + "0" + x + ".jpg";
    else
    var url = url + x + ".jpg";
    // console.log(selectedImages[x].src);
    var a = $("<a>")
        .attr("href", `http://localhost:3000${selectedImages[x].src}`)
        .attr("download", "img.png")
        .appendTo("body");

    a[0].click();

    a.remove();
    }
}

  return (
    
    <div className="App">
      <p>O status está {status}.</p>
      <button className="button" onClick={teste}>Gerar patches</button>
      <button className="button" onClick={malignos}>Malignos</button>
      <button className="button" onClick={benignos}>Benignos</button>
      <div className="area-images">
        <img src={large_img} className="image-large"/>
        {
          status === 'ok' &&
          <ImagePicker
            images={result.map((image, i) => ({src: image, value: i}))}
            onPick={(e) => setImages(e)}
            multiple
            className="teste"
        />}
      </div>
    </div>
  );
}

export default App;
