var localFileSystemName="BPData";

window.onload = init;
function init() {
    alert("Hello");
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
    // window.resolveLocalFileSystemURL(cordova.file.applicationStorageDirectory, function(fentry){
    //     console.log("Data directory: " + fentry.fullPath);
    //     fentry.getDirectory(localFileSystemName , {create:true}, doDownloadTests , fail);
    // });
    console.log("Calling writeLocal");
    writeLocal("genres3","http://barperfe.nextmp.net/flashcardsapi/api/getSubjectsfile");
    console.log("Calling readLocal");
    readLocal("genres3",testOutput);
}

function fail(error) {
    alert('We encountered a problem: ' + error.code);
}

function testOutput(returnedOutput){
    console.log("In testOutput");
    var txtArea = document.createElement('textarea');
    txtArea.value = returnedOutput;
    document.body.appendChild(txtArea);
    console.log("Read returned: " + returnedOutput);
}

function readLocal(fileName,onComplete){
    console.log("In readLocal with filename: " + fileName);
    window.resolveLocalFileSystemURL(cordova.file.applicationStorageDirectory, function(fentry){
        fentry.getDirectory(localFileSystemName,
                            null,
                            function(dirEntry){
                                dirEntry.getFile(fileName, {create: true}, doRead , fail);},
                            fail);
    });
    function doRead(fileEntry){
        console.log("Entering doRead");
        console.log("fileEntry.fullPath: " + fileEntry.fullPath);
        fileEntry.file(gotFile, fail);
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
    console.log("filename: " + fileName + " fileURL: " + fileURL);
    window.resolveLocalFileSystemURL(cordova.file.applicationStorageDirectory, function(fentry){
        fentry.getDirectory(localFileSystemName,
                            {create:true},
                            function(dirEntry){
                                dirEntry.getFile(fileName, {create: true}, doDownload , fail);},
                            fail);
    });
    function doDownload(fileEntry){
        console.log("Entering doDownload");
        console.log("fileEntry.fullPath: " + fileEntry.fullPath);
         var fileTransfer = new FileTransfer();
        fileTransfer.download(fileURL,
                              fileEntry.fullPath,
                              null,
                              function(error){
                                  alert("Download error source " + JSON.stringify(error));
                              });
    }
}
