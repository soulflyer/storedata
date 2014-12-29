function readLocal(fileName,onComplete){
    var store = cordova.file.dataDirectory;
    window.resolveLocalFileSystemURL(store + fileName, doRead , fail);
    function doRead(entry){
        entry.file(gotFile, fail);
        function gotFile(gfile){
            var reader=new FileReader;
            reader.onloadend= function(evt){
                onComplete(this.result);
            };
            reader.readAsText(gfile);
        }
    }
}

function writeLocal(fileName,fileURL){
    var store = cordova.file.dataDirectory;
    var fileTransfer =  new FileTransfer();
    fileTransfer.download(fileURL,store + fileName,
                          function(entry){
                              console.log("Wrote " + fileName);
                          },
                          function(err){
                              console.log("Failed to write " + fileName);
                          });
}

function fail(error) {
    alert('We encountered a problem: ' + error.code);
}
