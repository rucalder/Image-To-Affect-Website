
csvPath = "../data/image_path.csv"
vectorPath = "../data/liwc_toParse.csv"
//var allFilePaths = []
var clicks = 0;
var score = 0;
var questions = 0;
var ranNum = 0;
var currVect = [];
var emoteTypes = ['anger', 'anxiety', 'positivity', 'sadness', 'love'];

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

    allFilePaths = readCSVToArray(csvPath, '\r');
    allVectorPaths = readCSVToArray(vectorPath, '\r');

    ranNum = Math.floor(Math.random() * allFilePaths.length);
    data = (allVectorPaths[ranNum]).split(",");
    currVect = data.slice(1,6);

    var img = document.createElement("img");
    img.src = "../imgs/images/" + data[0];
    img.id = "picture";
    img.height = "600";

    console.log(allFilePaths[ranNum]);

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

function onButtonClicked(clicked_id) {
    //have to create counter to keep track of button clicks, change when button has been
    //clicked 5 times
    //paintingVector = getVector();
    //pred = saveAffects();

    // disable button so it can't be clicked again
    document.getElementById(clicked_id).disabled = true;

    // Get clicked button emotion
    clicked_emotion = clicked_id.split("_")[0];
    // compare against expected (CHANGE CHECK TO BE REAL DATA)
    if(clicked_emotion == emoteTypes[Math.floor(Math.random() * emoteTypes.length)]){
        score++;
    }
    clicks++;
    // reset page if buttons have been completed
    if(clicks >= emoteTypes.length){
        clicks = 0;
        questions++;
        show_image();
        for(var i = 0; i < emoteTypes.length; i++){
            document.getElementById(emoteTypes[i] + '_button').disabled = false;
        }
        if(questions >= 5){
            sessionStorage.setItem('playerScore', score.toString);
            window.location.href = "/static/html/user_input.html";
            // GO TO END SCREEN (SCORE SCREEN)
        }
    }
    
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