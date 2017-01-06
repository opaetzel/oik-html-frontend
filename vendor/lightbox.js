function loadLargeIm(el) {
    console.log(el);
    var token = el.dataset.token;
    var id = el.id;
    var imId = id.replace("lb-link-", "");
    var bigImage = document.getElementById('im-bg-' + imId);
    if ('true' == bigImage.getAttribute('bigLoaded')){
        var linkId = 'img-click-hidden-' + imId;
        document.getElementById(linkId).click();
        return;
    }
    var url = "/api/get-image/" + imId + "?size=full";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.setRequestHeader("Accept", "*/*");
    xhr.responseType = "blob";
    xhr.onload = function(e) {
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(e.target.response);
        bigImage.src = imageUrl;
        bigImage.setAttribute('bigLoaded', 'true');
        var linkId = 'img-click-hidden-' + imId;
        document.getElementById(linkId).click();
    };
    xhr.send(); 
}   
