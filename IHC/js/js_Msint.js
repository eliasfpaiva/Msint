function validaTemperatura(campo) {
	if(campo.value > 42){
		alert('Temperatura muito elevada!');
		campo.value = '';
	}
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

function gravarMedicoes(){
	var muco = document.getElementsByName('muco');
	var temperatura = document.getElementsByName('temperatura')[0].value;
	var mucoSelecionado;

	for(i=0; i<3; i++)
		if(muco[i].checked)
			mucoSelecionado = muco[i].value;

	salva([temperatura, mucoSelecionado])
}

function salva(dado) {
	localStorage.setItem(localStorage.length, dado);
}

function lista(){ 
	for(i=0; i<localStorage.length; i++)
		console.log(localStorage.getItem(i))
}

function limpa(){ localStorage.clear();}