document.addEventListener('mouseup', (event)=>{
	let text = window.getSelection().toString(); 
	if (text.length){
		console.log(text);
		chrome.runtime.sendMessage({message: text, from:"content"});
	}
})
