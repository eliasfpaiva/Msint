function validaTemperatura(campo, podeVazia) {
	if(campo.value === ""){
		if(podeVazia)
			return true;
		else{
			alert('Temperatura não informada!');
			campo.value = '';
			return false;
		}
	}else if(campo.value > 42){
		alert('Temperatura muito elevada!');
		campo.value = '';
		return false;
	} else if(campo.value < 32){
		alert('Temperatura muito baixa!');
		campo.value = '';
		return false;
	}
	return true;
}

function validaData() {
	if(localStorage.length === 0)
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
	if(!validaTemperatura(document.getElementById('temperatura'), false))
		return false;

	if(!validaData())
		return false;

	return true;
}

function validaNumero(evt) {
	var campo = evt.target;

	if(isNaN(evt.key))
		if(isNaN(campo.value))
			campo.value = subString(campo.value, 0, campo.value.length -1);
}

function subString(string, inicio, fim) {
	var subString = '';

	for(i=inicio; i<fim; i++)
		subString += string[i];

	return subString;
}
function getMucoSelecionado(){
	var mucos = document.getElementsByName('muco');
	var mucoSelecionado = "";
	mucos.forEach(
		function(muco){
			if(muco.checked)
				mucoSelecionado = muco.value;
		}
	);
	return mucoSelecionado;
}

function montaData(){
	let data = new Date();
	let dia = data.getDay();
	let mes = data.getMonth() + 1 // somo 1 pois no JavaScript os meses vão de 0 a 11
	let ano = data.getFullYear();

	return dia + '/' + mes + '/' + ano;
}

function avaliarFertilidade() {
	var somaTemperaturas = 0;
	
	for(i = 0; i < localStorage.length; i++){
			somaTemperaturas += Number(localStorage.getItem(i).split(",")[1]);
	}
	alert(somaTemperaturas/localStorage.length);
}

function gravarMedicoes(){
	var data = montaData(); 
	var temperatura = document.getElementById('temperatura').value;
	var muco = getMucoSelecionado();
	var primeiroDia = document.getElementById('primeiroDia').checked;
		
	if(validaColeta()){
		salva([data, temperatura, muco, primeiroDia]);
		alert('Dados salvos');

		if(localStorage.length > 3)
			avaliarFertilidade();

		document.location.reload();
	}
}

function salva(dado) {
	localStorage.setItem(localStorage.length, dado);
}

function lista(){ 
	for(i=0; i<localStorage.length; i++)
		console.log(localStorage.getItem(i))
}

function limpa(){ localStorage.clear();}