# Store data locally

The cordova project requires some plugins. Run these in the project directory.

```
cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git

cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file-transfer.git
```

Then copy file storedata.js into the project. Include a coresponding script statement
in index.html.

common.js and index.html are provided to enable testing and to show use.
They are not needed in the project.

To try out these functions just add all the files to a new cordova project.
For real use, only localfile.js is needed.

## readLocal

takes 2 params, filename and onComplete(). It will read the file from the local file system
and run onComplete() when the read finishes.

## writeLocal

takes 2 parameters, filename and contents and writes "contents" to the file specified
by the filename appended to the path to the apps filesystem.

By default both of these will look in the Documents directory of the app's filespace.
This can be changed by altering the contents of var localFileSystemName.
