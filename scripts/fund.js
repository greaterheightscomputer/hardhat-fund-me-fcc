const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe4", deployer)
    console.log("Funding Contract...")
    const transactionResponse = await fundMe.fund({
        value: ethers.utils.parseEther("0.1"),
    })
    await transactionResponse.wait(1)
    console.log("Funded")
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
// adduser@LAPTOP-EM3P6O44:~/hh-fcc/hardhat-fund-me-fcc$ yarn hardhat run scripts/fund.js --network localhost
//- let write withdraw script by creating withdraw.js file inside scripts folder
//- let setup withdraw.js file
