export default class Sorteio{
    limiteInferior = 1;
    limiteSuperior = 100;
    numerosSorteados = [];

    constructor(limiteInferior, limiteSuperior, numerosSorteados = []){
        this.limiteInferior = limiteInferior;
        this.limiteSuperior = limiteSuperior;
        this.numerosSorteados = numerosSorteados;
    }

    setLimiteInferior(limiteInferior){
        this.limiteInferior = limiteInferior;
    }

    getLimiteInferior(){
        return this.limiteInferior;
    }

    setLimiteSuperior(limiteSuperior){
        this.limiteSuperior = limiteSuperior;
    }

    getLimiteSuperior(){
        return this.limiteSuperior;
    }

    setNumerosSorteados(numerosSorteados){
        this.numerosSorteados = numerosSorteados;
    }

    getNumerosSorteados(){
        return this.numerosSorteados;
    }

    addNumeroSorteado(numeroSorteado){
        this.numerosSorteados.push( numeroSorteado );
    }

    validar(){
        let erros = [];

        if(! this.limiteInferior || ! this.limiteSuperior)
            erros.push("Os limites precisam estar preenchidos.");

        if(this.limiteInferior <= 0 || this.limiteSuperior <= 0)
            erros.push("Os limites precisam ser maiores que 0.");

        if(this.limiteSuperior < this.limiteInferior)
            erros.push("O limite superior precisa ser maior que o limite inferior.");

        if(erros.length > 0)
            throw new Error("\n" + erros.join("\n"));
    }
}