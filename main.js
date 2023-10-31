
var prediction1='';
var prediction2='';

Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}


console.log('ml5 version:', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/iisBRCITn/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model loaded');
}


function speak(){
    var synth=window.speechSynthesis;
    speak_data1='The first prediction is '+prediction1;
    speak_data2='The second prediction is '+prediction2;
    var Utterthis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterthis);
}

function check(){
    img= document.getElementById("captured_image")
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
   if (error) {
    console.error(error);
   } 
   else{
    console.log(results);
    document.getElementById("result_sign_name").innerHTML= results[0].label;
    document.getElementById("result_sign_name2").innerHTML= results[1].label;
    prediction1=results[0].label;
    prediction2=results[1].label;
    speak();
    if (results[0].label=="Wuv u"){
        document.getElementById("update_sign").innerHTML='&#9997;';
    }
    if (results[0].label=="Thanks"){
        document.getElementById("update_sign").innerHTML='&#9994;';
    }
    if (results[0].label=="Class 4"){
        document.getElementById("update_sign").innerHTML='&#9757;';
    }
    
    if (results[1].label=="Wuv u"){
        document.getElementById("update_sign2").innerHTML='&#128075;';
    }
    if (results[1].label=="Thanks"){
        document.getElementById("update_sign2").innerHTML='&#128406;';
    }
    if (results[1].label=="Class 4"){
        document.getElementById("update_sign2").innerHTML='&#129304;';
    }
   

    

    

   }
}







 