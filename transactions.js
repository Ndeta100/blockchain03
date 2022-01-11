const SHA256=require('crypto-js/sha256')
const Elliptic=require('elliptic')
const ec=new Elliptic.ec('secp256k1')

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress=fromAddress
        this.toAddress=toAddress
        this.amount=amount
    }
    // Calculate the hash in other to sign it with the signature
     calculateHash(){
        return   SHA256(this.fromAddress+ this.toAddress+this.amount)
     }

     signTransaction(signingKey){
    //  check if the miner's transaction is valid
        if(this.fromAddress===null) return true

        // Verify if the wallet address is the person's address 
        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error('You can not sign transaction for another wallet')
        }

        // Sign the transaction hash withe private key
         this.hash=this.calculateHash()
         const sign=signingKey.sign(this.hash, 'base64')

        // convert the signature to DER format
           this.signature=sign.toDEER('hex')
        console.log('Signature', this.signature)
     }
}