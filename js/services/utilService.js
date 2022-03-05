export const utilService = {
	makeId,
	makeExtId,
	formatTime,
	getRandomInt,
	getRandomColor,
	getNumAsCurrency,
	resetLocalStorage,
	save: saveToStorage,
	load: loadFromStorage,
}

function makeId(startSymb = '', length = 9) {
	let text = startSymb
	const possible = '0123456789'
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

function makeExtId(length = 9) {
	let text = ''
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min)
}

function getRandomColor() {
	const letters = '0123456789ABCDEF'
	let color = '#'
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

function getNumAsCurrency(num, name) {
	return num.toLocaleString(navigator.language, { style: 'currency', currency: name })
}

function resetLocalStorage() {
	localStorage.clear()
	window.location.reload()
}

function formatTime(time, opts) {
	return new Intl.DateTimeFormat('default', opts).format(time)
}

function saveToStorage(key, val) {
	localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
	return JSON.parse(localStorage.getItem(key))
}

Array.prototype.autoSortObj = function (objKey, sortType, isAsc) {
	// params:
	// objKey = the key that holds the value to sort by
	// sortType = the type of value expected to be in the specified key
	// isAsc = the order to sort the elements by, 1 = ascending, -1 = descending
	const sortDir = isAsc ? 1 : -1
	if (typeof sortType === 'string') {
		console.log(objKey)
		console.log(sortType)
		console.log(this[0][objKey])
		return this.sort(
			(a, b) => (a[objKey].toUpperCase().localeCompare(b[objKey].toUpperCase())) * sortDir
		)
	}
	else if (typeof sortType === 'number') return this.sort((a, b) => (a[objKey] - b[objKey]) * sortDir)
}

Array.prototype.formatAsString = function () {
	let joinSymb = ', '
	if (this.length === 1) joinSymb = ''
	return this.join(joinSymb)
}