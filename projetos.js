
console.log('oi')

const projs = [
	'AguaEngine3D', 'NeonFC', 'SimpleFileTransferer', 'NeveAnalytics', 'Readify'
]

const pages = {
	// 'AguaEngine3D': document.getElementById('AguaEngine3D'),
	// 'NeonFC': document.getElementById('NeonFC'),
	// 'SimpleFileTransferer': document.getElementById('SimpleFileTransferer'),
	// 'NeveAnalytics': document.getElementById('NeveAnalytics'),
	// 'Readify': document.getElementById('Readify')
};

const programSpace = document.getElementById('programspace');

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
}

const selector = document.getElementById('selector')

for (const [key, value] of Object.entries(pages)) {
	// console.log(key, '= ->', value);
	const div = document.createElement('div');
	const div_id = `${key}-sel`
	div.innerHTML = `
		<div id=${div_id} class=selector-entry>
			<p onclick="setCurrentPage('${key}')">\>${key}</p>
		</div>
	`;
	selector.appendChild(div);
	selectors[key] = div;
}


// alert('h');

