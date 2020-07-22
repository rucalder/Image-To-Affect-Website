
csvPath = "static/data/image_path.csv"
//var allFilePaths = []

function readCSVToArray(path, delimter)
{
    var filePaths = []
    $.ajax({
        type: "GET",
        url: path,
        dataType: "text",
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function(artCollection) {
              filePaths = artCollection.split(delimter);

        }
  });

  return filePaths
}

// function to return random image

function show_image() {

//clear the "resultDiv"
document.getElementById("resultDiv").innerHTML = "";

allFilePaths = readCSVToArray(csvPath, '\r')

ranNum = Math.floor(Math.random() * allFilePaths.length);

    var img = document.createElement("img");
    img.src = "static/imgs/images/" + allFilePaths[ranNum];
    img.id = "picture";

console.log(allFilePaths[ranNum])

    var foo = document.getElementById("resultDiv");
    foo.appendChild(img);

}

// function to return model output predictions

function saveAffects(){

var anger = document.getElementById("angerValue");
var anxiety = document.getElementById("anxietyValue");
var positiveEmotion = document.getElementById("positiveValue");
var affiliation = document.getElementById('affiliationValue')
var sad = document.getElementById("sadnessValue");

var pred = {"positive": Number(positiveEmotion.value),
  "anxiety": Number(anxiety.value),
  "anger": Number(anger.value),
  "sad": Number(sad.value),
  "affiliation": Number(affiliation.value)}

console.log("pred is", pred)
return pred
}



$(document).ready(function()
{

/*    $( '#angerValue,#anxietyValue,#socialValue,#positiveValue,#affiliationValue' ).mouseup(function() {*/
        console.log('starting submit')
        pred = saveAffects()
    $.ajax({
        url: "/TouchToArt",
        type: 'POST',
        data: JSON.stringify (pred),
        contentType: "application/json",
        dataType: 'json',
        success:function( data )
            {
                var data2 = data;
                var dataTosplit = data;
                var res = dataTosplit.split(";");
                var data = res[0];
                var features = res[1];
                console.log("new data is" + data)
                console.log("new features is" + features)

                document.getElementById("resultDiv").innerHTML = "";
                var img = document.createElement("img");
                img.src = "/static/imgs/images/" + data;
                img.id = "picture";
                img.height = "600";

                var foo = document.getElementById("resultDiv");
                foo.appendChild(img);
                console.log("img src is" + img.src)

            $('#PaintingName').html("result image is: " + data)
            //$('#artFeatures').html("features of selected art are: " + features)
            //$('#sliderValues').html("slider values are: " + JSON.stringify (pred))

                var photovals = JSON.parse(features)

            // Compare user input to given features
            $('#user-anger').html(pred["anger"])
            $('#user-anxiety').html(pred["anxiety"])
            $('#user-positive').html(pred["positive"])
            $('#user-sad').html(pred["sad"])
            $('#user-affiliation').html(pred["affiliation"])

            $('#comp-anger').html(photovals[2])
            $('#comp-anxiety').html(photovals[1])
            $('#comp-positive').html(photovals[0])
            $('#comp-sad').html(photovals[3])
            $('#comp-affiliation').html(photovals[4])

            // TODO difference column (how much user missed by) and color changing based on accuracy
            }
        })
/*    })*/
})
