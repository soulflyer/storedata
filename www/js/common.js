// returnedResults is somewhere to store the contents of a file read from the local file system
// This is passed as a parameter to readLocal and must be a function not a simple type.
// Simple types are passed by value and the result will therefore be discarded without us ever
// seeing it.

function returnedResult(){
    this.value="default value";
}


window.onload = init;
function init() {
    // Add an event listener for deviceready
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {

    alert("networkConnected: " + networkConnected());

    localFileSystemName="BPData";

    window.requestFileSystem( LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess , null );
     alert("Filesystem request returned: " + downloadDirectory.fullPath);
    download();
    alert("Download call returned. Hit OK to read contents of file from local storage");
    readLocal("genres", returnedResult);
    alert("ReadLocal returned: " + returnedResult.value);

    writeLocal("passwd","Some random stuff");
    readLocal("passwd", returnedResult);
    alert("readLocal returned: " + returnedResult.value);
}

function download() {
    var fileURL = "http://bp.wiserobot.com/flashcardsapi/api/getGenres";
    var localFileName = "genres";
    alert('Downloading ' + fileURL + " to: " + localFileName);
    downloadFile(fileURL,localFileName);
}
ariabl
