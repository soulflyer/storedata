var localFileSystemName="Documents";

window.onload = init;
function init() {
    // Alert here causes the app to wait so that the safari console can be started to
    // observe the console.log messages.
    alert("Hello");
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
    writeLocal("genres3","http://barperfe.nextmp.net/flashcardsapi/api/getSubjectsfile");
    // Note that the first call to readLocal will fail because it completes before writeLocal.
    // Just run it twice....
    readLocal("genres3",testOutput);
}

function testOutput(returnedOutput){
    var txtArea = document.createElement('textarea');
    txtArea.value = returnedOutput;
    document.body.appendChild(txtArea);
    console.log("Read returned: " + returnedOutput);
}
