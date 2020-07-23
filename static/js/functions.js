
csvPath = "static/data/image_path.csv"
vectorPath = "static/data/liwc_toParse.csv"
//var allFilePaths = []
var score = 0;
var questions = 0;
var ranNum = 0;
var currVect = 0;

function readCSVToArray(path, delimter) {
    var filePaths = []
    $.ajax({
        type: "GET",
        url: path,
        dataType: "text",
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (artCollection) {
            filePaths = artCollection.split(delimter);

        }
    });

    return filePaths
}

function getVector() {
    $.ajax({
        type: 'POST',
        url: '/GetVector',
        data: JSON.stringify(allFilePaths[ranNum]),
        contentType: 'application/json',
        success:function(data){
            return data;
        }
    });
}

// function to return random image

function show_image() {

    //clear the "resultDiv"
    document.getElementById("resultDiv").innerHTML = "";

    allFilePaths = readCSVToArray(csvPath, '\r')
    allVectorPaths = readCSVToArray(vectorPath, '\r')

    ranNum = Math.floor(Math.random() * allFilePaths.length);
    currVect = allVectorPaths[ranNum]

    
    var img = document.createElement("img");
    img.src = "static/imgs/images/" + allFilePaths[ranNum];
    img.id = "picture";
    img.height = "600";

    console.log(allFilePaths[ranNum])

    var foo = document.getElementById("resultDiv");
    foo.appendChild(img);
}

// function to return model output predictions

function saveAffects() {

    var pred = document.querySelector('input[name="emotion"]:checked').value;

    // var anger = document.getElementById("angerValue");
    // var anxiety = document.getElementById("anxietyValue");
    // var positiveEmotion = document.getElementById("positiveValue");
    // var affiliation = document.getElementById('affiliationValue')
    // var sad = document.getElementById("sadnessValue");

    // var pred = {
    //     "positive": Number(positiveEmotion.value),
    //     "anxiety": Number(anxiety.value),
    //     "anger": Number(anger.value),
    //     "sad": Number(sad.value),
    //     "affiliation": Number(affiliation.value)
    // }

    console.log("pred is", pred)
    return pred
}


// When the page loads - we want the user to be presented with the slider values set to zero, and a random image.
// Then the user changes the slider, and clicks "Submit your guess". When this happens, the slider values should be
//stored, along with the affect vector for the image, and the path to the image. After 5 images, all info
// should be shown to user

function onButtonClicked() {
    //have to create counter to keep track of button clicks, change when button has been
    //clicked 5 times
    paintingVector = getVector();
    pred = saveAffects();
    questions++;
    if (pred == 'anger'){
        score++;
    }
    $('input[name=emotion]').attr('checked',false);
    show_image();
    if(questions >= 5){
        document.getElementById("submitButton").textContent = score.toString();
        // GO TO END SCREEN (SCORE SCREEN)
    }
    //return pred
}


$(document).ready(function () {

    show_image()

})
    // vector = getVector()

    // we actually don't want the features from the ajax call - so we'll have to grab the
    //features of the random image from the liwc.csv

    // pred = saveAffects()
    // data = JSON.stringify(pred)
    // var dataTosplit = data;
    // var res = dataTosplit.split(";");
    // var data = res[0];
    // var features = res[1];

    // var photovals = JSON.parse(data)

    // // Compare user input to given features
    // $('#user-anger').html(pred["anger"])
    // $('#user-anxiety').html(pred["anxiety"])
    // $('#user-positive').html(pred["positive"])
    // $('#user-sad').html(pred["sad"])
    // $('#user-affiliation').html(pred["affiliation"])

    // $('#comp-anger').html(photovals[2])
    // $('#comp-anxiety').html(photovals[1])
    // $('#comp-positive').html(photovals[0])
    // $('#comp-sad').html(photovals[3])
    // $('#comp-affiliation').html(photovals[4])




    // pred = saveAffects()
    // $.ajax({
    //     url: "/GetVector",
    //     type: 'GET',
    //     data: JSON.stringify (pred),
    //     contentType: "application/json",
    //     dataType: 'json',
    //     success:function( data )
    //         {
    //             var data2 = data;
    //             var dataTosplit = data;
    //             var res = dataTosplit.split(";");
    //             var data = res[0];
    //             var features = res[1];
    //             console.log("new data is" + data)
    //             console.log("new features is" + features)
 
    //             document.getElementById("resultDiv").innerHTML = "";
    //             var img = document.createElement("img");
    //             img.src = "/static/imgs/images/" + data;
    //             img.id = "picture";
    //             img.height = "600";
 
    //             var foo = document.getElementById("resultDiv");
    //             foo.appendChild(img);
    //             console.log("img src is" + img.src)
 
    //         $('#PaintingName').html("result image is: " + data)
    //         //$('#artFeatures').html("features of selected art are: " + features)
    //         //$('#sliderValues').html("slider values are: " + JSON.stringify (pred))
 
    //             var photovals = JSON.parse(features)
 
    //         // Compare user input to given features
    //         $('#user-anger').html(pred["anger"])
    //         $('#user-anxiety').html(pred["anxiety"])
    //         $('#user-positive').html(pred["positive"])
    //         $('#user-sad').html(pred["sad"])
    //         $('#user-affiliation').html(pred["affiliation"])
 
    //         $('#comp-anger').html(photovals[2])
    //         $('#comp-anxiety').html(photovals[1])
    //         $('#comp-positive').html(photovals[0])
    //         $('#comp-sad').html(photovals[3])
    //         $('#comp-affiliation').html(photovals[4])
 
    //         // TODO difference column (how much user missed by) and color changing based on accuracy
    //         }
    //     })
    // })
    //         // TODO difference column (how much user missed by) and color changing based on accuracy