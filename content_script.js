document.addEventListener('mouseup', (event) => {
	let selectedText = window.getSelection().toString(); 
	if (selectedText.length){
		// console.log(selectedText);
		chrome.runtime.sendMessage({word: selectedText, from:"content"});
	}
})
