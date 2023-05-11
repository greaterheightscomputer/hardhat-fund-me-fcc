const networkConfig = {
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
    137: {
        name: "polygon",
        ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    },
    // 31337: use Mock Aggregator Price Feed Address for hardhat network
}

//defining the local blockchain network
const developmentChains = ["hardhat", "localhost"]
const DECIMALS = 8 //eight zeros
const INITIAL_ANSWER = 200000000000 //2000 with eight zeros

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
}
