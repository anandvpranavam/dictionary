function displayData(meaningResponse) {
  const firstElement = meaningResponse[0]
  const app = document.getElementById("app")
  const mainTemplate = document.getElementById("main")
  const mainClone = mainTemplate.content.cloneNode(true)
  mainClone.querySelector("#WordDiv").innerText = "Word: " + meaningResponse[0].word



  if (meaningResponse[0].phonetics.length !== 0) {
    meaningResponse[0].phonetics.forEach((phonetic) => {
      const audioTemplate = document.getElementById("audioTemplate")
      const cloneAudioTemp = audioTemplate.content.cloneNode(true)
      cloneAudioTemp.querySelector("#phonetic").innerText = "phonetic: "+phonetic.text
      if (phonetic.audio !== 0)
        cloneAudioTemp.querySelector("#audio").src = phonetic.audio

      mainClone.appendChild(cloneAudioTemp)
    })
  }

  app.appendChild(mainClone)

  firstElement.meanings.forEach((meaning) => {
    const posTemp = document.getElementById("posTemplate")
    const clonePosTemp = posTemp.content.cloneNode(true)
    clonePosTemp.querySelector(".posHead").innerText = "parts of speech: " + meaning.partOfSpeech

    meaning.definitions.forEach((def, index) => {
      const ul = clonePosTemp.querySelector(".definitionsData")
      const liDefinitions = document.createElement("li")
      liDefinitions.innerText = def.definition
      ul.appendChild(liDefinitions)
    })
    if(meaning.synonyms && meaning.synonyms.length >0){
    clonePosTemp.querySelector(".Synonyms").innerHTML = "<b>Synonyms: </b>" + meaning.synonyms.join(", ")
    }
    app.appendChild(clonePosTemp)
  })

}

async function getMeaning(word) {
  try {

    const loadingDiv = document.getElementById("loading")
    loadingDiv.innerText = "loading..."
    const app = document.getElementById("app")
    app.innerHTML=""
    const response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    if (response.status === 200) {
      const meaningResponse = await response.json()
      displayData(meaningResponse);
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


// https://codesandbox.io/s/angry-sun-cmdb3h?file=/index.html
// https://codesandbox.io/s/amazing-dream-ui1wiz?file=/src/index.js