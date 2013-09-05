// Global variable that will tell us whether PhoneGap is ready
var isPhoneGapReady = false;

// Store the current network status
var isConnected = false;

var savedFilesystem;
var downloadDirectory;
var fileObject;

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
    readLocal("genres");
}
function networkDetection() {
    //alert("Checking for network, isPhoneGapReady:" + isPhoneGapReady);
    var connectionState = navigator.connection.type;
    //alert("connectionState:" + connectionState);
    if (isPhoneGapReady) {
        //alert("Checking... type:" + navigator.connection.type + "Connection:NONE: " + Connection.NONE);
        // as long as the connection type is not none,
        // the device should have Internet access
        if (navigator.connection.type != Connection.NONE) {
            isConnected = true; }
       // alert("Checked" + isConnected);
    }
}

function onFileSystemSuccess(fileSystem) {
    savedFilesystem=fileSystem;
    fileSystem.root.getDirectory('my_downloads' , {create:true},
                                 function(dir) {downloadDirectory = dir; },fail);

}

function download() {
    alert("download started");
    var fileURL = "http://bp.wiserobot.com/flashcardsapi/api/getGenres";
    var localFileName = "genres";
    alert('Downloading ' + fileURL + " to: " + localFileName);
    var fileTransfer = new FileTransfer();
    fileTransfer.download(fileURL,
                          downloadDirectory.fullPath + '/' + localFileName,
                          function(entry){
                              alert('Download complete. File saved to: ' + entry.fullPath); },
                          function(error){
                              alert("Download error source " + JSON.stringify(error));
                          } );
}

function readLocal(filename){
    alert("Starting to read " + downloadDirectory.name + "/" + filename + " from: " + savedFilesystem.root.name);
    savedFilesystem.root.getFile(downloadDirectory.name + "/" + filename, null, gotFileEntry, fail);
}

function gotFileEntry(fileEntry){
    alert("Found fileentry");
    fileEntry.file(gotFile, fail);
}

function gotFile(file){
    var reader= new FileReader();
    alert("Found file: " + file.name);

    reader.onloadend = function(evt){
        alert("File: " + evt.target.result);
    };
    reader.readAsText(file);
}

function fail(error) {
    alert('We encountered a problem: ' + error.code);
}
// Set an onload handler to call the init function
window.onload = init;
