
csvPath = "../data/image_path.csv"
vectorPath = "../data/liwc_toParse.csv"
//var allFilePaths = []
var clicks = 0;
var score = 0;
var questions = 0;
var currVect = [];
var currDic = {};
//var emoteTypes = ['anger', 'anxiety', 'positivity', 'sadness', 'love'];
var emoteTypes = ['positivity', 'anxiety', 'anger', 'sadness', 'love'];
var numGames = 5;

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
        success: function (data) {
            return data;
        }
    });
}

// function to return random image

function show_image() { //TODO make show image never repeat (in same round, I got the same image 2x in a row)

    //clear the "resultDiv"
    document.getElementById("resultDiv").innerHTML = "";

    allFilePaths = readCSVToArray(csvPath, '\r');
    allVectorPaths = readCSVToArray(vectorPath, '\r');

    var ranNum = Math.floor(Math.random() * allFilePaths.length);
    data = (allVectorPaths[ranNum]).split(",");
    currVect = data.slice(1, 6);
    emoteTypes.forEach((key, i) => currDic[key] = currVect[i]);
    currVect = Object.keys(currDic).map(function (key) {
        return [key, currDic[key]];
    });
    currVect.sort(function (first, second) {
        return second[1] - first[1];
    });

    var img = document.createElement("img");
    img.src = "../imgs/images/" + data[0];
    img.id = "picture";
    img.height = "600";

    console.log(allFilePaths[ranNum]);

    var foo = document.getElementById("resultDiv");
    foo.appendChild(img);
}

// function to return model output predictions

function saveAffects() { // NOT USED
    var pred = document.querySelector('input[name="emotion"]:checked').value;

    console.log("pred is", pred)
    return pred
}


// When the page loads - we want the user to be presented with the slider values set to zero, and a random image.
// Then the user changes the slider, and clicks "Submit your guess". When this happens, the slider values should be
//stored, along with the affect vector for the image, and the path to the image. After 5 images, all info
// should be shown to user

function onButtonClicked(clicked_id) {
    // disable button so it can't be clicked again
    document.getElementById(clicked_id).disabled = true;

    // Get clicked button emotion
    clicked_emotion = clicked_id.split("_")[0];

    // compare against expected (CHANGE CHECK TO BE REAL DATA)
    if (clicked_emotion == currVect[clicks][0]) {
        score++;
    }
    clicks++;
    document.getElementById('current_pick').textContent = (clicks).toString();
    document.getElementById('selection_' + (clicks).toString()).textContent = clicked_emotion;
    $(document.getElementById('selection_' + (clicks).toString())).css("opacity", .99);
    setTimeout(function () { // timeout allows users to evaluate their inputs before page reloads
        $(document.getElementById('selection_' + (clicks).toString())).css("opacity", 1);

        // next image if ranking has been completed
        if (clicks >= emoteTypes.length) {
            clicks = 0;
            questions++;
            if (questions >= numGames) { // move to scoring page if game complete
                showScore();
            }
            for (var i = 0; i < emoteTypes.length; i++) {
                document.getElementById(emoteTypes[i] + '_button').disabled = false;
                document.getElementById('selection_' + (i + 1).toString()).textContent = " ";
            }
            show_image();
            document.getElementById('current_pick').textContent = (clicks + 1).toString();
        }
    }, 50);
}

function showScore() {
    // SET SCORE STRING TO 'playerScore' below
    sessionStorage.setItem('playerScore', score.toString());
    window.location.href = "/static/html/scoring_page.html";
    show_image();
}


$(document).ready(function () {
    show_image()
})