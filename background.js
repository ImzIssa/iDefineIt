chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.from == "content"){
		const { word } = request
		// console.log(sender.tab ? `from a content script: ${sender.tab.url}` : "from a extension script")
		fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
		.then(res => res.json())
		.then(data => {
			chrome.runtime.sendMessage({message: data, from: "background", word: word});
			return true;
		});
	}
})