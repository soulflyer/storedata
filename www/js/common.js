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
var loginDetails;
function returnedResult(){
    this.value="default value";
}


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
    // alert('The device is now ready');

    // detect for network access
    networkDetection();
    // alert("isConnected:" + isConnected);

    window.requestFileSystem( LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess , null );
    // alert("Filesystem request returned: " + downloadDirectory.fullPath);
    download();
    alert("Download call returned. Hit OK to read contents of file from local storage");
    returnedResult.value = "Default value";
    alert("Returnedresult.value is:" + returnedResult.value);
    readLocal("genres", returnedResult);
    alert("ReadLocal returned: " + returnedResult.value);
    writeLocal("passwd","Some random stuff");
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
// Above this comment is demo application setup. Cut and paste the following section starting here.
// Note: You will need to set some global variables.
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function writeLocal(filename, contents){
    //alert("hello from writeLocal");
    loginDetails = contents;
    savedFilesystem.root.getFile(localFileSystemName + "/" + filename, {create: true, exclusive: false},
                                 gotWriteFileEntry, fail);

}

function gotWriteFileEntry(fileEntry){
    fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer){
    alert("Detail: " + loginDetails);
    writer.write(loginDetails);
}

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

function readLocal(filename,variableName){
    var localVariableName =variableName;
    savedFilesystem.root.getFile(downloadDirectory.name + "/" + filename, null, gotFileEntry, fail);
    function gotFileEntry(fileEntry) {
        localVariableName.value="yet more crap";
        fileEntry.file(gotFile, fail);
    };
    function gotFile(file){
        var reader=new FileReader();
        reader.onloadend = function(evt){
            alert("File: " + evt.target.result );
            localVariableName.value = evt.target.result;
        };
        reader.readAsText(file);
    };
}

function fail(error) {
    alert('We encountered a problem: ' + error.code);
}
