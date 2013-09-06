Run these in the project directory.

for file system:
cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git

for network connection:
cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-network-information.git

for file transfer:
cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file-transfer.git

Then copy the last part of common.js somewhere it can be accessed from the project.
Instructions are in the comments.

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
