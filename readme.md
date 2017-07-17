Home automation server for Raspberry Pi

This aims to be the basis of a home automation and integration server with a client served up from the same application
The client lives in the /static/client directory, and an admin console will live in the /static/admin directory

The usual inits are required, do an NPM INSTALL in the root directory and do a BOWER INSTALL in the static directory
You need to have BOWER loaded as a global package (npm install bower --g)

All fiddlable settings are in the settings.js file ...
You can prime the rooms and feeds with the test.js file, just run it and it will make sure everything is fine

once this is done you can start the server (node server)
I will do a setup thingy once things are a bit more stable