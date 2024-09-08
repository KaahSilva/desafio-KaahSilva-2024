class RecintosZoo {




    constructor(){
        //todos os recitos disponiveis
        this.recintos=[
            {numero:1,bioma:'savana',tamanhoTotal:10,animais:[{especie:'MACACO', quantidade:3}]},
            {numero:2,bioma:'floresta', tamanhoTotal:5,animais:[]},
            {numero:3,bioma:'savana e rio',tamanhoTotal:7, animais:[{especie:'GAZELA'}]},
            {numero:4,bioma:' rio', tamanhoTotal:8, animais:[ ]},
            {numero: 5 , bioma:'savana', tamanhoTotal:9, animais:[{especie:'LEAO'}]}


        ];

        //animais e suas caracteristicas
        this.animais={
            LEAO:{tamanho:3,bioma:['savana'], carnivoro:true},
            LEOPARDO:{tamanho:2,bioma:['savana'], carvivor:true},
            MACACO:{tamanho:1,bioma:['savana', 'floresta'], carnivoro:false},
            GAZELA:{tamanho:2,bioma:['savana' ], carnivoro:false},
            HIPOPOTAMO:{tamanho:4,bioma:['savana', 'rio'], carnivoro:false}
        }
    }
    



    analisaRecintos(animal, quantidade) {

        //Entradas e saidas:4)Caso animal informado seja inválido, apresentar erro "Animal inválido"

        if(!this.animais[especie]){
            console.log('animal invalido')
        }else{
            console.log('animal existente')
        }

        //Entradas e saidas: 5)Caso quantidade informada seja inválida, apresentar erro "Quantidade inválida"
        if(typeof quantidade !=='number' || quantidade<=0){
            console.log('quantidade invalida')
        }else{
            console.log('quantidade válida')
        }

        const {tamanho, bioma, carnivoro}= this.animais[especie]//para verficar a especie 
        const tamanhoTotal= tamanho*quantidade// verifica o tamanho dos bichinhos
        const recintosViaveis=[];
        
        //vai percorrer tods os recintos
        this.recintos.forEach((recinto)=>{
            const espacoOcupado=this.calcularEspacoOcupado(recinto.animais)
            const espacoLivre = recinto.tamanhoTotal- espacoLivre

            // REGRAS PARA ENCONTRAR UM RECINTO: 1)Um animal se sente confortável se está num bioma adequado e com espaço suficiente para cada indivíduo
            if(bioma.includes(recinto.bioma)|| (recinto.bioma.includes)){

                //REGRAS PARA ENCONTRAR UM RECINTO: 4) Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
                if(especie === 'HIPOPOTAMO' && recinto.animais.length > 0 && recinto.animais.length > 0 && recinto.bioma !== 'savana e rio'){
                    return
                }

                //REGRAS PARA ENCONTRAR UM RECINTO: 5)Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
                if(especie==='MACACO' && recinto.animais.length===0){
                    return
                }

            }

        })



    }

}

export { RecintosZoo as RecintosZoo };
