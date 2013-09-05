// Global variable that will tell us whether PhoneGap is ready
var isPhoneGapReady = false;

// Store the current network status
var isConnected = false;


////////////////////////////////////////////////////////////////////////////////////////////////////
// These global variables will be needed
////////////////////////////////////////////////////////////////////////////////////////////////////
var savedFilesystem;
var downloadDirectory;
var localFileSystemName;
localFileSystemName="my_downloads";
////////////////////////////////////////////////////////////////////////////////////////////////////

// Set an onload handler to call the init function
window.onload = init;


function init() {
    // Add an event listener for deviceready
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {

    isPhoneGapReady = true;
    alert('The device is now ready');

    // detect for network access
    networkDetection();
    alert("isConnected:" + isConnected);

    window.requestFileSystem( LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess , null );
    alert("Filesystem request returned: " + downloadDirectory.fullPath);
    download();
    alert("Download complete. Hit OK to read contents of file from local storage");
    readLocal("genres");
}
function networkDetection() {
    //alert("Checking for network, isPhoneGapReady:" + isPhoneGapReady);
    var connectionState = navigator.connection.type;
    //alert("connectionState:" + connectionState);
    if (isPhoneGapReady) {
        // as long as the connection type is not none,
        // the device should have Internet access
        if (navigator.connection.type != Connection.NONE) {
            isConnected = true; }
    }
}

function onFileSystemSuccess(fileSystem) {
    savedFilesystem=fileSystem;
    fileSystem.root.getDirectory(localFileSystemName , {create:true},
                                 function(dir) {downloadDirectory = dir; },fail);

}

function download() {
    var fileURL = "http://bp.wiserobot.com/flashcardsapi/api/getGenres";
    var localFileName = "genres";
    alert('Downloading ' + fileURL + " to: " + localFileName);
    downloadFile(fileURL,localFileName);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Above this comment is demo application setup. Cut and paste the middle section starting here only
// Note: You will need to set some global variables.
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function downloadFile(fileURL,localFileName){

    var fileTransfer = new FileTransfer();
    fileTransfer.download(fileURL,
                          downloadDirectory.fullPath + '/' + localFileName,
                          function(entry){
                              //alert('Download complete. File saved to: ' + entry.fullPath);
                          },

                          function(error){
                              alert("Download error source " + JSON.stringify(error));
                          } );
}

function readLocal(filename){
    savedFilesystem.root.getFile(downloadDirectory.name + "/" + filename, null, gotFileEntry, fail);
}

function gotFileEntry(fileEntry){
    fileEntry.file(gotFile, fail);
}


function fail(error) {
    alert('We encountered a problem: ' + error.code);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Below this line is just to display the returned data
////////////////////////////////////////////////////////////////////////////////////////////////////

function gotFile(file){
    var reader= new FileReader();
    //    alert("Found file: " + file.name);

    reader.onloadend = function(evt){
        alert("File: " + evt.target.result);
    };
    reader.readAsText(file);
}
