Run these in the project directory.

for file system:
cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git

for network connection:
cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-network-information.git

for file transfer:
cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file-transfer.git

Then copy file localfile.js into the project. Include a coresponding <script> statement
in index.html and call onFileSystemSuccess as a callback from onDeviceReady to set up the
local file system.


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

## writeLocal

takes 2 parameters, filename and contents and writes "contents" to the file specified
by the filename appended to the path to the filesystem held in the global variable
savedfileSystem and the directory named in the global variable localFileSystemName

ie

```
writeLocal("filename", "file contents");
```

will write "file contents" into the file /path/to/savedFileSystem/localFileSystemName/filename
