const nomesMeses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

var questao1 = () =>{
    var texto = valorInput("texto-q1").split("");
    var textoInvertido = [];
    texto.forEach((letra) => {
        textoInvertido.unshift(letra);
    });
    var impressao = document.getElementById("imprime-q1");
    impressao.textContent = textoInvertido.join("");
}

var questao2 = () =>{
    var texto = valorInput("texto-q2").split("");
    var textoNovo = [];
    var vogais = ['a', 'e', 'i', 'o', 'u'];
    texto.forEach((letra) => {
        if(vogais.indexOf(letra.toLowerCase()) != -1)
            textoNovo.push("<strong>"+letra+"</strong>");
        else
            textoNovo.push(letra);
    });
    var impressao = document.getElementById("imprime-q2");
    impressao.innerHTML = textoNovo.join("");
}

var questao3 = () =>{
    var palavras = valorInput("texto-q3").trim().split(" ");
    var contarPalavras = [];
    var palavraArray = [];
    var palavrasLimpas = palavras.map(function(palavra){
        return palavra.replace(/[.,\/#!$%\^&\*{};:=()\-_`~\[\]]/g,"").replace(/ {2,}/g," ");
    });
    palavraArray["palavra"] = palavrasLimpas[0];
    palavraArray["qtde"] = 1;
    contarPalavras.push(palavraArray);

    let jaTem;
    var i;
    var j;
    for(i = 1 ; i < palavrasLimpas.length; i=i+1){
        jaTem = false;
        for(j = 0; j < contarPalavras.length ; j=j+1){
            if(palavrasLimpas[i] == contarPalavras[j]["palavra"]){
                contarPalavras[j]["qtde"] += 1;
                jaTem = true;
            }
        }
        if(!jaTem){
            palavraArray = [];
            palavraArray["palavra"] = palavrasLimpas[i];
            palavraArray["qtde"] = 1;
            contarPalavras.push(palavraArray);
        }
    }
    var impressao = document.getElementById("imprime-q3");
    var linha;
    var celulaPalavraObj;
    var celulaQtdeObj;
    var palavraTexto;
    var qtdeTexto;
    impressao.innerHTML = "";

    contarPalavras.forEach((palavra) =>{
        celulaPalavraObj = document.createElement("td");
        celulaQtdeObj = document.createElement("td");
        linha = document.createElement("tr");
        palavraTexto = document.createTextNode(palavra["palavra"]);
        qtdeTexto = document.createTextNode(palavra["qtde"]);
        celulaPalavraObj.appendChild(palavraTexto);
        celulaQtdeObj.appendChild(qtdeTexto);
        linha.appendChild(celulaPalavraObj);
        linha.appendChild(celulaQtdeObj);
        impressao.appendChild(linha);

    });
}

var questao4 = () =>{
    var palavras = valorInput("texto-q4").trim().split(" ");
    var contarPalavras = [];
    var palavraArray = [];
    var palavrasLimpas = palavras.map(function(palavra){
        return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\[\]]/g,"").replace(/ {2,}/g," ");
    });
    palavraArray["palavra"] = palavrasLimpas[0];
    palavraArray["qtde"] = 1;
    contarPalavras.push(palavraArray);

    let jaTem;
    var i;
    var j;
    for(i = 1 ; i < palavrasLimpas.length; i=i+1){
        jaTem = false;
        for(j = 0; j < contarPalavras.length ; j=j+1){
            if(palavrasLimpas[i] == contarPalavras[j]["palavra"]){
                contarPalavras[j]["qtde"] += 1;
                jaTem = true;
            }
        }
        if(!jaTem){
            palavraArray = [];
            palavraArray["palavra"] = palavrasLimpas[i];
            palavraArray["qtde"] = 1;
            contarPalavras.push(palavraArray);
        }
    }
    var impressao = document.getElementById("imprime-q4");
    let posPalavraMaiorOcor = 0;

    for(i = 0; i < contarPalavras.length; i++){
        if(contarPalavras[i]["qtde"] > contarPalavras[posPalavraMaiorOcor]["qtde"]){
            posPalavraMaiorOcor = i;
        }
    }
    impressao.innerHTML = "A palavra <strong>" + contarPalavras[posPalavraMaiorOcor]["palavra"] + "</strong> ocorreu " + contarPalavras[posPalavraMaiorOcor]["qtde"] + " vezes";
}

var questao5 = () => {
    var texto = valorInput("texto-q5");
    var procurar = valorInput("procurada-q5");
    var substituir = valorInput("substituir-q5");

    const regex = new RegExp(procurar, "gi");
    var novoTexto = texto.replace(regex, substituir);
    var impressao = document.getElementById("imprime-q5");
    impressao.innerHTML = novoTexto;

}

var questao6 = () =>{
    var data = new Date(valorInput("texto-q6"));
    var diff = calcDiffsDatas(data, new Date());

    var impressao = document.getElementById("imprime-q6");
    impressao.innerHTML = diff + " dias decorridos desde " + document.getElementById("texto-q6").value;

}

var questao7 = () =>{
    var value = valorInput("texto-q7");
    let data = value.split('/');
    if(data.length != 3){
        alert("Data em formato inválido");
        return;
    }

    var dataObj = new Date();
    dataObj.setDate(data[0]);
    dataObj.setMonth(data[1] - 1);
    dataObj.setYear(data[2]);

    var dataEmTexto = dataObj.getDate() + " de " + nomesMeses[dataObj.getMonth()] + " de " + dataObj.getFullYear();

    var impressao = document.getElementById("imprime-q7");
    impressao.innerHTML = dataEmTexto;
}

var questao8 = () =>{
    var data1 = new Date(valorInput("data-1-q8"));
    var data2 = new Date(valorInput("data-2-q8"));
    var diff;
    if(data1 < data2)
        diff = calcDiffsDatas(data1, data2) + 1;
    else
        diff = calcDiffsDatas(data2, data1) + 1;

    var qtdSemanas = parseInt(diff / 7);
    var impressao = document.getElementById("imprime-q8");
    impressao.innerHTML = qtdSemanas + " semanas entre estas datas ";

}

var questao9 = () =>{
    var texto = valorInput("texto-q9");
    let regTexto =  /^[a-zA-Z]*$/;
    let regTextoNumero = /^[a-zA-Z0-9]*$/;
    let regTextoNumeroCaractere = /^[a-zA-Z0-9@#!$%&,-=+.<>;:]*$/;

    let resposta;
    if(regTexto.test(texto))
        resposta = "<span style='color:red;'>fraca</span>";
    else if (regTextoNumero.test(texto))
        resposta = "<span style='color:orange;'>moderada</span>";
    else if (regTextoNumeroCaractere.test(texto))
        resposta = "<span style='color:green;'>forte</span>";

    var impressao = document.getElementById("imprime-q9");
    impressao.innerHTML = resposta;
}

var questao10 = () => {
    var texto = valorInput("texto-q10").split("");

    var tenis = ["T", "E", "N", "I", "S"];
    var polar = ["P", "O", "L", "A", "R"];

    let regMaiuscula = /^[A-Z]*$/;

    var posicaoLetraEncontrada;
    var novaLetra;
    var ehMaiuscula;
    var novoTexto = [];

    texto.forEach((letra) => {
        posicaoLetraEncontrada = null;
        if(tenis.indexOf(letra.toUpperCase()) != -1){
            posicaoLetraEncontrada = tenis.indexOf(letra.toUpperCase());
            novaLetra = polar[posicaoLetraEncontrada];
        } else if(polar.indexOf(letra.toUpperCase()) != -1){
            posicaoLetraEncontrada = polar.indexOf(letra.toUpperCase());
            novaLetra = tenis[posicaoLetraEncontrada];
        }

        if(posicaoLetraEncontrada != null){
            ehMaiuscula = regMaiuscula.test(letra);
            novaLetra = !ehMaiuscula ? novaLetra.toLowerCase() : novaLetra;
            novoTexto.push(novaLetra);
        } else
            novoTexto.push(letra);
    });


    var impressao = document.getElementById("imprime-q10");
    impressao.innerHTML = novoTexto.join("");
}

window.onload = function(){
    addBotaoEvento("executar-q1", questao1);
    addBotaoEvento("executar-q2", questao2);
    addBotaoEvento("executar-q3", questao3);
    addBotaoEvento("executar-q4", questao4);
    addBotaoEvento("executar-q5", questao5);
    addBotaoEvento("executar-q6", questao6);
    addBotaoEvento("executar-q7", questao7);
    addBotaoEvento("executar-q8", questao8);
    addBotaoEvento("executar-q9", questao9);
    addBotaoEvento("executar-q10", questao10);

}

function addBotaoEvento(id, callback){
    var botao = document.getElementById(id);
    botao.addEventListener("click", callback);
}

function valorInput(id){
    return document.getElementById(id).value;
}

function calcDiffsDatas(dataAnterior, dataPosterior){
    return Math.round((dataPosterior - dataAnterior)/ (1000 * 60 * 60 * 24)) - 1;
}
