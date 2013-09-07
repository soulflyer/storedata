// Global variable that will tell us whether PhoneGap is ready
var isPhoneGapReady = false;

// Store the current network status
var isConnected = false;

var savedFilesystem;
var downloadDirectory;
var localFileSystemName;
function returnedResult(){
    this.value="default value";
}
localFileSystemName="my_downloads";

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
    alert("isConnected:" + isConnected);

    window.requestFileSystem( LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess , null );
     alert("Filesystem request returned: " + downloadDirectory.fullPath);
    download();
    alert("Download call returned. Hit OK to read contents of file from local storage");
    returnedResult.value = "Default value";
    alert("Returnedresult.value is:" + returnedResult.value);
    readLocal("genres", returnedResult);
    alert("ReadLocal returned: " + returnedResult.value);
    writeLocal("passwd","Some random stuff");
    alert("vars: " + savedFilesystem.name + " : " + downloadDirectory.name + " : " + localFileSystemName + " : " + loginDetails) ;
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

function download() {
    var fileURL = "http://bp.wiserobot.com/flashcardsapi/api/getGenres";
    var localFileName = "genres";
    alert('Downloading ' + fileURL + " to: " + localFileName);
    downloadFile(fileURL,localFileName);
}
