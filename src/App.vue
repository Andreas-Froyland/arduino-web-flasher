<template>
  <div class="w-full h-screen bg-gray-900">
    <div class="flex flex-col w-1/4 m-auto h-full justify-center items-center gap-4">
      <div class="flex justify-center items-center w-full">
        <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col justify-center items-center pt-5 pb-6">
                <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Only .hex or .bin files</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" @change="fileChange"/>
        </label>
    </div> 
    <div class="w-2/3">
      <label for="board-select" class="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
      <select v-for="board in boards" v-model="selectedBoard" id="board-select" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Choose a board</option>
        <option :value="board.value">{{board.name}}</option>
      </select>
    </div>
    <button :disabled="!selectedFile" @click="connectToArduino" class="mt-4 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
      <span class="relative px-8 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Upload to Arduino
      </span>
    </button>
  </div>
  </div>

</template>


<script>

// import AvrgirlArduino from "./avrgirl-arduino";

const AvrgirlArduino = require("avrgirl-arduino")

export default {
  data() {
    return {
      boards: [{name: "Arduino nano", value: "nano"}],
      selectedBoard: "",
      selectedFile: undefined,
    }
  },

  methods: {
    fileChange(event){
      console.log(event)
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile)
    },

    connectToArduino() {

      const reader = new FileReader();

      console.log(this.selectedFile)

      reader.readAsArrayBuffer(this.selectedFile);

      reader.onload = event => {
        const filecontents = event.target.result;

        console.log(filecontents)

        console.log(this.selectedBoard)

        const avrgirl = new AvrgirlArduino({
          board: this.selectedBoard,
          debug: true,
        });

        avrgirl.flash(filecontents, error => {
          if (error) {
            console.error(error);
          } else {
            console.info("flash successful");
          }
        });
      };
    }
  },
};

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
