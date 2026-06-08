
console.log('oi')

const pages = {
	'AguaEngine3D': document.getElementById('a'),
	'NeonFC': document.getElementById('b'),
	'SimpleFileTransferer': document.getElementById('c'),
	'NeveAnalytics': document.getElementById('d'),
	'Readify': document.getElementById('e')
};
const selectors = {};

var current = null;
var currentSelector = null;

function setCurrentPage(index) {
	if (pages[index] == null) {
		console.warn(`PAGINA ${index} NAO EXISTE`);
		return;
	} 
	if (current != null) {
		current.style.visibility = 'hidden';
		currentSelector.classList.remove("selected");
	}
	current = pages[index];
	console.debug(pages);
	current.style.visibility = 'visible';
	currentSelector = selectors[index];
	currentSelector.classList.add("selected");
	console.debug('D=',selectors[index]);
}

setCurrentPage('a');

const selector = document.getElementById('selector')

for (const [key, value] of Object.entries(pages)) {
	console.log(key, '= ->', value);
	const div = document.createElement('div');
	const div_id = `${key}-sel`
	div.innerHTML = `
		<div id=${div_id}>
			<p onclick="setCurrentPage('${key}')">\> ${key}</p>
		</div>
	`;
	selector.appendChild(div);
	selectors[key] = div;
}


// alert('h');

