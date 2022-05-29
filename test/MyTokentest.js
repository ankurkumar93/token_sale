var MyToken = artifacts.require("./MyToken.sol")

contract("MyToken", function(accounts){
    
    it("initialises with tokens filled", function(){
        return MyToken.deployed().then(function(instance){
            return instance.sharesLeft()
        }).then(function(shares){
            assert.equal(shares, 400000)
        })
    })

    it("initializes discount with 1", function(){
        return MyToken.deployed().then(function(instance){
            return instance.discount()
        }).then(function(disc){
            assert.equal(disc, 1)
        })
    })

    it("lets anyone buy tokens", function(){
        return MyToken.deployed().then(function(instance){
            myTokenInstance = instance
            return instance.buy(1000000000000000, { from: accounts[0] })
        }).then(function(){
            return myTokenInstance.shareOf(accounts[0])
        }).then(function(balance){
            assert.equal(balance, 1)
        })
    })
})
