const SHA256=require('crypto-js/sha256')

class Block{
    constructor(timestamp, transaction, previousHash=''){
        // the calculation of the hash must be done at the end so as to ensure that all data is assigned correctly before calculation
        this.timestamp=timestamp
        this.transaction=transaction
        this.previousHash=previousHash
        this.nonce=0
        this.hash=calculateHash()
    }

    calculateHash(){
      return SHA256(this.timestamp+ JSON.stringify(this.transaction)+ this.previousHash +this.nonce)
    }
    hasValidTransaction(){
        // Traverse all transactions within the block, verifying them one after the other
        for(const tx of this.transaction){
            // check if it's valid
            if(!tx.isValid()){
                return false
            }
        }
        return true
    }
}

module.exports=Block