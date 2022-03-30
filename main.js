const mainElement = document.querySelector("main");

mainElement.addEventListener("click", event => {
	if (event.target.id.startsWith("tellStory")) {
		const adjective = mainElement.querySelector("#adjective").value
		const sillyWord = mainElement.querySelector("#sillyWord").value
		const pluralNoun = mainElement.querySelector("#pluralNoun").value
		const noun = mainElement.querySelector("#noun").value

		const madlib = {
			adjective: adjective,
			sillyword: sillyWord,
			pluralnoun: pluralNoun,
			noun: noun
		}
		//set/save to sessionStorage
		setDataToStorage(madlib)
		//invoke renderStory
		renderStory()
	}
})

const getDataFromStorage = (dataKey) => {
	//use JSON.parse()
	return JSON.parse(sessionStorage.getItem(dataKey))
}

const setDataToStorage = (dataObj) => {
	//use JSON.stringify()
	sessionStorage.setItem("madlib", JSON.stringify(dataObj))
}

const clearStorage = (dataKey) => {
	sessionStorage.removeItem(dataKey);
}

const renderInputs = () => {
	clearStorage('madlib')
	// show inputs fields

	//show 'Tell Story' button

	mainElement.innerHTML = `
	<h1>Make A Madlib!</h1>
	<input name="adjective"
    	id="adjective"
    	placeholder="Add an adjective"></input>
	<input name="sillyWord"
    	id="sillyWord"
    	placeholder="Add a silly word"></input>
	<input name="pluralNoun"
    	id="pluralNoun"
    	placeholder="Add a plural noun"></input>
	<input name="noun"
    	id="noun"
    	placeholder="Add a noun"></input>
	<button id="tellStory">Make a madlib</button>
	`
}

const renderStory = () => {
	//get from sessionStorage
	const sessionPull = getDataFromStorage("madlib")
	//show the story
	const htmlRender = (obj) => {
		return `<h2>It had been a hard, ${obj.adjective} day on the ${obj.sillyWord} trail. The cowboys drove a herd of ${obj.pluralNoun} across the dry plains, kicking up ${obj.noun} along the way as they looked for somewhere to bed down.</h2>
	<button id="startOver">start over</button>`
	}

	mainElement.innerHTML = htmlRender(sessionPull)
	//show startOver button
	//startOver will invoke renderInputs()
}

mainElement.addEventListener("click", event => {
	if (event.target.id.startsWith("startOver")) {
		renderInputs()
	}})


renderInputs();
