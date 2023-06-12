// console.log("hello")
// function getMeaning(word){
// fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+ word)
//   .then((response) => {
//     if (response.status === 200) {
//       return response.json()
//     } else {
//       throw new error("failed to load")
//     }
//   })
//   .then((meaningResponse) => {
//     const mainDiv = document.getElementById("mainDiv")
//     mainDiv.innerHTML = ""
//     const wordMeanings = meaningResponse[0].meanings
//     response.forEeach((meaning) => {
//       const subDiv = document.createElement("div")
//       subDiv.innerText = meaning.definitions[0].definition
//       console.log(subDiv)
//       mainDiv.appendChild(subDiv)
//     })
//   })
//   .catch((error) => error)
// }


function displayData(meaningResponse){
  const firstElement = meaningResponse[0]
  const mainDiv = document.getElementById("mainDiv")
  mainDiv.innerHTML = "";
  const wordDiv = document.createElement("div")
  wordDiv.id="WordDiv";
  wordDiv.innerText= "Word : "+firstElement.word
  mainDiv.appendChild(wordDiv)

  if(firstElement.phonetics){
    firstElement.phonetics.forEach((ph)=>{
      const textDiv = document.createElement("div")
      textDiv.innerText = ph.text
      mainDiv.appendChild(textDiv)
      const audio = document.createElement("audio")
      audio.setAttribute("controls", "")
      const source = document.createElement("source")
      source.id = "audio"
      source.src = ph.audio
      source.type = "audio/mpeg"
      audio.appendChild(source)
      mainDiv.appendChild(audio)
    })
  }





  // if(firstElement.phonetics){
  //   firstElement.phonetics.forEach((ph)=>{
  //     const template = document.getElementById("audioTemplate")
  //     const clone = template.content.cloneNode(true)
  //     const phonetic = clone.querySelector("#phonetic")
  //     phonetic.innerText = ph.text
  //     const audio = clone.querySelector("#audio")
  //     audio.src = ph.audio
  //     mainDiv.appendChild(clone)
  //   })
  // }




  const meanings = document.createElement("div")
  meanings.id="Meanings"
  meanings.innerText = "Meanings"
  mainDiv.appendChild(meanings)
  firstElement.meanings.forEach((meaning, index)=>{
    const pos = document.createElement("div")
    pos.id="pos"+index;
    meanings.appendChild(pos)
    const posHeading = document.createElement("h2")
    posHeading.innerText= "parts of speech: "+ meaning.partOfSpeech
    console.log(meaning.partOfSpeech)
    pos.appendChild(posHeading)
    const definitionHeading = document.createElement("div")
    definitionHeading.id = "Definitions"+index
    definitionHeading.innerText= "Definitions"
    pos.appendChild(definitionHeading)
    const ul = document.createElement("ul")
    ul.id = "definitionsData"+index
    pos.appendChild(ul)
    meaning.definitions.forEach((d)=>{
      const liDefinitions = document.createElement("li")
      liDefinitions.innerText = d.definition
      ul.appendChild(liDefinitions)
    })
    const synonyms = document.createElement("div")
    synonyms.id="Synonyms"+index
    synonyms.innerText = "Synonyms: "+ meaning.synonyms
    pos.appendChild(synonyms)
  })



}
async function getMeaning(word) {
  try {
    const loadingDiv = document.getElementById("loading")
    loadingDiv.innerText = "loading..."
    const response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    if (response.status === 200) {
      const meaningResponse = await response.json()
       displayData(meaningResponse);













      // const meanings = meaningResponse[0].meanings
      // meanings.forEach((meaning) => {
      //   const posDiv = document.createElement("div")
      //   posDiv.innerText = meaning.partOfSpeech
      //   console.log(posDiv)
      //   mainDiv.appendChild(posDiv)
      //   const ul = document.createElement("ul")
      //   meaning.definitions.forEach(d => {
      //     const liDefinition = document.createElement("li")
      //     liDefinition.innerText = d.definition
      //     ul.appendChild(liDefinition)
      //     // console.log(d.definition)
      //   })


      //   mainDiv.appendChild(ul)
      // })
    } else {
      throw new Error("failed")
    }
  } catch (error) {
    console.log("Ividuthe error", error)
  } finally {
    console.log("this will execute anyways")
    const loadingDiv = document.getElementById("loading")
    loadingDiv.innerText = "";
  }
}

function handleSubmit(event) {
  event.preventDefault()
  const input = document.getElementById("input")
  getMeaning(input.value)
}

const form = document.getElementById("myForm")
form.addEventListener("submit", handleSubmit)





// console.log("hello", input)

// https://codesandbox.io/s/angry-sun-cmdb3h?file=/index.html
// https://codesandbox.io/s/amazing-dream-ui1wiz?file=/src/index.js