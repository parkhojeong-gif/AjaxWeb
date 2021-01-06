/**
 * showPage2
 */

function showPage() {
	let doc = xhtp.responseXML;
	let data = doc.getElementsByTagName('record');
	console.log(data);

	let tableTag = document.createElement('table');
	tableTag.setAttribute('border', '1');
	tableTag.setAttribute('id', 'tbl');


	//title tr
	//data tr => [배열]
	let headerTr = titleRow(data);
	let dataTrs = contentRow(data);
	tableTag.appendChild(headerTr);
	for (let i = 0; i < dataTrs.length; i++) {
		tableTag.appendChild(addBtn(dataTrs[i], delFunc));
	}
	document.getElementById('show').appendChild(tableTag);

}
function delFunc() {
	console.log(this);
	this.parentNode.parentNode.remove();
	console.log(this.parentNode.parentNode.remove());
	let id = this.parentNode.parentNode.childNodes[0].firstChild.nodeValue;
	let req = new XMLHttpRequest();
	req.open('get', '../DeleteEmp?empId=' + id);
	req.send();
	req.onload = function() {
		console.log(req.responseText);
	}
}



function addBtn(tr, callBackFunc) {
	//버튼 추가 코드. 이벤트 등록
	let butn = document.createElement('button');
	butn.onclick = callBackFunc;
	butn.innerHTML = '삭제';
	let tdTag = document.createElement('td');
	tdTag.appendChild(butn);
	tr.appendChild(tdTag);

	return tr;
}


function titleRow(result) {
	//console.log(result[0].childNodes[3].nodeName) childnodes[칼럼위치값]
	let trTag = document.createElement('tr');
	for (let i = 0; i < result[0].childNodes.length; i++) {
		let tdTag = document.createElement('th');
		let textNode = document.createTextNode(result[0].childNodes[i].nodeName.toUpperCase());
		tdTag.appendChild(textNode);
		trTag.appendChild(tdTag);


		trTag.onmouseover = function() {
			//console.log('mouseover');
			trTag.style.backgroundColor = 'yellow';
		}
		trTag.onmouseout = function() {
			//console.log('mouseout');
			trTag.style.backgroundColor = '';
		}

	}

	return trTag;
}

function contentRow(result) {
	let trTags = [];
	for (let j = 0; j < result.length; j++) {
		let trTag = document.createElement('tr');

		for (let i = 0; i < result[0].childNodes.length; i++) {
			let tdTag = document.createElement('td');
			let textNode = document.createTextNode(result[j].childNodes[i].firstChild.nodeValue.toUpperCase());
			tdTag.appendChild(textNode);
			trTag.appendChild(tdTag);
		}

		trTags.push(trTag);
		trTag.onmouseover = function() {
			//console.log('mouseover');
			trTag.style.backgroundColor = 'yellow';
		}
		trTag.onmouseout = function() {
			//console.log('mouseout');
			trTag.style.backgroundColor = '';
		}

	}

	return trTags;
}
