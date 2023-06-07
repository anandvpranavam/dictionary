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

async function getMeaning(word) {
  try {
    const laodingDiv = document.getElementById("loading")
    laodingDiv.innerText = "loading..."
    const response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    if (response.status === 200) {
      const meaningResponse = await response.json()
      const mainDiv = document.getElementById("mainDiv")
      mainDiv.innerHTML = "";
      const meanings = meaningResponse[0].meanings
      meanings.forEach((meaning) => {
        const ul = document.createElement("ul")
      meaning.definitions.forEach(d =>{
        const liDefinition = document.createElement("li")
        liDefinition.innerText = d.definition
        ul.appendChild(liDefinition)
        // console.log(d.definition)
      })
        mainDiv.appendChild(ul)
      })
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
