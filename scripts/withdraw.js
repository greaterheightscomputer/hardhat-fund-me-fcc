const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe4", deployer)
    console.log("Funding....")
    const transactionResponse = await fundMe.withdraw()
    await transactionResponse.wait(1)
    console.log("Go it back!")
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

//- let run script on local node on one terminal like this
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat node
//- let run script for fund.js on other terminal like this
// adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat run scripts/withdraw.js --network localhost

//===========
//Adding scripts to your package.json file
//- open package.json file, add scripts object in order to make run script command easy like this
// "scripts": {
//     "test": "yarn hardhat test",
//     "test:staging": "yarn hardhat test --network sepolia",
//     "lint": "yarn solhint 'contracts/*.sol'",
//     "lint:fix": "yarn solhint 'contracts/*.sol' --fix",
//     "format": "yarn prettier --write .",
//     "coverage": "yarn hardhat coverage"
//   }
//- let run each script to see whether they are all working properly
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn test       //to run the unit testing
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn test:staging //to run the staging testing
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn lint       //to deletect bugs or error in our code
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn lint:fix   //to fix the bugs or error
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn format     // to format our code
// adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn coverage  // to see if our code is well tested

//- let add the following properties onto package.json file
//   "name": "hardhat-fund-me",
//   "author": "Khadijat",
//   "version": "1.0.0",

//- let remove the following libraries from package.json file since we are not using them
//     "eslint": "^7.29.0",
//     "eslint-config-prettier": "^8.3.0",
//     "eslint-config-standard": "^16.0.3",
//     "eslint-plugin-import": "^2.23.4",
//     "eslint-plugin-node": "^11.1.0",
//     "eslint-plugin-prettier": "^3.4.0",
//     "eslint-plugin-promise": "^5.1.0",
//like this
// adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn remove eslint eslint-config-prettier eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-prettier eslint-plugin-promise

//================
//Pushing to GitHub
//- go to github.com to Sign in or Sign up
//- click on New Repositories button
//- Repository Name: hardhat-fund-me-fcc
//- Description (optional): Learning Solidity Smart Contracts on Blockchain Technology
//- Public
//- click on Create repository button

//- check your git version to know if you have installed github or not like this
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ git --version
//its return this: git version 2.34.1
//- let initialize our main branch in github like this
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ git init -b main
//- open .gitignore file you will see that all the folders and files list inside .gitignore
//file are in grey color, its becos we are not pushing them to github
//- let to view the untracked files like this
//adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ git status
//- let add deloyments folder onto .gitignore file
