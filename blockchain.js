const Block=require('./block')
class Blockchain{
    constructor(){
       this.chain=[this.createGenesisBlock()]
       this.difficulty=2
        this.pendingTransaction=[]
        this.miningReward=100
    }
 
    createGenesisBlock(){
       return new Block(Date.now(), [], '')
    }
    getLatestBlock(){
       return this.chain[this.chain-1]
    }
}