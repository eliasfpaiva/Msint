function validaTemperatura(campo, podeVazia) {
	if (campo.value === "") {
		if (podeVazia)
			return true;
		else {
			alert('Temperatura não informada!');
			campo.value = '';
			return false;
		}
	} else if (campo.value > 42) {
		alert('Temperatura muito elevada!');
		campo.value = '';
		return false;
	} else if (campo.value < 32) {
		alert('Temperatura muito baixa!');
		campo.value = '';
		return false;
	}
	return true;
}

function validaData() {
	if (localStorage.length === 0)
		return true;

	//As coletas deve ser feitas em dias diferentes
	// const dataUltimacoleta = localStorage.getItem(localStorage.length - 1).split(',')[0];
	// const dataHoje = montaData();
	// if(dataUltimacoleta === dataHoje){
	// 	alert('Já foi realizada uma coleta hoje, apenas uma coleta por dia é permitida!');
	// 	return false;
	// }

	return true;
}

function validaColeta() {
	if (!validaTemperatura(document.getElementById('temperatura'), false))
		return false;

	if (!validaData())
		return false;

	return true;
}

function validaNumero(evt) {
	var campo = evt.target;

	if (isNaN(evt.key))
		if (isNaN(campo.value))
			campo.value = subString(campo.value, 0, campo.value.length - 1);
}

function subString(string, inicio, fim) {
	var subString = '';

	for (i = inicio; i < fim; i++)
		subString += string[i];

	return subString;
}
function getMucoSelecionado() {
	var mucos = document.getElementsByName('muco');
	var mucoSelecionado = "";
	mucos.forEach(
		function (muco) {
			if (muco.checked)
				mucoSelecionado = muco.value;
		}
	);
	return mucoSelecionado;
}

function montaData(date) {
	let data = date == undefined ? new Date() : new Date(date);
	let dia = data.getDate() + 1;
	let mes = data.getMonth() + 1 // somo 1 pois no JavaScript os meses vÃ£o de 0 a 11
	let ano = data.getFullYear();

	return dia + '/' + mes + '/' + ano;
}

function avaliarFertilidade() {
	if (localStorage.length > 4) {
		var somaTemperaturas = 0;
		var CicloI;
		var CicloF;
		var dia = localStorage.length * 2.5;
		var count = 0;
		var novo;
		for (i = 0; i < localStorage.length; i++) {
			somaTemperaturas += Number(localStorage.getItem(i).split(",")[1]);
			if (localStorage.getItem(i).split(",")[3] === "true") {
				if (count == 0) {
					CicloI = new Date(localStorage.getItem(i).split(",")[0].split("/")[2], localStorage.getItem(i).split(",")[0].split("/")[1], localStorage.getItem(i).split(",")[0].split("/")[0]);
novo=Number(localStorage.getItem(i).split(",")[0].split("/")[0]);
					count++;
				}
				else if (count == 1 && localStorage.getItem(i).split(",")[3] === "true") {
					if (CicloI < new Date(localStorage.getItem(i).split(",")[0].split("/")[2], localStorage.getItem(i).split(",")[0].split("/")[1], localStorage.getItem(i).split(",")[0].split("/")[0])) {
						CicloF = new Date(localStorage.getItem(i).split(",")[0].split("/")[2], localStorage.getItem(i).split(",")[0].split("/")[1], localStorage.getItem(i).split(",")[0].split("/")[0]);
						count++;
					}
				}
			}

		}
		if (!CicloF) {
			alert("Data final do ciclo deve ser superior a Data inicial!")
		}
		else {
			var prim = CicloF.getTime() - CicloI.getTime();
			var real = prim / (60 * 60 * 24 * 1000);
var inicia = real-18;
var finda = real-11;
var verdade = finda-inicia;
var valida = verdade;

var table=document.getElementById('calendar');
var l=table.rows.length;
var s='';

for(var i=0;i<l;i++){
	var tr=table.rows[i];
	var teste = tr.childNodes;
	for(var j=0;j<verdade;j++){
if(Number(teste[j].innerHTML)>novo+verdade){
if(valida >0){teste[j].style.backgroundColor = "purple"; valida--;}
	
}
	}
	if(valida ==0){ break;}
}

		}
		console.log(CicloI);
		console.log(CicloF);
		console.log((CicloI));
		console.log((CicloF));
		alert("Temperatura média é :" + somaTemperaturas / localStorage.length);
		alert("Periodo baseado no ciclo, sendo 1 o primeiro de do ciclo colorido")
	}
	else {
		alert("Informe mais " + 5 - localStorage.length + "dados!")
	}
}

function gravarMedicoes() {
	if (document.getElementById('calendario').value == "") {
		alert("Informe a data!")
	}
	else {
		var data = montaData(document.getElementById('calendario').value);
		var temperatura = document.getElementById('temperatura').value;
		var muco = getMucoSelecionado();
		var primeiroDia = document.getElementById('primeiroDia').checked;

		if (validaColeta()) {
			salva([data, temperatura, muco, primeiroDia]);
			alert('Dados salvos');

			if (localStorage.length > 3)
				avaliarFertilidade();

			document.location.reload();
			lista();
		}
	}
}

function salva(dado) {
	localStorage.setItem(localStorage.length, dado);
}


function lista() {
	for (i = 0; i < localStorage.length; i++)
		console.log(localStorage.getItem(i))
}

function limpa() { localStorage.clear(); }