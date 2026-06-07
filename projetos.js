
console.log('oi')

const pages = {
	'a': document.getElementById('a'),
	'b': document.getElementById('b'),
	'c': document.getElementById('c')
};

var current = null;

function setCurrentPage(index) {
	if (pages[index] == null) {
		console.warn(`PAGINA ${index} NAO EXISTE`);
		return 0;
	} 
	if (current != null) {
		current.style.visibility = 'hidden';
	}
	current = pages[index];
	console.debug(pages);
	current.style.visibility = 'visible';
}

setCurrentPage('a');

const selector = document.getElementById('selector')

for (const [key, value] of Object.entries(pages)) {
	console.log(key, '= ->', value);
	const div = document.createElement('div');
	div.innerHTML = `
		<div>
			<p onclick="setCurrentPage('${key}')">${key}</p>
		</div>
	`;
	selector.appendChild(div);
}


// alert('h');

