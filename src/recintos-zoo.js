class RecintosZoo {

    constructor(){
        //todos os recitos disponiveis
        this.recintos=[
            {numero:1,bioma:'savana',tamanhoTotal:10,animais:[{animal:'MACACO', quantidade:3}]},
            {numero:2,bioma:'floresta', tamanhoTotal:5,animais:[]},
            {numero:3,bioma:'savana e rio',tamanhoTotal:7, animais:[{animal:'GAZELA'}]},
            {numero:4,bioma:'rio', tamanhoTotal:8, animais:[ ]},
            {numero: 5 , bioma:'savana', tamanhoTotal:9, animais:[{animal:'LEAO'}]}


        ];

        //animais e suas caracteristicas
        this.animais={
            LEAO:{tamanho:3,bioma:['savana'], carnivoro:true},
            LEOPARDO:{tamanho:2,bioma:['savana'], carnivoro:true},
            MACACO:{tamanho:1,bioma:['savana', 'floresta'], carnivoro:false},
            GAZELA:{tamanho:2,bioma:['savana' ], carnivoro:false},
            HIPOPOTAMO:{tamanho:4,bioma:['savana', 'rio'], carnivoro:false},
            CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true }
        }
    }
    

    analisaRecintos(animal, quantidade) {

        //Entradas e saidas:4)Caso animal informado seja inválido, apresentar erro "Animal inválido"
        animal = animal.toUpperCase();

        if(!this.animais[animal]){
            return{erro :'Animal inválido'}
        }
        // else{
        //     console.log('animal existente')
        // }

        //Entradas e saidas: 5)Caso quantidade informada seja inválida, apresentar erro "Quantidade inválida"
        if(typeof quantidade !=='number' || quantidade<=0){
            return{erro :'Quantidade inválida'}
        }
        // else{
        //     console.log('quantidade válida')
        // }

        const {tamanho, bioma, carnivoro}= this.animais[animal]//para verficar a animal 
        const tamanhoTotal= tamanho*quantidade// verifica o tamanho dos bichinhos
        const recintosViaveis=[];
        
        //vai percorrer tods os recintos
        this.recintos.forEach((recinto)=>{
            const espacoOcupado=this.calcularEspacoOcupado(recinto.animais)
            const espacoLivre = recinto.tamanhoTotal- espacoOcupado


            // REGRAS PARA ENCONTRAR UM RECINTO: 1)Um animal se sente confortável se está num bioma adequado e com espaço suficiente para cada indivíduo
            if(bioma.includes(recinto.bioma)){

                //REGRAS PARA ENCONTRAR UM RECINTO: 4) Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
                if (animal === 'HIPOPOTAMO' && recinto.animais.length > 0 && recinto.bioma !== 'savana e rio') {
                    return
                }

                //REGRAS PARA ENCONTRAR UM RECINTO: 5)Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
                if(animal==='MACACO' && recinto.animais.length===0){
                    return
                }

                //REGRAS PARA ENCONTRAR UM RECINTO: 2)Animais carnívoros devem habitar somente com a própria espécie

                if(carnivoro && recinto.animais.length>0){
                    const convivente=recinto.animais[0].animal;
                    const conviventeCarnivoro = this.animais[convivente].carnivoro

                    
                    //eles tambem nao podem ficar com outras animals
                    if(convivente !== animal &&conviventeCarnivoro){
                        return
                    }
                }


                //REGRAS PARA ENCONTRAR UM RECINTO: 3)Animais já presentes no recinto devem continuar confortáveis com a inclusão do(s) novo(s)

                if(recinto.animais.length>0){
                    const conforto = this.verificaConforto(recinto,tamanhoTotal);
                    if(!conforto){
                        return
                    }
                }
                

                //REGRAS PARA ENCONTRAR UM RECINTO: 6)Quando há mais de uma espécie no mesmo recinto, é preciso considerar 1 espaço extra ocupado

                let espacoExtra = 0;
                // Só considera espaço extra se houver outra espécie no recinto
                if (recinto.animais.length > 0 && recinto.animais[0].animal !== animal) {
                    espacoExtra = 1;
                }

                // console.log(`Espaço extra: ${espacoExtra}`);

                if (espacoLivre >= tamanhoTotal + espacoExtra) {
                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - (tamanhoTotal + espacoExtra)} total: ${recinto.tamanhoTotal})`);

                    // console.log(`Recinto ${recinto.numero} é viável.`);
                }

        
                
                
            }

        })

        //REGRAS PARA ENCONTRAR UM RECINTO: 7)Não é possível separar os lotes de animais nem trocar os animais que já existem de recinto (eles são muito apegados!). Por exemplo, se chegar um lote de 12 macacos, não é possível colocar 6 em 2 recintos.

        if(recintosViaveis.length>0){
            return {recintosViaveis}
        }else{
            return {erro: 'Não há recinto viável'}
        }
    
    }

    calcularEspacoOcupado(animaisExistentes){
        let espacoOcupado = 0;
        animaisExistentes.forEach(animal => {
            espacoOcupado += this.animais[animal.animal].tamanho* animal.quantidade
        });
            return espacoOcupado
    }

    verificaConforto(recinto, tamanhoTotal){
        const espacoOcupado = this.calcularEspacoOcupado(recinto.animais);
        const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
        return espacoLivre >= tamanhoTotal

    }
}

export { RecintosZoo as RecintosZoo };

