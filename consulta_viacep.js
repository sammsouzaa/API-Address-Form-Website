function limparFormulario(endereco){
    document.getElementById("endereco").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
}

function preencherFormulario(endereco) {
    document.getElementById("endereco").value = endereco.logradouro;
    document.getElementById("bairro").value = endereco.bairro;
    document.getElementById("cidade").value = endereco.localidade;
    document.getElementById("estado").value = endereco.uf;

}

function eNumero(numero) {
    return /^[0-9]+$/.test(numero); //verifica se esta de 0 a 9, caso contrario retornar false
}

function cepValido(cep) {
    return cep.length == 8 && eNumero(cep);
}

//mostre no console oq foi digitado pelo usuario
async function pesquisarCep() {
    
    limparFormulario(endereco);
    
    const cep = document.getElementById("cep").value.replace("-", "");
    console.log(cep);
    const url = `https://viacep.com.br/ws/${cep}/json/`

    if (cepValido(cep)) {
        const dados = await fetch(url); //await: espera o retono
        console.log(dados);
        const endereco = await dados.json();
        console.log(endereco);

        if (endereco.hasOwnProperty("erro")) {
            document.getElementById("endereco".value = "CEP nao encontrado");
        } else {
            preencherFormulario(endereco);
        }
    } else {
        document.getElementById("endereco").value = "CEP incorreto";
    }
}

document.getElementById("cep")
    .addEventListener("focusout", pesquisarCep);

