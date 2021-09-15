var botao = document.getElementById('calcularFatorial');
var click = new Event("click");
botao.addEventListener("click", function(){
    var valor = document.getElementById("numeroFatorial").value;
    var impressao = document.getElementById("imprimeResultado");
    var i;
    var fatorial = 1;
    for(i = 1; i <= valor; i++){
        fatorial *= i;
    }
    impressao.textContent = "Fatorial de " + valor + " é " + fatorial;
});

botao.dispatchEvent(click);