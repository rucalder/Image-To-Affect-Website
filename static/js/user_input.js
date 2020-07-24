function getFileName() {
    $.ajax({
        url: "/GetUserImage",
        type: 'GET',
/*        data: JSON.stringify(pred),
*/      contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            console.log(data);
        }
    })
}


getFileName();



document.getElementById("resultDiv").innerHTML = "";


<img src="/Users/sairah/Documents/GitHub/Image-To-Affect-Website/static/imgs/user_uploads/userImage.jpg" alt="userImage">
