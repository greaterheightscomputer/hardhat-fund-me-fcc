// describe("FundMe4", function () {
//     beforeEach()
// })
//- let run the test script like this
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat test
//- let run the coverage script in order to return the tested and non-tested solidity file like this
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat coverage

// //==================
// //- Let start writing test function

// const { deployments, ethers, getNamedAccounts } = require("hardhat")
// const { assert, expect } = require("chai")

// //Let start testing
// describe("FundMe4", function () {
//     let fundMe
//     let deployer
//     let mockV3Aggregator
//     const sendValue = ethers.utils.parseEther("1") //its the same as 1000000000000000000 or 1ETH

//     beforeEach(async function () {
//         // const accounts = await ethers.getSigners() //return the 10 accounts in local hardhat
//         // const accountZero = accounts[0] //its return accounts:[PRIVATE_KEY] propery of sepolia object property in hardhat.config.js file
//         //alternative is const { deployer } = await getNamedAccounts()
//         deployer = (await getNamedAccounts()).deployer
//         //deployments object to deploy the contract onto local hardhat chain
//         await deployments.fixture(["all"]) //fixture function allow us to run script in the deploy folder with many tags as we want
//         fundMe = await ethers.getContract("FundMe4", deployer) //get the most recent compiled FundMe4 contract
//         mockV3Aggregator = await ethers.getContract(
//             "MockV3Aggregator",
//             deployer
//         )
//     })

//     //============
//     //test function for constructor function
//     describe("constructor", async function () {
//         it("sets the aggregator addresses correctly", async function () {
//             //s_priceFeed() is getter or view function
//             const response = await fundMe.s_priceFeed()
//             console.log("s_priceFeedAddress: ", response)
//             assert.equal(response, mockV3Aggregator.address)
//         })
//     })
//     //- let run the test script like this
//     //adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat test
//     //- delete receive and fallback function in FundMe4.sol file

//     //============
//     //test function for fund function
//     //- let write test for this part of fund function
//     // require(
//     //     msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
//     //     "Didn't send enought ETH"
//     // );
//     // describe("fund", async function () {
//     //     it("Fails if you don't send enough ETH", async function () {
//     //         await fundMe.fund()
//     //     })
//     // })
//     //- let run test script like this
//     //adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat test
//     //- the above test function return an error which is ok becos we want to tell the test
//     //function that is ok lik that
//     //- let check out the waffle documentation by going to https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
//     //- Waffle is a framework for testing smart contracts.
//     //- import expect function from chai like this
//     //const { assert, expect } = require("chai")
//     //- let use expect function like this
//     describe("fund", async function () {
//         it("Fails if you don't send enough ETH", async function () {
//             await expect(fundMe.fund()).to.be.revertedWith(
//                 "Didn't send enought ETH"
//             ) //make sure the revert error is the same with what you have in FundMe4.sol file like this
//             // require(msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD, "Didn't send enought ETH");
//         })
//         //- let run test script like this
//         //adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat test

//         //===============
//         //- let write test function for this part of fund function
//         // s_addressToAmountFunded[msg.sender] += msg.value;
//         it("updated the amount funded data structure", async function () {
//             await fundMe.fund({ value: sendValue })
//             //when the funder address is pass onto s_addressToAmountFunded getter function its return the amount in ether
//             const response = await fundMe.s_addressToAmountFunded(deployer) //getter or view function of s_addressToAmountFunded
//             console.log("s_addressToAmountFunded: ", response.toString()) //1000000000000000000
//             assert.equal(response.toString(), sendValue.toString())
//         })
//         //- let run test script like this
//         //adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat test --grep "amount funded" //--grep with "amount funded" is from the label of this function in order to run only this function
//         //- let run coverage script in order to view how far we have gone with our testing like this
//         //adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat coverage

//         //=============
//         //- let write test function for this part of fund function
//         //s_funders.push(msg.sender);
//         it("Adds funder to array of s_funders", async function () {
//             await fundMe.fund({ value: sendValue })
//             const funder = await fundMe.s_funders(0) //s_funders getter function
//             console.log("s_fundersAddress: ", funder)
//             assert.equal(funder, deployer)
//         })
//         //- let run test script like this
//         //adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat test --grep "funder to array"
//     })

//     describe("withdraw", async function () {
//         //before each test function in this withdraw scope run let fund the fundMe contract
//         //1st like this
//         beforeEach(async function () {
//             await fundMe.fund({ value: sendValue })
//         })
//         it("Withdraw ETH from a single funder", async function () {
//             const startingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             )
//             console.log(
//                 "startingFundMeBalance: ",
//                 startingFundMeBalance.toString()
//             )
//             const startingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             )
//             console.log(
//                 "startingDeployerBalance: ",
//                 startingDeployerBalance.toString()
//             )

//             const transactionResponse = await fundMe.withdraw()
//             const transactionReceipt = await transactionResponse.wait(1)
//             // console.log("transactionReceipt: ", transactionReceipt)
//             const { gasUsed, effectiveGasPrice } = transactionReceipt
//             console.log(
//                 "gasUsed: ",
//                 gasUsed.toString(),
//                 "effectiveGasPrice: ",
//                 effectiveGasPrice.toString()
//             )
//             // const gasCost = gasUsed * effectiveGasPrice //both variables are BigNumber type which javascript do not understand so let use mul() function of BigNumber type like this
//             const gasCost = gasUsed.mul(effectiveGasPrice)
//             console.log("gasCost: ", gasCost.toString())
//             const endingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             )
//             console.log("endingFundMeBalance: ", endingFundMeBalance.toString())
//             const endingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             )
//             console.log(
//                 "endingDeployerBalance: ",
//                 endingDeployerBalance.toString()
//             )

//             assert.equal(endingFundMeBalance, 0)
//             assert.equal(
//                 // startingFundMeBalance + startingDeployerBalance, //both variables are BigNumber type so let use add() function of BigNumber
//                 startingFundMeBalance.add(startingDeployerBalance).toString(),
//                 endingDeployerBalance.add(gasCost).toString()
//             )
//         })
//         //- let run test script like this
//         //adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat test --grep "withdraw"

//         //=============
//         //let write test function for multiple s_funders or deployers or accounts
//         it("allows us to withdraw with multiple s_funders", async function () {
//             //Arrange
//             const accounts = await ethers.getSigners() //return multiple accounts array
//             for (let i = 1; i < 6; i++) {
//                 //we start with i=1 becos 0 is deployer account
//                 const fundMeConnectedContract = await fundMe.connect(
//                     //connect function means we are telling our contract to connect to these new accounts becos anytime we call fundMe contract its only connected to deployer account
//                     accounts[i]
//                 )
//                 // console.log("accounts: ", accounts)
//                 // console.log(`accountsAddress:${[i]}, ${accounts[i].address}`)
//                 await fundMeConnectedContract.fund({ value: sendValue }) //funding or adding ether onto the new accounts
//             }
//             const startingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             )

//             const startingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             )

//             //Act
//             const transactionResponse = await fundMe.withdraw()
//             const transactionReceipt = await transactionResponse.wait(1)
//             const { gasUsed, effectiveGasPrice } = transactionReceipt
//             const gasCost = gasUsed.mul(effectiveGasPrice)

//             //Assert
//             const endingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             )

//             const endingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             )

//             assert.equal(endingFundMeBalance, 0)
//             assert.equal(
//                 startingFundMeBalance.add(startingDeployerBalance).toString(),
//                 endingDeployerBalance.add(gasCost).toString()
//             )

//             //Make sure that the s_funders are reset properly
//             await expect(fundMe.s_funders(0)).to.be.reverted //checking if s_funders() getter function is 0

//             //let make sure each new accounts is reset to equal zero
//             for (let i = 1; i < 6; i++) {
//                 assert.equal(
//                     await fundMe.s_addressToAmountFunded(accounts[i].address),
//                     0
//                 )
//             }
//         })
//         //- let run test script like this
//         //adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat test --grep "allows us to"

//         //===========
//         //- let write test function for the modifier function
//         // modifier onlyOwner() {
//         //     if (msg.sender != i_owner) {
//         //         revert FundMe__NotOwner();
//         //     }
//         //     _;
//         // }
//         //When other account call withdraw they should be atomatically reverted
//         it("Only allows the owner to withdraw", async function () {
//             const accounts = await ethers.getSigners()
//             const attacker = accounts[1]
//             const attackerConnectedToContract = await fundMe.connect(attacker)
//             await expect(
//                 attackerConnectedToContract.withdraw()
//             ).to.be.revertedWith("FundMe__NotOwner") //passing custom error onto revertedWith function
//         })

//         //=============
//         //- let change the calling of withdraw() function to cheaperWithdraw() function
//         it("cheaper withdraw test...", async function () {
//             //Arrange
//             const accounts = await ethers.getSigners()
//             for (let i = 1; i < 6; i++) {
//                 const fundMeConnectedContract = await fundMe.connect(
//                     accounts[i]
//                 )

//                 await fundMeConnectedContract.fund({ value: sendValue })
//             }
//             const startingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             )

//             const startingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             )

//             //Act
//             const transactionResponse = await fundMe.cheaperWithdraw()
//             const transactionReceipt = await transactionResponse.wait(1)
//             const { gasUsed, effectiveGasPrice } = transactionReceipt
//             const gasCost = gasUsed.mul(effectiveGasPrice)

//             //Assert
//             const endingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             )

//             const endingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             )

//             assert.equal(endingFundMeBalance, 0)
//             assert.equal(
//                 startingFundMeBalance.add(startingDeployerBalance).toString(),
//                 endingDeployerBalance.add(gasCost).toString()
//             )

//             //Make sure that the s_funders are reset properly
//             await expect(fundMe.s_funders(0)).to.be.reverted

//             //let make sure each new accounts is reset to equal zero
//             for (let i = 1; i < 6; i++) {
//                 assert.equal(
//                     await fundMe.s_addressToAmountFunded(accounts[i].address),
//                     0
//                 )
//             }
//             //- let change the following state variables inside FundMe4.test.js file
//             //priceFeed to s_priceFeed
//             //s_addressToAmountFunded to s_addressToAmountFunded
//             //funders to s_funder
//             //- let run test script like this
//             //adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat test
//             //- let view gas-report.txt file Avg is the same as Max of cheaperWithdraw() which is 77727
//             //this means that Max of cheaperWithdraw() is cheaper than withdraw() Max
//             //- let uncomment coinmarketcap: COINMARKETCAP_API_KEY, inside hardhat.config.js file
//             //- copy and past "Withdraw ETH from a single funder" test and change withdraw() to cheaperWithdraw()
//         })

//         it("Withdraw ETH from a single funder", async function () {
//             const startingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             )
//             const startingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             )

//             const transactionResponse = await fundMe.cheaperWithdraw()
//             const transactionReceipt = await transactionResponse.wait(1)
//             const { gasUsed, effectiveGasPrice } = transactionReceipt

//             const gasCost = gasUsed.mul(effectiveGasPrice)
//             const endingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             )

//             const endingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             )

//             assert.equal(endingFundMeBalance, 0)
//             assert.equal(
//                 startingFundMeBalance.add(startingDeployerBalance).toString(),
//                 endingDeployerBalance.add(gasCost).toString()
//             )
//             //- let run test script like this
//             //adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat test
//             //- open gas-report.txt file to view how much dollar will cost to run our test on
//             //Polygon or MATIC blockchain
//             //its cost zero dollar to run withdraw() and cheaperWithdraw() test on Matic chain
//             //- open hardhat.config.js file to change token: "MATIC", to token: "ETH", property
//             //of gasReporter object property
//             //- let re-run test script like this
//             //adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat test
//             //- open gas-report.txt file to view how much dollar will cost to run our test on
//             //Ethereum blockchain
//             //- its cost 8.75usd to run cheaperWithdraw() and its cost 8.79usd to run withdraw()
//             //test function on Ethereum blockchain
//             //back to 01-deploy-fund-me.js file
//         })
//     })
// })

//==============
//Gas Optimization ->gas cost reduction
//Change the predefined getter or view function to user-defined function
//from s_funders() to getFunder()
//from s_addressToAmountFunded to getAddressToAmountFunded()
//from i_owner to getOwner()
//from s_priceFeed to getPriceFeed()

// const { deployments, ethers, getNamedAccounts } = require("hardhat")
// const { assert, expect } = require("chai")

// //Let start testing
// describe("FundMe4", function () {
//     let fundMe
//     let deployer
//     let mockV3Aggregator
//     const sendValue = ethers.utils.parseEther("1")

//     beforeEach(async function () {
//         deployer = (await getNamedAccounts()).deployer
//         await deployments.fixture(["all"])
//         fundMe = await ethers.getContract("FundMe4", deployer)
//         mockV3Aggregator = await ethers.getContract(
//             "MockV3Aggregator",
//             deployer
//         )
//     })

//     //============
//     //test function for constructor function
//     describe("constructor", async function () {
//         it("sets the aggregator addresses correctly", async function () {
//             const response = await fundMe.getPriceFeed()
//             console.log("s_priceFeedAddress: ", response)
//             assert.equal(response, mockV3Aggregator.address)
//         })
//     })

//     //============
//     //- test function for fund function
//     describe("fund", async function () {
//         it("Fails if you don't send enough ETH", async function () {
//             await expect(fundMe.fund()).to.be.revertedWith(
//                 "Didn't send enought ETH"
//             )
//         })

//         //===============
//         //- let write test function for this part of fund function
//         it("updated the amount funded data structure", async function () {
//             await fundMe.fund({ value: sendValue })
//             const response = await fundMe.getAddressToAmountFunded(deployer)
//             assert.equal(response.toString(), sendValue.toString())
//         })

//         //=============
//         //- let write test function for this part of fund function
//         it("Adds funder to array of s_funders", async function () {
//             await fundMe.fund({ value: sendValue })
//             const funder = await fundMe.getFunder(0)
//             assert.equal(funder, deployer)
//         })
//     })

//     describe("withdraw", async function () {
//         beforeEach(async function () {
//             await fundMe.fund({ value: sendValue })
//         })
//         it("Withdraw ETH from a single funder", async function () {
//             const startingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             )
//             const startingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             )

//             const transactionResponse = await fundMe.withdraw()
//             const transactionReceipt = await transactionResponse.wait(1)
//             const { gasUsed, effectiveGasPrice } = transactionReceipt

//             const gasCost = gasUsed.mul(effectiveGasPrice)

//             const endingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             )
//             const endingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             )

//             assert.equal(endingFundMeBalance, 0)
//             assert.equal(
//                 startingFundMeBalance.add(startingDeployerBalance).toString(),
//                 endingDeployerBalance.add(gasCost).toString()
//             )
//         })

//         //=============
//         //let write test function for multiple s_funders or deployers or accounts
//         it("allows us to withdraw with multiple s_funders", async function () {
//             //Arrange
//             const accounts = await ethers.getSigners()
//             for (let i = 1; i < 6; i++) {
//                 const fundMeConnectedContract = await fundMe.connect(
//                     accounts[i]
//                 )
//                 await fundMeConnectedContract.fund({ value: sendValue })
//             }

//             const startingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             )
//             const startingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             )

//             //Act
//             const transactionResponse = await fundMe.withdraw()
//             const transactionReceipt = await transactionResponse.wait(1)
//             const { gasUsed, effectiveGasPrice } = transactionReceipt
//             const gasCost = gasUsed.mul(effectiveGasPrice)

//             //Assert
//             const endingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             )
//             const endingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             )

//             assert.equal(endingFundMeBalance, 0)
//             assert.equal(
//                 startingFundMeBalance.add(startingDeployerBalance).toString(),
//                 endingDeployerBalance.add(gasCost).toString()
//             )

//             //Make sure that the s_funders are reset properly
//             await expect(fundMe.getFunder(0)).to.be.reverted

//             //let make sure each new accounts is reset to equal zero
//             for (let i = 1; i < 6; i++) {
//                 assert.equal(
//                     await fundMe.getAddressToAmountFunded(accounts[i].address),
//                     0
//                 )
//             }
//         })

//         it("Only allows the owner to withdraw", async function () {
//             const accounts = await ethers.getSigners()
//             const attacker = accounts[1]
//             const attackerConnectedToContract = await fundMe.connect(attacker)
//             await expect(
//                 attackerConnectedToContract.withdraw()
//             ).to.be.revertedWith("FundMe__NotOwner")
//         })

//         //=============
//         //- let change the calling of withdraw() function to cheaperWithdraw() function
//         it("cheaper withdraw test...", async function () {
//             //Arrange
//             const accounts = await ethers.getSigners()
//             for (let i = 1; i < 6; i++) {
//                 const fundMeConnectedContract = await fundMe.connect(
//                     accounts[i]
//                 )

//                 await fundMeConnectedContract.fund({ value: sendValue })
//             }
//             const startingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             )

//             const startingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             )

//             //Act
//             const transactionResponse = await fundMe.cheaperWithdraw()
//             const transactionReceipt = await transactionResponse.wait(1)
//             const { gasUsed, effectiveGasPrice } = transactionReceipt
//             const gasCost = gasUsed.mul(effectiveGasPrice)

//             //Assert
//             const endingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             )

//             const endingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             )

//             assert.equal(endingFundMeBalance, 0)
//             assert.equal(
//                 startingFundMeBalance.add(startingDeployerBalance).toString(),
//                 endingDeployerBalance.add(gasCost).toString()
//             )

//             //Make sure that the s_funders are reset properly
//             await expect(fundMe.getFunder(0)).to.be.reverted

//             //let make sure each new accounts is reset to equal zero
//             for (let i = 1; i < 6; i++) {
//                 assert.equal(
//                     await fundMe.getAddressToAmountFunded(accounts[i].address),
//                     0
//                 )
//             }
//         })

//         it("Withdraw ETH from a single funder", async function () {
//             const startingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             )
//             const startingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             )

//             const transactionResponse = await fundMe.cheaperWithdraw()
//             const transactionReceipt = await transactionResponse.wait(1)
//             const { gasUsed, effectiveGasPrice } = transactionReceipt

//             const gasCost = gasUsed.mul(effectiveGasPrice)
//             const endingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             )
//             const endingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             )

//             assert.equal(endingFundMeBalance, 0)
//             assert.equal(
//                 startingFundMeBalance.add(startingDeployerBalance).toString(),
//                 endingDeployerBalance.add(gasCost).toString()
//             )
//         })
//     })
//     //- let run test script to make sure that all our code refactor is working properly  like this
//     //adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat test
// })

//============
//Run this test function only on development chain

const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe4", function () {
          let fundMe
          let deployer
          let mockV3Aggregator
          const sendValue = ethers.utils.parseEther("1")

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              fundMe = await ethers.getContract("FundMe4", deployer)
              mockV3Aggregator = await ethers.getContract(
                  "MockV3Aggregator",
                  deployer
              )
          })

          //============
          //test function for constructor function
          describe("constructor", async function () {
              it("sets the aggregator addresses correctly", async function () {
                  const response = await fundMe.getPriceFeed()
                  assert.equal(response, mockV3Aggregator.address)
              })
          })

          //============
          //- test function for fund function
          describe("fund", async function () {
              it("Fails if you don't send enough ETH", async function () {
                  await expect(fundMe.fund()).to.be.revertedWith(
                      "Didn't send enought ETH"
                  )
              })

              //===============
              //- let write test function for this part of fund function
              it("updated the amount funded data structure", async function () {
                  await fundMe.fund({ value: sendValue })
                  const response = await fundMe.getAddressToAmountFunded(
                      deployer
                  )
                  assert.equal(response.toString(), sendValue.toString())
              })

              //=============
              //- let write test function for this part of fund function
              it("Adds funder to array of s_funders", async function () {
                  await fundMe.fund({ value: sendValue })
                  const funder = await fundMe.getFunder(0)
                  assert.equal(funder, deployer)
              })
          })

          describe("withdraw", async function () {
              beforeEach(async function () {
                  await fundMe.fund({ value: sendValue })
              })
              it("Withdraw ETH from a single funder", async function () {
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait(1)
                  const { gasUsed, effectiveGasPrice } = transactionReceipt

                  const gasCost = gasUsed.mul(effectiveGasPrice)

                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  assert.equal(endingFundMeBalance, 0)
                  assert.equal(
                      startingFundMeBalance
                          .add(startingDeployerBalance)
                          .toString(),
                      endingDeployerBalance.add(gasCost).toString()
                  )
              })

              //=============
              //let write test function for multiple s_funders or deployers or accounts
              it("allows us to withdraw with multiple s_funders", async function () {
                  //Arrange
                  const accounts = await ethers.getSigners()
                  for (let i = 1; i < 6; i++) {
                      const fundMeConnectedContract = await fundMe.connect(
                          accounts[i]
                      )
                      await fundMeConnectedContract.fund({ value: sendValue })
                  }

                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  //Act
                  const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait(1)
                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const gasCost = gasUsed.mul(effectiveGasPrice)

                  //Assert
                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  assert.equal(endingFundMeBalance, 0)
                  assert.equal(
                      startingFundMeBalance
                          .add(startingDeployerBalance)
                          .toString(),
                      endingDeployerBalance.add(gasCost).toString()
                  )

                  //Make sure that the s_funders are reset properly
                  await expect(fundMe.getFunder(0)).to.be.reverted

                  //let make sure each new accounts is reset to equal zero
                  for (let i = 1; i < 6; i++) {
                      assert.equal(
                          await fundMe.getAddressToAmountFunded(
                              accounts[i].address
                          ),
                          0
                      )
                  }
              })

              it("Only allows the owner to withdraw", async function () {
                  const accounts = await ethers.getSigners()
                  const attacker = accounts[1]
                  const attackerConnectedToContract = await fundMe.connect(
                      attacker
                  )
                  await expect(
                      attackerConnectedToContract.withdraw()
                  ).to.be.revertedWith("FundMe__NotOwner")
              })

              //=============
              //- let change the calling of withdraw() function to cheaperWithdraw() function
              it("cheaper withdraw test...", async function () {
                  //Arrange
                  const accounts = await ethers.getSigners()
                  for (let i = 1; i < 6; i++) {
                      const fundMeConnectedContract = await fundMe.connect(
                          accounts[i]
                      )

                      await fundMeConnectedContract.fund({ value: sendValue })
                  }
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)

                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  //Act
                  const transactionResponse = await fundMe.cheaperWithdraw()
                  const transactionReceipt = await transactionResponse.wait(1)
                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const gasCost = gasUsed.mul(effectiveGasPrice)

                  //Assert
                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )

                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  assert.equal(endingFundMeBalance, 0)
                  assert.equal(
                      startingFundMeBalance
                          .add(startingDeployerBalance)
                          .toString(),
                      endingDeployerBalance.add(gasCost).toString()
                  )

                  //Make sure that the s_funders are reset properly
                  await expect(fundMe.getFunder(0)).to.be.reverted

                  //let make sure each new accounts is reset to equal zero
                  for (let i = 1; i < 6; i++) {
                      assert.equal(
                          await fundMe.getAddressToAmountFunded(
                              accounts[i].address
                          ),
                          0
                      )
                  }
              })

              it("Withdraw ETH from a single funder", async function () {
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  const transactionResponse = await fundMe.cheaperWithdraw()
                  const transactionReceipt = await transactionResponse.wait(1)
                  const { gasUsed, effectiveGasPrice } = transactionReceipt

                  const gasCost = gasUsed.mul(effectiveGasPrice)
                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  assert.equal(endingFundMeBalance, 0)
                  assert.equal(
                      startingFundMeBalance
                          .add(startingDeployerBalance)
                          .toString(),
                      endingDeployerBalance.add(gasCost).toString()
                  )
              })
          })
          //- let run test script to see if it is passing like this
          //adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat test
      })
