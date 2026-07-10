const textInput = document.querySelector("#text-input");
const textOutput = document.querySelector("#text-output");
const translateBtn = document.querySelector("#translate-btn");

async function translate() {
    const text = textInput.value;
    // console.log(text);
    
  const encoded = encodeURIComponent(text);
  let url =
    "https://translate.googleapis.com/translate_a/single" +
    "?client=gtx&sl=en&tl=hi&dt=t&q=" +
    encoded;

  let response = await fetch(url);
  let data = await response.json();
  let mainPart = data[0];
  let firstLine = mainPart[0];
  let translated = firstLine[0];

  textOutput.innerText = translated;
}

translateBtn.addEventListener("click", ()=> {
  translate();
  // console.log(hi);
});
