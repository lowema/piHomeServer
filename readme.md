Home automation server for Raspberry Pi

This aims to be the basis of a home automation and integration server with a client served up from the same application
The client lives in the /static/client directory, and an admin console will live in the /static/admin directory

This requires a local deepstream.io instance running, get this from deepstream website.
Install instructions are there.

The usual inits are required, do an NPM INSTALL in the root directory and do a BOWER INSTALL in the static directory
You need to have BOWER loaded as a global package (npm install bower --g)

once this is done you can start the server (node server)

All fiddlable settings are in the settings.js file ...