const display =  (word, data) => {
	
	const { meanings } = data //partOfSpeech = noun
	const definitions = meanings[0]['definitions']
	const synonyms = meanings[0]['synonyms'] || []
	const antonyms = meanings[0]['antonyms'] || []
	const { phonetics } = data || []
	
	let antonymsEl = document.getElementById('antonyms')
	let synonymsEl = document.getElementById('synonyms')
	let definitions_div = document.getElementById('definitions')
	let audioEl = document.getElementById('audio-el')
	let wordEl = document.getElementById('word-el')

	wordEl.textContent = word
	antonymsEl.textContent = " ";
	synonymsEl.textContent = " ";
	definitions_div.innerHTML = " ";

	//set audio
	if (phonetics.length){
		document.getElementById('pronunciation-el').textContent = phonetics[0]['text'] || '';
		audioEl.controls = phonetics[0]['audio'] && true
		audioEl.src = phonetics[0]['audio'] || '';
	}

	//set synonyms
	if (synonyms.length){
		for (let i = 0; i < synonyms.length; i++) {
			synonymsEl.textContent += `${synonyms[i]}${synonyms[i+1] ? '/' : ' '}`;
		}
	}
	//set antonyms
	if (antonyms.length){
		for (let i = 0; i <antonyms.length; i++) {
			antonymsEl.textContent += `${antonyms[i]}${antonyms[i+1] ? '/' : ' '}`;
		}
	}

	//set definitions
	if (definitions.length){
		for (let i = 0; i < definitions.length; i++) {
			let definition = definitions[i]['definition'] //defintions
			definitions_div.innerHTML += `<p>${i+1} - ${definition}</p>`
			// let example = meanings['definitions'][i]['example'] || ''
		}
	}
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

	if (request.from == "background"){
		const { word } = request;
		const data = request.message;
		// console.log(word)
		// console.log(data)
		const audioEl = document.getElementById('audio-el')
		audioEl.controls = false;
		audioEl.src = "";

		if (data['title']){
			document.getElementById('word-el').textContent = word
			document.getElementById('definitions').innerHTML = `<p>${data['title']}</p>`
		} else{
			display(word, data[0])
		}
	}
});