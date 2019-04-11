function validaTemperatura(campo) {
	if(campo.value > 42){
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
	
}

function validaColeta() {
	if(!validaTemperatura(document.getElementById('temperatura')))
		return false;

	if(!validaData())
		return false;
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

function gravarMedicoes(){
	var data = montaData(); 
	var temperatura = document.getElementsByName('temperatura')[0].value;
	var muco = getMucoSelecionado();
	
	
	if(validaColeta())
		salva([data, temperatura, muco]);
}

function salva(dado) {
	localStorage.setItem(localStorage.length, dado);
}

function lista(){ 
	for(i=0; i<localStorage.length; i++)
		console.log(localStorage.getItem(i))
}

function limpa(){ localStorage.clear();}