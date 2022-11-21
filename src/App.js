import React, { useState, useRef, useEffect } from "react";
import AvrgirlArduino from "avrgirl-arduino";

function App() {
  const boardChoices = [{ name: "Arduino nano", value: "nano" }];

  const fileInput = useRef(null);
  const [board, updateBoard] = useState(boardChoices[0]);
  const [fileName, updateFileName] = useState("");
  const [uploadStatus, updateUploadStatus] = useState("");
  const [uploadStatusTitle, updateUploadStatusTitle] = useState("");
  const [uploadStatusMsg, updateUploadStatusMsg] = useState("");
  const [browserSupported, updateBrowserSupported] = useState(true);


  useEffect(() => {
    updateBrowserSupported('serial' in navigator);
  }, [])



  const handleSubmit = e => {
    e.preventDefault();
    updateUploadStatus("flashing");
    updateUploadStatusTitle("Flashing Arduino...");


    const reader = new FileReader();
    console.log(fileInput.current.files[0])
    reader.readAsArrayBuffer(fileInput.current.files[0]);

    reader.onload = event => {
      const filecontents = event.target.result;

      const avrgirl = new AvrgirlArduino({
        board: board.value,
        debug: true
      });

      avrgirl.flash(filecontents, error => {
        if (error) {
          console.log(error.message);
          console.log(typeof error)
          updateUploadStatus("error");
          updateUploadStatusTitle("Error Flashing Arduino!");
          updateUploadStatusMsg(error.message)

        } else {
          console.info("flash successful");
          updateUploadStatus("done");
          updateUploadStatusTitle("Flash Sucessful!");
          updateUploadStatusMsg("Successfully flashed the Arduino!");
        }
      });
    };
  };

  const clearStatus = () => {
    updateUploadStatus("");
    updateUploadStatusTitle("");
    updateUploadStatusMsg("")
  }

  const clearFileInput = () => {
    updateFileName("");
    if(fileInput) fileInput.current.value = null;
  }

  const BoardOptions = boardChoices.map((board, i) => <option value={board.value} key={i}>{board.name}</option>)


  return (
    <div className="w-full h-screen bg-gray-900">
      {!browserSupported && <div className="w-screen h-screen bg-opacity-90 fixed bg-gray-900 z-20 flex flex-col gap-2 justify-center items-center text-white text-lg text-center">
        <h2 className="text-white text-4xl mb-6 font-bold">Browser is not supported😥</h2>
          <p>Sorry, <b>Web Serial</b> is not supported on this browser.</p>
          <p>If you are on computer, please use Chrome or Opera</p>
					<p >If you are using Chrome, please make sure you're running Chrome 78 or later <br/> and have enabled the
					<code>#enable-experimental-web-platform-features</code> flag in
					<code>chrome://flags</code>.</p>
					<p> Mobile browsers are also not supported, check <a className="underline text-blue-400" href="https://caniuse.com/web-serial">Can I Use WebSerial</a> for compatibility.</p> 
          <br/>
          <p> Check out the <a className="underline text-blue-400" href="https://github.com/andreasNordstrand/arduino-web-flasher"> GitHub repo</a> for more information.</p> 

      </div>}
      {uploadStatus && <div className="w-screen h-screen bg-opacity-90 fixed bg-gray-900 z-20 flex flex-col justify-center items-center">
        {uploadStatus === 'flashing' && <span className="loader"></span>}
        {uploadStatus === 'done' && <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-14 h-14 text-green-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        </span>}
        <h2 className="text-white text-2xl mt-6">{uploadStatusTitle}</h2>
        <p className="text-white mt-2 w-1/2 text-center">{uploadStatusMsg}</p>
        {uploadStatusMsg && <button className="bg-cyan-500 py-1.5 px-4 hover:bg-cyan-600 rounded-md text-white mt-6" onClick={clearStatus}>Close</button>}
      </div>}
      <form id="uploadForm" onSubmit={handleSubmit} className="flex flex-col w-4/5 sm:md-2/3 md:w-1/3 lg:w-1/4 m-auto h-full justify-center items-center">
        <h1 className="text-center text-white text-4xl ">Arduino Web Flasher</h1>
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-row justify-center items-center w-full mt-16">
            <label htmlFor="dropzone-file" className={fileName ? 'hidden' : "relative p-4 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"} >
              <div className=" flex flex-col justify-center items-center pt-5 pb-6">
                <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Only .hex or .bin files</p>
              </div>
              <input id="dropzone-file"
                ref={fileInput}
                type="file"
                className="hidden"
                onChange={() =>
                  updateFileName(fileInput.current.files[0].name)
                }
                onClick={() => fileInput.current.click()}
              />
            </label>
            {fileName &&
            <div className="w-2/3 h-10 flex flex-row justify-between bg-gray-700 text-white m-2 rounded-md items-center">
              <div className="ml-3">{fileName}</div>
              <button type="button" onClick={clearFileInput} className="px-2 border-l border-gray-500 h-full hover:bg-gray-500 rounded-r-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          }
          </div>
        </div>
        <span className="text-gray-500 text-center w-1/2 text-xs mt-1">Wondering how to get hex/bin files from the sketch? <a className="underline" href="https://randomnerdtutorials.com/bin-binary-files-sketch-arduino-ide/">Click here</a></span>
        <div className="w-2/3 ">
          <label htmlFor="board-select" className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
          <select
            id="boardType"
            className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg hover:border-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={board}
            onChange={event => updateBoard(event.target.value)}
          >
            {BoardOptions}
          </select>
        </div>
        <button disabled={!fileName} type="submit" className="mt-4 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 disabled:bg-gradient-to-br disabled:from-gray-500 disabled:to-gray-600 disabled:text-gray-500">
          <span className="relative px-8 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Upload to Arduino
          </span>
        </button>
      </form>
      <footer className="absolute bottom-2 text-white left-1/2 transform -translate-x-1/2 flex flex-col text-xs justify-center text-center">
        <span className="p-2">Built on <a className="underline text-blue-400" href="https://github.com/noopkat/avrgirl-arduino">avrgirl-arduino</a></span>
        <span>Any issues? Please report them <a className="underline text-blue-400" href="https://github.com/andreasNordstrand/arduino-web-flasher">here</a></span>
      </footer>
    </div>
  );
}

export default App;
