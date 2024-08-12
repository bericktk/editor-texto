// let output = document.querySelector('#output')
let buttons = document.querySelectorAll('.tool--btn')

for (let btn of buttons) {
    btn.addEventListener('click', () => {
        let cmd = btn.dataset['command']
        if (cmd === 'createlink') {
            let url = prompt("Enter the link here: ", "http:\/\/")
            document.execCommand(cmd, false, url)
        } else {
            document.execCommand(cmd, false, null)
        }
    })
}

function formatDoc(cmd, value=null) {
	if(value) {
		document.execCommand(cmd, false, value);
	} else {
		document.execCommand(cmd);
	}
}

function addLink() {
	const url = prompt('Insert url');
	formatDoc('createLink', url);
}

const content = document.querySelector('#content');

content.addEventListener('mouseenter', function () {
	const a = content.querySelectorAll('a');
	a.forEach(item=> {
		item.addEventListener('mouseenter', function () {
			content.setAttribute('contenteditable', false);
			item.target = '_blank';
		})
		item.addEventListener('mouseleave', function () {
			content.setAttribute('contenteditable', true);
		})
	})
})

const filename = document.getElementById('filename');

function fileHandle(value) {
	if(value === 'new') {
		content.innerHTML = '';
		filename.value = 'sem titulo';
	} else if(value === 'txt') {
		const blob = new Blob([content.innerText])
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a');
		link.href = url;
		link.download = `${filename.value}.txt`;
		link.click();
	} else if(value === 'pdf') {
		html2pdf(content).save(filename.value);
	}
}
