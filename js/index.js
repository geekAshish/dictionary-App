const meaningMarkUp = document.querySelector('#meanings');
const metaData = document.querySelector(".meta-data");
const input = document.getElementById("inputWord");
const btn = document.querySelector("#btn");


const getDictionaryData = async function (input) {
    try {
        meaningMarkUp.innerHTML = ""
    metaData.innerHTML = ""
    let res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
    let data = await res.json()
    let dicData = [...data][0];
    console.log(dicData);


    // creating word
    let wordMarkUp = `
        <h1 class="word">${dicData.word}</h1>
        <div class="flex">
            <span class="pronouns">Pronunciation: ${dicData.phonetics[0].text}</span>
            <audio class="pronouns-audio" controls src="${dicData.phonetics[0].audio}">
        </div>
    `
    metaData.insertAdjacentHTML('afterbegin', wordMarkUp)





    // creating meanign html
    let {meanings} = dicData;
    meanings.forEach(e => {
        //geting PartOfSpeech
        let htmlPos = `
            <div class="partOfSpeech">
                <h1>${e.partOfSpeech}</h1>
                ${//geting Definition
                    e.definitions.map((def) => {
                        return `<p class="definition h-p">${def.definition}</p>`;
                    }).join("")
                }
                
                <div class="synonyms--container one-padding">${e.synonyms.length !== 0 ? `<span class="synonyms">Synonyms: </span> <span>${e.synonyms}</span>` : ""}
                </div>

                <div class="antonyms--container one-padding">${e.antonyms.length !== 0 ? `<span class="antonyms">Antonyms: </span> <span>${e.antonyms}</span>` : ""}
                </div>

            </div>
            
        `;
        meaningMarkUp.insertAdjacentHTML("afterbegin", htmlPos)
    });
    } catch(err) {
        console.log(err);
    }
    
}


btn.addEventListener("click", (e) => {
    e.preventDefault();
    let inputValue = input.value
    console.log("click", inputValue);
    getDictionaryData(inputValue)
})
