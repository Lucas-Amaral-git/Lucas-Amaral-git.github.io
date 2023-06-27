import Sorteio from "./sorteio.js";


document.addEventListener("DOMContentLoaded", function(){

    (() => {
        if( localStorage.getItem("sorteio") ){
            let sorteio = obterSorteioAPartirDoStorage();

            try{
                sorteio.validar();

                sorteio = removerElementosForaDosLimites(sorteio);

                // montar informativo de últimos números sorteados
                informarUltimosNumerosSorteados( sorteio );

                // inserir os limites inferior e superior nos inputs
                document.getElementById("limite-inferior").value = sorteio.getLimiteInferior();
                document.getElementById("limite-superior").value = sorteio.getLimiteSuperior();

                // esconder o título que pede configuração, se for o caso
                // exibir parte de botão para pedir número, se for o caso
                alterarExibicaoElementosQuandoTemSorteio();
            } catch( e ){
                alert(e);
            }
        } else {
            document.getElementById("botoes-auxiliares").style.display = 'none';
        }
    })();

    document.getElementById("configurar-sorteio").addEventListener("click", function(e){
        e.preventDefault();

        if( localStorage.getItem("sorteio") ){
            var sorteio = obterSorteioAPartirDoStorage();

            var limiteInferiorAntes = sorteio.getLimiteInferior();
            var limiteSuperiorAntes = sorteio.getLimiteSuperior();

            sorteio.setLimiteInferior( parseInt( document.getElementById("limite-inferior").value ) );
            sorteio.setLimiteSuperior( parseInt( document.getElementById("limite-superior").value ) );
        } else {
            var sorteio = new Sorteio(
                parseInt( document.getElementById("limite-inferior").value ),
                parseInt( document.getElementById("limite-superior").value )
            );
        }

        try{
            sorteio.validar();

            if(limiteInferiorAntes != sorteio.getLimiteInferior() || limiteSuperiorAntes != sorteio.getLimiteSuperior())
                sorteio = removerElementosForaDosLimites(sorteio);

            // criar sorteio ou editar os limites
            localStorage.setItem( "sorteio", JSON.stringify( sorteio ) );

            // esconder o título que pede configuração, se for o caso
            // exibir parte de botão para pedir número, se for o caso
            alterarExibicaoElementosQuandoTemSorteio();

            document.getElementById("botoes-auxiliares").style.display = 'block';

        } catch( e ){
            alert(e);
        }
    });

    document.getElementById("novo-sorteio").addEventListener("click", function(e){
        e.preventDefault();

        if( confirm("Deseja mesmo iniciar um novo sorteio?") == true ){
            localStorage.removeItem("sorteio");
            location.reload();
        }
    });

    document.getElementById("recomecar-sorteio").addEventListener("click", function(e){
        e.preventDefault();

        if( confirm("Deseja mesmo zerar os números sorteados?") == true ){
            if( localStorage.getItem("sorteio") ){
                let sorteio = obterSorteioAPartirDoStorage();

                sorteio.setNumerosSorteados( [] );
                localStorage.setItem( "sorteio", JSON.stringify( sorteio ) );

                location.reload();

            } else
                alert("Não há sorteio criado.");
        }
    });

    document.getElementById("sortear-numero").addEventListener("click", function(e){
        e.preventDefault();

        if( localStorage.getItem("sorteio") ){
            let sorteio = obterSorteioAPartirDoStorage();
            let numeroEncontrado = false;

            if(sorteio.getNumerosSorteados().length >= sorteio.getLimiteSuperior() - sorteio.getLimiteInferior() + 1){
                alert("Todos os números já foram sorteados!");
                return;
            }

            alterarExibicaoElementosSorteandoNumero();

            console.log(sorteio.getNumerosSorteados().length, sorteio.getLimiteSuperior(), sorteio.getLimiteInferior());

            do{
                var numeroSorteado = Math.floor(Math.random() * (sorteio.getLimiteSuperior() - sorteio.getLimiteInferior() + 1) + sorteio.getLimiteInferior());

                if( ! sorteio.getNumerosSorteados().includes(numeroSorteado) && 
                    numeroSorteado >= sorteio.getLimiteInferior() && 
                    numeroSorteado <= sorteio.getLimiteSuperior() 
                ){
                    numeroEncontrado = true;
                }
            } while(numeroEncontrado == false);

            document.getElementById("numero-sorteado").innerHTML = "<div>" + numeroSorteado + "</div>";

            sorteio.addNumeroSorteado(numeroSorteado);
            localStorage.setItem( "sorteio", JSON.stringify( sorteio ) );

            window.setTimeout(() => {
                alterarExibicaoElementosAposSortearNumero();
                informarUltimosNumerosSorteados(sorteio);
            }, 2100);


        } else
            alert("Não há sorteio criado.");
    });

});

function removerElementosForaDosLimites(sorteio){
    let novosNumerosSorteados = [];

    for (const n of sorteio.getNumerosSorteados()) {
        if( ( n > sorteio.getLimiteInferior() && n < sorteio.getLimiteSuperior() ) ||
            n == sorteio.getLimiteInferior() ||
            n == sorteio.getLimiteSuperior()
        )
            novosNumerosSorteados.push(n);
    }

    sorteio.setNumerosSorteados(novosNumerosSorteados);

    return sorteio;
}


function obterSorteioAPartirDoStorage(){

    let jsonSorteio = JSON.parse( localStorage.getItem("sorteio") );

    let sorteio = new Sorteio(
        parseInt(jsonSorteio.limiteInferior),
        parseInt(jsonSorteio.limiteSuperior),
        jsonSorteio.numerosSorteados
    );

    return sorteio;
}

function informarUltimosNumerosSorteados( sorteio ){
    
    if(sorteio.getNumerosSorteados().length == 0)
        document.getElementById("ultimos-numeros-sorteados").innerHTML = "<p> Nenhum número sorteado </p>";
    else {
        let ultimosElementos = sorteio.getNumerosSorteados().slice(-3);
        ultimosElementos = ultimosElementos.reverse();

        document.getElementById("ultimos-numeros-sorteados").innerHTML = "<p> Últimos números sorteados: </p> <div>" + ultimosElementos.join(" - ") + "</div>";
    }

    document.getElementById("ultimos-numeros-sorteados").style.display = 'block';
}

function alterarExibicaoElementosQuandoTemSorteio(){

    document.getElementById("botoes-auxiliares").style.display = 'block';
    document.getElementById("exibir-numero-sorteado").style.display = 'block';

    document.getElementById("solicitar-configuracao").style.display = 'none';
    document.getElementById("configuracoes").style.display = 'none';
}

function alterarExibicaoElementosSorteandoNumero(){
    document.getElementById("exibir-numero-sorteado").style.display = 'none';
    document.getElementById("loading-numero").style.display = 'block';
}

function alterarExibicaoElementosAposSortearNumero(){
    document.getElementById("exibir-numero-sorteado").style.display = 'block';
    document.getElementById("loading-numero").style.display = 'none';
}