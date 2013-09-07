var savedFilesystem;
var downloadDirectory;
var localFileSystemName;
function returnedResult(){
    this.value="default value";
}
localFileSystemName="my_downloads";

// Call this function when the app is ready, to set up the local file system for use
function onFileSystemSuccess(fileSystem) {
    savedFilesystem=fileSystem;
    fileSystem.root.getDirectory(localFileSystemName , {create:true},
                                 function(dir) {downloadDirectory = dir; },fail);

function writeLocal(filename, contents){
    //alert("hello from writeLocal");
    var localContents = contents;
    loginDetails = contents;
    savedFilesystem.root.getFile(localFileSystemName + "/" + filename, {create: true, exclusive: false},
                                 gotWriteFileEntry, fail);
    function gotWriteFileEntry(fileEntry){
        fileEntry.createWriter(gotFileWriter, fail);
    }
    function gotFileWriter(writer){
        alert("Detail: " + localContents);
        writer.write(localContents);
    }
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
