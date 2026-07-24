
console.log('oi')

const projs = [
	'AguaEngine3D', 'NeonFC', 'SimpleFileTransferer', 'NeveAnalytics', 'Readify', 'BlogInterpreter', 'Telecom'
]

const pages = {};
const icon_divs = {};

const programSpace = document.getElementById('programspace');
const projectWindowElement = document.getElementById('projects');

for (var index in projs) {
	const proj = projs[index];
	const elem = document.createElement('iframe');
	elem.id = proj;
	elem.classList.add("subcon");
	elem.setAttribute("src", `./projetos/${proj}.html`);
	pages[proj] = elem;
	programSpace.appendChild(elem);
}

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
	current.style.visibility = 'visible';
	currentSelector = selectors[index];
	
	currentSelector.classList.add("selected");
	document.getElementById('titletext').innerHTML = `\<b\>${index}.exe\<b\\\>`;

	projectWindowElement.style.animation = 'none';
	projectWindowElement.offsetHeight;
	projectWindowElement.style.animation = 'projs-winopen 1.5s forwards';
}

const selector = document.getElementById('selector')

var i = 1;
for (const [key, value] of Object.entries(pages)) {
	const div = document.createElement('div');
	const div_id = `${key}-sel`;
	const name_abbrev = key.matchAll(/[A-Za-z1-9]{0,6}[^A-Z1-9]*/g).toArray().join('<br>');
	
	div.innerHTML = `
		<div id=${div_id} onclick="setCurrentPage('${key}')" class=selector-entry class = "selector-entry"
		style = "grid-column: ${i % 3 + 1}; grid-row: ${Math.floor(i / 3) + 1};">
			<img src = "projetos\\${key}.png" width = 50 height = 50 alt = "icone ${key}">
			<p>${name_abbrev}</p>
		</div>
	`;
	selector.appendChild(div);
	selectors[key] = div;
	i++;
}


// alert('h');

