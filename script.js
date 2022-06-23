chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.from == "background"){
		const word = request.word;
		const data = request.message;
		console.log(word)
		console.log(data)

		if (data['title']){
			render(word, data['title'])
		} else{
			display(word, data)
		}
		
	}
});


function render(word, defintion){
	document.getElementById('word-el').textContent = word
	document.getElementById('definition-el').style = "display: true"
	document.getElementById('definition-el').textContent = defintion
}

function display(word, data){
	const meanings = data[0]['meanings'][0] //partOfSpeech = noun
	const defintions = meanings['definitions']
	let antonyms = document.getElementById('antonyms')
	let synonyms = document.getElementById('synonyms')
	let definitions_div = document.getElementById('definitions')
	let audioEl = document.getElementById('audio-el')

	antonyms.textContent = " ";
	synonyms.textContent = " ";
	definitions_div.innerHTML = " ";
	audioEl.controls = false;
	audioEl.src = "";
	document.getElementById('word-el').textContent = " ";
	document.getElementById('word-el').textContent = word
	document.getElementById('definition-el').style = "display: none"

	if (data[0]['phonetics'].length){
		document.getElementById('pronunciation-el').textContent = data[0]['phonetics'][0]['text'] || '';
		audioEl.controls = data[0]['phonetics'][0]['audio'] && true
		audioEl.src = data[0]['phonetics'][0]['audio'] || '';
	}

	//set synonyms
	if (meanings['synonyms'].length){
		for (let i = 0; i < meanings['synonyms'].length; i++) {
			synonyms.textContent += `${meanings['synonyms'][i]}${meanings['synonyms'][i+1] ? '/' : ' '}`;
		}
	}
	//set antonyms
	if (meanings['antonyms'].length){
		for (let i = 0; i < meanings['antonyms'].length; i++) {
			antonyms.textContent += `${meanings['antonyms'][i]}${meanings['antonyms'][i+1] ? '/' : ' '}`;
		}
	}

	//set definitions
	if (meanings['definitions'].length){
		for (let i = 0; i < meanings['definitions'].length; i++) {
			let definition = meanings['definitions'][i]['definition'] //defintions
			definitions_div.innerHTML += `<p>${i+1} ${definition}</p>`
			// let example = meanings['definitions'][i]['example'] || ''
		}
	}
}