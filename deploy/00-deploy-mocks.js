const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    log("deployer: ", deployer)
    // if (developmentChains.includes(network.name)) { //network.name = const developmentChains = ["hardhat", "localhost"]
    //or
    if (chainId === 31337) {
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER], //pass the MockV3Aggregator constructor function argument onto args property.
            //click on contracts/test/MockV3Aggregator.sol to see if the contract has constructor
            //function parameter, it has two parameters which are _decimals and _initialAnswer
            //let create _decimals and _initialAnswer inside helper-hardhat-config.js file right after
            //developmentChains like this
            // const DECIMALS = 8 //eight zeros
            // const INITIAL_ANSWER = 200000000000 //2000 with eight zeros
            //- let import Decimals and Initial_Answer  like this
            // const {developmentChains, DECIMALS, INITIAL_ANSWER} = require("../helper-hardhat-config")
            //- let use it as args property value like this args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mocks deployed!")
        log("------------------------------------------") //End of this deploy script
    }
}

module.exports.tags = ["all", "mocks"] //to deploy only mock script only
//- let deploy our mock script like this
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat deploy --tags mocks
//- back to 01-deploy-fund-me.js file to complete the deploy script for fundMe4
