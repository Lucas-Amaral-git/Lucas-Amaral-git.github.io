var impressao = document.getElementById("imprimeResultado");
var i;
var resultado = 0;
var el1 = 0;
var el2 = 1;

impressao.innerHTML += "1º número de Fibonacci: "+ el1 +" <br>";
impressao.innerHTML += "2º número de Fibonacci: "+ el2 +" <br>";

for(i = 3; i <= 100; i= i+1){
    resultado = el1 + el2;
    el1 = el2;
    el2 = resultado;
    impressao.innerHTML += i + "º número de Fibonacci: "+ resultado +" <br>";
}