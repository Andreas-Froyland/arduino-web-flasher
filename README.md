# Arduino Web Flasher

Arduino Web Flasher is a tool for flashing arduino boards with a binary file through the browser.

I made the tool to enable uploading of sketches to the arduino a much simpler process for clients and users. By uploading the binary directly, users don't need to download Arduino IDE, make sure they have the correct libraries installed, compile to the correct board with the correct settings etc...

The flasher requires a hex/binary file to flash the board, and can not take .ino files directly.   
To generate the binary file from Arduino IDE, please check out this [link](https://randomnerdtutorials.com/bin-binary-files-sketch-arduino-ide/)

## Built on

This project was built on the wonderful React demo in [avrgirl-arduino](https://github.com/noopkat/avrgirl-arduino)

It runs on React, and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  
Most of the functionality is contained within `/src/App.js`.

It utilizes tailwindcss for styling

## How to run

The fastest way is to check out the link: 

If you want to run it by yourself, git clone this repository and run the app locally.

1. Install NodeJS
2. In your terminal, run `git clone https://github.com/andreasNordstrand/arduino-web-flasher`
3. Run `cd arduino-web-flasher`
4. Run `npm install`
5. Run `npm start`. Open `http://localhost:3000` in Chrome to play with the app.

## Notes

I have only tested the web flasher with the Arduino Nano, so I can only confirm that it works for that board. If you have any of the other boards listed, and it works for you, please make a pull request verifying the boards

This was my first React project, so if you see anything that could be improved in the code, make a PR:)

## Thanks to

Thanks to Noopkat for the wonderful [avrgirl-arduino](https://github.com/noopkat/avrgirl-arduino) project!
