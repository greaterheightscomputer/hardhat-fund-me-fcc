//traditional we do the following in our script file
//1. import
//2. main function
//3. calling of main function

//using hardhat-deploy library we shall
//1. import
//2. not create main function
//3. not call main function

//- we shall export deployFunc function for hardhat-deploy to look for it.
// function deployFunc(hre) {
//     console.log("Hi")
//     console.log(hre) //hre means Hardhat Runtime Environment is the same as this require("hardhat")
// }

// module.exports.default = deployFunc
//- let run the deploy script like this
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat deploy

//- let use anonymous arrow function with inline exports to write the same function as
//above like this
// module.exports = async (hre) => {
//     // hre.getNamedAccounts()
//     // hre.deployments
//     //===========
//     //- let store the above function and object onto a variable like this
//     // const getNamedAccounts = hre.getNamedAccounts
//     // const deployments = hre.deployments
//     //==========
//     //- let use destructure
//     // const { getNamedAccounts, deployments } = hre
// }

// //- let pass getNamedAccounts and deployments as a parameter onto anonymous function like this
// module.exports = async ({ getNamedAccounts, deployments }) => {
//     const { deploy, log } = deployments //pull out deploy and log functions from deployments object
//     const { deployer } = await getNamedAccounts() //pull out deployer property from getNamedAccounts function
//     const chainId = network.config.chainId //return the unique id for any blockchain

//     //- open hardhat.config.js file
//     //- remove the ternary operator from the acctions property and replace it with this
//     //accounts: [PRIVATE_KEY1, PRIVATE_KEY2, PRIVATE_KEY3],
//     //with above accounts array of string its will be difficuit to access the private_keys
//     //so let create namedAccounts object property onto hardhat.config.js in order to store the
//     //1st account with index of 0 onto deployer like this
//     // namedAccounts: {
//     //     deployer: {
//     //         default: 0,
//     //     },
//     //     user: {
//     //         default: 1,
//     //     },
//     // },
//     //- accounts: []
// }

//=====
//Mocking
//- for us to access Aggregator Price Feed Address on hardhat will need to use Mock Aggregator
//becos hardhat network is a blind network that get destroy everytime our transaction deployed.
//- Mocking is primarily used in unit testing. Creating object that simulate the behaviour of
//the real object.

//=======
//Refactor of FundMe4.sol and PriceConverter5.sol files
//- we want to get dynamic Aggregator Price Feed Address either from local hardhat, testnet or mainnet
//instead of using the static price feed in PriceConverter5 library like this
//AggregatorV3Interface priceFeed = AggregatorV3Interface(
// 0x694AA1769357215DE4FAC081bf1f309aDC325306
// );
//- to achieve the above we need to refactor FundMe4.sol and PriceConverter5.sol
//- let create a state variable inside FundMe4.sol file like this
//AggregatorV3Interface public priceFeed;
//- change the constructor function from this
// constructor() {
//     i_owner = msg.sender;
// }
// to this
// constructor(address priceFeedAddress) {
//     i_owner = msg.sender;
//     priceFeed = AggregatorV3Interface(priceFeedAddress);
// }
//- in the above we called AggregatorV3Interface() constructor inside FundMe4 constructor
//function becos we want to store the price feed address of any chains onto priceFeed state
//variable instead of using static AggregatorV3Interface() constructor function in
//PriceConverter5.sol file like this
// AggregatorV3Interface priceFeed = AggregatorV3Interface(
//     0x694AA1769357215DE4FAC081bf1f309aDC325306
// );
//- let pass priceFeed parameter onto require statment in fund() function in order to send
//price feed address onto getConversionRate() function in PriceConverter5.sol like this
// require(
//     msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
//     "Didn't send enought"
// );
//- open PriceConverter5.sol file to add second parameter onto getConversionRate function
//like this
// function getConversionRate(uint256 ethAmount, AggregatorV3Interface priceFeed) internal view returns (uint256) {
//     uint256 ethPrice = getPrice(priceFeed);
//     uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
//     return ethAmountInUsd;
// }
//- pass priceFeed parameter onto getPrice() in order to get lastestRoundData() from the parameter
//priceFeed and not  AggregatorV3Interface priceFeed like this
// function getPrice(AggregatorV3Interface priceFeed) internal view returns (uint256) {
//     (, int256 price, , , ) = priceFeed.latestRoundData();
//     return uint256(price * 1e10);
// }
//- remove AggregatorV3Interface priceFeed inside the body of getPrice function and use
//priceFeed parameter to get the latestRoundData()
//- add defaultNetwork: "hardhat", right before networks object property inside hardhat.config.js file
//- let re-compile the refactor done to our contract like this
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat compile
//its return Compiled 2 Solidity files successfully
//- let write code to deploy our contract with deploy() function like this

// module.exports = async ({ getNamedAccounts, deployments }) => {
//     const { deploy, log } = deployments
//     const { deployer } = await getNamedAccounts()
//     const chainId = network.config.chainId

//     //deployment code
//     const fundMe = await deploy("FundMe4", {
//         //list of override properties
//         from: deployer,
//         args: [], //list of argument from FundMe4 contract constructor e.g priceFeedAddress
//         log: true,
//     })
// }

//- aave is a protocol that is on multiple chains, has to deploy their code to multiple chains
//and work with multiple addresses
//- helper-hardhat-config configuration file from aave to access multiple blockchains or chains network
//- let create helper-hardhat-config.js file inside the root folder
//- let setup helper-hardhat-config.js file
//go to https://docs.chain.link/data-feeds/price-feeds/addresses to copy the Price Feed Address
//for Sepolia Testnet ETH/USD past the copied Sepolia Price Feed Address on the ethUsdPriceFeed
//property of helper-hardhat-config.js file
//- let add polygon mainnet chain network onto helper-hardhat-config.js file
//go to https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon to copy the
//price feed address for Polygon mainnet ETH/US past the copied Polygon Price Feed Address on
//the ethUsdPriceFeed property onto helper-hardhat-config.js file
//- let import helper-hardhat-config onto 01-deploy-fund-me.js file like this

// const helperConfig = require("../helper-hardhat-config")
// const networkConfig = helperConfig.networkConfig
//or
// const { networkConfig } = require("../helper-hardhat-config") //destructuring

// module.exports = async ({ getNamedAccounts, deployments }) => {
//     const { deploy, log } = deployments
//     const { deployer } = await getNamedAccounts()
//     const chainId = network.config.chainId

//     //get Price Feed Address for established network like Sepolia Testnet and Polygon Mainnet
//     const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"] //get Price Feed Address from helper-hardhat-config.js

//     //deployment code
//     const fundMe = await deploy("FundMe4", {
//         //list of override properties
//         from: deployer,
//         args: [], //list of argument from FundMe4 contract constructor e.g priceFeedAddress
//         log: true,
//     })
// }

//- let create 00-deploy-mocks.js file inside deploy folder for Mock Aggregator Price Feed
//Address for Hardhat and deploy it to hardhat or local hardhat network
//- let setup 00-deploy-mocks.js file
//- import network from hardhat onto 01-deploy-fund-me.js and 00-deploy-mocks.js files in order
//to hardhat network like this const { network } = require("hardhat")

// const { networkConfig } = require("../helper-hardhat-config") //destructuring
// const { network } = require("hardhat") //indicating local network for hardhat

// module.exports = async ({ getNamedAccounts, deployments }) => {
//     const { deploy, log } = deployments
//     const { deployer } = await getNamedAccounts()
//     const chainId = network.config.chainId

//     //get Price Feed Address for established network like Sepolia Testnet and Polygon Mainnet
//     const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

//     //deployment code
//     const fundMe = await deploy("FundMe4", {
//         from: deployer,
//         args: [], //list of argument from FundMe4 contract constructor e.g priceFeedAddress
//         log: true,
//     })
// }
//- next is to create test folder inside contracts folder
//- create MockV3Aggregator.sol file in order setup our mock or fake price feed address for
//local hardhat network inside contracts/test folder
//- let go to github.com/smartcontractkit/chainlink, click on the following path
//contracts/src/v0.6/tests/MockV3Aggregator.sol
//- import this import "@chainlink/contracts/src/v0.6/tests/MockV3Aggregator.sol"; path onto
//MockV3Aggregator.sol file
//- let compile the contract like this
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat compile
//its throw the following solidity version error like this
//The Solidity version pragma statement in these files doesn't match any of the configured compilers in your config. Change the pragma or configure additional compiler versions in your hardhat config.
//- to fix the above error open hardhat.config.js file to add multiple solidity version like this
//change the solidity version from solidity: "0.8.8", to this
//solidity: { compilers: [{ version: "0.8.8" }, { version: "0.6.6" }] },
//- let re-compile like this
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat compile
//its return this Compiled 6 Solidity files successfully
//- expand artifacts folder you will @chainlink/contracts/src/v0.6/tests/MockV3Aggregator.sol
//which means that mock MockV3Aggregator.sol file has been compile too.
//- since MockV3Aggregator.sol has been compiled we now have a fake Aggregator PriceFeed Address
//to deploy to local hardhat
//- let define the local chain or blockchain in helper-hardhat-config.js file like this
// const developmentChains = ["hardhat", "localhost"]
//- import developmentChain onto 00-deploy-mocks.js file like this
// const { developmentChains } = require("../helper-hardhat-config")

// //- let complete fund-me deploy script
// const { networkConfig, developmentChains } = require("../helper-hardhat-config")
// const { network } = require("hardhat")

// module.exports = async ({ getNamedAccounts, deployments }) => {
//     const { deploy, log, get } = deployments
//     const { deployer } = await getNamedAccounts()
//     const chainId = network.config.chainId

//     //get Price Feed Address for established network like Sepolia Testnet and Polygon Mainnet
//     // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
//     let ethUsdPriceFeedAddress

//     //development chain
//     if (developmentChains.includes(network.name)) {
//         const ethUsdAggregator = await get("MockV3Aggregator")
//         ethUsdPriceFeedAddress = ethUsdAggregator.address
//     } else {
//         //established chains
//         ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
//     }

//     //deployment code
//     const fundMe = await deploy("FundMe4", {
//         from: deployer,
//         args: [ethUsdPriceFeedAddress], //list of argument from FundMe4 contract constructor e.g priceFeedAddress
//         log: true,
//     })
//     log("--------------------------------------------------------") //End of fundMe deploy scrip

//     //- let change this const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
//     //to this let ethUsdPriceFeedAddress becos we want to specify the price feed address of the
//     //established chains from local hardhat chain
//     //- pass ethUsdPriceFeedAddress onto args property which means the priceFeedAddress of
//     //either local development chain (hardhat) or established chains (testnest or mainnet)
// }
// module.exports.tags = ["all", "fundme"] //to deploy only fundme deployment script

//- let deploy the both deploy-mocks and deploy-fund-me script deployment onto local hardhat
//like this
// adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat deploy
//- anytime we run our local blockchain node with run all our deployed contract like this
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat node

//=============
//Utils Folder
//- Adding verification on etherscan

// const { networkConfig, developmentChains } = require("../helper-hardhat-config")
// const { network } = require("hardhat")
// const { verify } = require("../utils/verify")

// module.exports = async ({ getNamedAccounts, deployments }) => {
//     const { deploy, log, get } = deployments
//     const { deployer } = await getNamedAccounts()
//     const chainId = network.config.chainId

//     let ethUsdPriceFeedAddress

//     //development chain
//     if (developmentChains.includes(network.name)) {
//         const ethUsdAggregator = await get("MockV3Aggregator")
//         ethUsdPriceFeedAddress = ethUsdAggregator.address
//     } else {
//         //established chains
//         ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
//     }

//     //deployment code
//     const args = [ethUsdPriceFeedAddress]
//     const fundMe = await deploy("FundMe4", {
//         from: deployer,
//         args: args,
//         log: true,
//     })

//     //Verification on establish testnet or mainnet chains
//     if (
//         !developmentChains.includes(network.name) &&
//         process.env.ETHERSCAN_API_KEY
//     ) {
//         //verify
//         await verify(fundMe.address, args) //passing contractAddress and constructor function list of argument
//     }

//     log("--------------------------------------------------------")
// }
// module.exports.tags = ["all", "fundme"]
//- create utils folder inside the root folder
//- create verify.js file inside utils folder to verify all our deployed smart contracts
//open hardhat-simple-storage-fcc folder, open deploy.js file to copy and past verify function onto utils/verify.js file
//- since we are using run predefine function from hardhat inside utils/verify.js file
//let import it like this
//const { run } = require("hardhat")
//- let expose verify function by exporting like this module.exports = { verify }
//- let import verify function onto 01-deploy-fund-me.js file  like this
// const { verify } = require("../utils/verify")
//- change the args property from this
// args: [ethUsdPriceFeedAddress]
//to this const args = [ethUsdPriceFeedAddress]
//in order to reuse inside and object and as a argument on verify() function
//- let use verify() function like this
// await verify(fundMe.address, args)

//========
//Deploy to Sepolia Testnet

const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress

    //development chain
    if (developmentChains.includes(network.name)) {
        // if (chainId === 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        //established chains
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    //deployment code
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe4", {
        from: deployer,
        args: args,
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`FundMe deployed at ${fundMe.address}`)

    //Verification on establish testnet or mainnet chains
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        //verify
        await verify(fundMe.address, args)
    }

    log("--------------------------------------------------------")
}
module.exports.tags = ["all", "fundme"]

//- open hardhat.config.js file
//- remove the task() function, @type import, and some unecessary comment
//- remove ropsten network inside networks object and replace it with sepolia network
//- copy and past the following environment variables from last project onto hardhat.config.js like this
// const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia"
// const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
// const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
// const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"
//- copy and past the gasReporter object property as well
//- add blockConfirmations: 6, property onto sepolia object property in order to wait for
//6 block before verifying our smart contract
//- add waitConfirmations property onto object property inside 01-deploy-fund-me.js like this
//waitConfirmations: network.config.blockConfirmations || 1,
//means if their no blockConfirmations in our hardhat.config.js file wait after 1 block confirm before verify contract
//- copy and past the content of our last project onto .env file
//- let deploy fundme script deployment onto Sepolia testnet like this
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat deploy --network sepolia
//its throw this error
//TypeError: customChains is not iterable
//- to resolve the above error add customChains property onto etherscan object property like this
// etherscan: {
//     apiKey: process.env.ETHERSCAN_API_KEY,
//     customChains: [],
// },
//- let redeploy the contract on Sepolia testnet chain
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat deploy --network sepolia
//its return
//Successfully submitted source code for contract
//go to sepolia etherscan copy and past the contract address FundMe deployed at 0x859064392bc69962c9056E326315183430143a3f
//to confirm that your contract has been deployed onto Sepolia testnet
//- click on the below link to verify the contract in Etherscan
//Successfully verified contract FundMe4 on Etherscan.
// https://sepolia.etherscan.io/address/0x859064392bc69962c9056E326315183430143a3f#code

//- we have successfully deploy onto local hardhat network and sepolia testnet, we can deploy
//to any other testnet or mainnet blockchain by update hardhat.config.js and hepler-hardhat-config.js
//files with the network details

//=============
//Solidity Style Guide
//go to https://docs.soliditylang.org/en/v0.8.19/style-guide.html#order-of-layout
//Order of Layout
// Layout contract elements in the following order:
// 1. Pragma statements
// 2. Import statements
// 3. Error Codes
// 4. Interfaces
// 5. Libraries
// 6. Contracts
//- open FundMe4.sol file to label the contract in the layout order

//================
//- NatSpec Format
//Stand for Ethereum Natural Language Specification Format it is way of documenting our code by
//adding comments. They are written with a triple slash (///) or a double asterisk block
//(/** ... */) and they should be used directly above function declarations or statements.
//- go to https://docs.soliditylang.org/en/v0.8.19/style-guide.html#natspec
//- open FundMe4.sol file to add NatSpec Format
//- to automatically use NatSpec to generate documentation use this
//solc --userdoc --devdoc ex1.sol

//==========
// Inside each contract, library or interface, use the following order:
//1. Type declarations
//2. State variables
//3. Events
//4. Errors
//5. Modifiers
//6. Functions
//- let open FundMe4.sol file to array our block of code in the above order

//==========
//Order of Functions
//Ordering helps readers identify which functions they can call and to find the constructor
//and fallback definitions easier.

// Functions should be grouped according to their visibility and ordered:
//1. constructor
//2. receive function (if exists)
//3. fallback function (if exists)
//4. external
//5. public
//6. internal
//7. private

//==========
//Testing Fund Me
//Gas Optimization -> how we can make our smart contract to faster and cheaper to deploy
//- expand test folder in the root folder to remove sample-test.js file
//- create staging and unit folders inside test folder in root folder
//Unit tests is software test when individual function or method are test in the source code.
//it is done locally.
//Staging tests are done on a testnet. It is last test done before deploy the contract to mainnet.
//- Unit test can be done with the following
//1. local hardhat network
//2. forked hardhat network
//- create FundMe4.test.js file inside test/unit folder
//- setup FundMe4.test.js file

//============
//Gas Estimator -> to know how much gas this contract uses
//- open hardhat.config.js file, go to gasReporter object property
//- change enabled: false to enabled: true
//- comment coinmarketcap: COINMARKETCAP_API_KEY, of gasReporter object property
//- let rerun all our test to generate gas-report.txt file like this
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat test
//its return this gas-report.txt file with this content
// ·-------------------------|----------------------------|-------------|-----------------------------·
// |   Solc version: 0.8.8   ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 30000000 gas  │
// ··························|····························|·············|······························
// |  Methods                                                                                         │
// ·············|············|·············|··············|·············|···············|··············
// |  Contract  ·  Method    ·  Min        ·  Max         ·  Avg        ·  # calls      ·  usd (avg)  │
// ·············|············|·············|··············|·············|···············|··············
// |  FundMe4   ·  fund      ·      87344  ·      104444  ·      95894  ·           10  ·          -  │
// ·············|············|·············|··············|·············|···············|··············
// |  FundMe4   ·  withdraw  ·      35604  ·       78312  ·      56958  ·            4  ·          -  │
// ·············|············|·············|··············|·············|···············|··············
// |  Deployments            ·                                          ·  % of limit   ·             │
// ··························|·············|··············|·············|···············|··············
// |  FundMe4                ·          -  ·           -  ·     872723  ·        2.9 %  ·          -  │
// ··························|·············|··············|·············|···············|··············
// |  MockV3Aggregator       ·          -  ·           -  ·     569635  ·        1.9 %  ·          -  │
// ·-------------------------|-------------|--------------|-------------|---------------|-------------·

//==================
//Storage in Solidity
//go to  more information https://docs.soliditylang.org/en/v0.8.19/internals/layout_in_storage.html

//Storage		      memory slot space			                    contract FunWithStorage {
//[0] 0x00....19	<-----------------------------		                uint256 favoriteNumber;
//[1] 0x00....01	<------------------------------		                bool someBool;
//[2] 0x00....01  <-length of the array is stored here 	                uint256[] myArray;
//[3]	do not take slot in memory				                        uint256 constant NOT_IN_STORAGE = 123;
//[4]	do not take slot in memory				                        uint256 immutable i_owner

//      constructor(){
//          favoriteNumber = 25;
//          someBool = true;
//[keccak256(2)] 0x00..0de  <-elements are store in hash function	    myArray.push(222);
//      }

//      function doStuff() public{
//      uint256 newVar = favoriteNumber + 1;
//      uint256 otherVar = 7;
//      }
//    }

//- Each memory slot is occupy 32 bytes long and represents the bytes version of the object
//	* For example, the uint256 25 is 0x00....19, since that's the hexadecimal representation
//	* For "true" boolean, it would be 0x00....01, since that's it's hexadecimal representation
//- For dynamic values like mappings and dyamic arrays, the elements are stored using a hashing
//function. You //can see those functions in the documentation.
//	* For arrays a sequential storage spot is taken up for the length of the array.
//	* For mappings a sequential storage spot is taken up, but left blank.
//- Constants and immutable variables are not in storage slot, but they are considered part of
//the core of the bytecode of the contract.
//- variables in a function do not store in storage slot they only exist only for the
//duration of running a function. They are added onto their own memory data structure which
//get deleted after the function has complete execution.

//===========
//Gas Optimizations using storage knowledge
//- opcode show the list of amount spend as gas when deploying our contract go to
//github.com/crytic/evm-opcodes for information
//- these are the most use opcode
// 0x54	SLOAD	Load word from storage	-	800      //SLOAD means reading from chain
// 0x55	SSTORE	Save word to storage	-	20000** //SSTORE means writing onto chain which could cost 20,000 or more gas
//- let implement storage on the state or global variable in FundMe4.sol file

//============
//Gas Optimization to be gas efficient or gas reduction
//Refactor our FundMe4.sol contract in order to reduce gas price
//- we shall refactor our FundMe4.sol code one more time
//- all our state variables are still public visibility but private and internal visibility
//also reduce the cost of gas
//- uint256 public constant MINIMUM_USD = 50 * 1e18; this state variable can still be public
//becos we want the public to view the MINIMUM_USD variable
//- address public immutable i_owner; this state variable will change it to private becos the
//owner address is not need to be known to the public like this
//address private immutable i_owner;
//- let create getOwner() function in FundMe4.sol in order to access i_owner state variable
//- address[] public s_funders; change public visibility to private
//- let create getFunders() function in FundMe4.sol in order to access s_funder state variable
//- mapping(address => uint256) public s_addressToAmountFunded; change to private visibility
//- let create getAddressToAmountFunded()
//- AggregatorV3Interface public s_priceFeed; change to private visibility
//- let create getPriceFeed() function in order to access state variable s_priceFeed
//- next is to change the following predefined view or getter function to user-defined get function
//in FundMe4.test.js
//from s_funders() to getFunder()
//from s_addressToAmountFunded to getAddressToAmountFunded()
//from i_owner to getOwner()
//from s_priceFeed to getPriceFeed()

//Gas optimization
// require(
//     msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
//     "Didn't send enought ETH"
// );
//changing require() function to revert becos require function is an array that store on
//blockchain which consume more gas cost

//================
//Staging Test -> this is the test that we can use on actual testnet or established network.
//- This is the last test that we will do on testnet before deploying our contract to mainnet.
//- expanding test/staging folder to create FundMe4.staging.test.js file
//- let setup FundMe4.staging.test.js file
//- open the FundMe4.test.js file to add this line of code before the starting of the unit test
//function
// !developmentChains.includes(network.name)
//     ? describe.skip
//- which means only run these unit test on development chain only

//==============
//Running Scripts on a Local Node
//- create scripts folder in the root folder
//- create fund.js file in scripts folder
