// returnedResults is somewhere to store the contents of a file read from the local file system
// This is passed as a parameter to readLocal and must be a function not a simple type.
// Simple types are passed by value and the result will therefore be discarded without us ever
// seeing it.
var savedFilesystem;
var downloadDirectory;
var localFileSystemName="BPData";

function returnedResult(){
    this.value="default value";
}

window.onload = init;
function init() {
    alert("Hello");
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    // localFileSystemName="BPData";
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, null);
}

function onFileSystemSuccess(fileSystem) {
    window.resolveLocalFileSystemURL(cordova.file.applicationStorageDirectory, function(fentry){
        console.log("Data directory: " + fentry.fullPath);
        fentry.getDirectory(localFileSystemName , {create:true}, doDownloadTests , fail);
    });
}

function doDownloadTests(dirEntry){
    console.log("Filesystem request returned dirEntry: " + dirEntry.fullPath);
    var fileURL = "http://barperfe.nextmp.net/flashcardsapi/api/getSubjectsfile";
    var localFileName = "genres";
    console.log('Downloading ' + fileURL + " to: " + localFileName);
    dirEntry.getFile(localFileName, {create: true}, doDownloadFile , fail);
    dirEntry.getFile(localFileName, null , doReadFile , fail);
}

function doReadFile(fileEntry){
    fileEntry.file(gotFile, fail);
    function gotFile(gfile){
        var reader=new FileReader;
        reader.onloadend= function(evt){
            var txtArea = document.createElement('textarea');
            txtArea.value = this.result;
            document.body.appendChild(txtArea);
            console.log("Read returned: " + this.result);
        };
        reader.readAsText(gfile);
    }
}

function doDownloadFile(fileEntry){
    console.log("Entering doDownloadFile");
    console.log("fileEntry.fullPath: " + fileEntry.fullPath);
    var fileURL = "http://barperfe.nextmp.net/flashcardsapi/api/getSubjectsfile";
    var fileTransfer = new FileTransfer();
    fileTransfer.download(fileURL,
                          fileEntry.fullPath,
                          null,
                          function(error){
                              alert("Download error source " + JSON.stringify(error));
                          } );
}

function fail(error) {
    alert('We encountered a problem: ' + error.code);
}
