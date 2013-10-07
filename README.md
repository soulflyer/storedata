# Store data locally

The cordova project requires some plugins. Run these in the project directory.

```
cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git

cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-network-information.git

cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file-transfer.git
```

Then copy file localfile.js into the project. Include a coresponding script statement
in index.html and call setupLocalFileSystem to set up the local file system.

common.js and index.html are provided to enable testing and to show use.
They are not needed in the project.

To try out these functions just add all the files to a new cordova project.
For real use, only localfile.js is needed.

## setupLocalFileSystem

No parameters. Call this once the device is ready. Sets up a local file system using the name found in localFileSystemName

## readLocal

takes 2 params, filename and saveTo. It will read the file from the local file system,
using the global variable savedFilesystem to build the full pathname.
saveTo must be an function NOT a simple variable (simple variables are passed by value)

ie

```
function returnedResult(){
         this.value="default value";
}
```
this is called like this:

```
readLocal("filename", returnedResult);
```

and the result can then be accessed as returnedResult.value
## mkdirLocal

takes 1 param, the directory name to be created and creates a directory in the file system created by  setupLocalFileSystem. Intermediate directories will not be created automatically so must be created one at a time.

## writeLocal

takes 2 parameters, filename and contents and writes "contents" to the file specified
by the filename appended to the path to the filesystem held in the global variable
savedfileSystem and the directory named in the global variable localFileSystemName

ie

```
writeLocal("filename", "file contents");
```

will write "file contents" into the file /path/to/savedFileSystem/localFileSystemName/filename

## networkConnected

No parameters, returns true or false
