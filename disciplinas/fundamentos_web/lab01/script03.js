    var impressao = document.getElementById("imprimeResultado");
    var i;
    var resultado = 0;
    for(i = 0; i <= 1000; i= i+2){
        resultado += i;
    }
    impressao.innerHTML = "Resultado: "+ resultado +" <br>";