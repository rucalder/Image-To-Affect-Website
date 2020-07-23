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