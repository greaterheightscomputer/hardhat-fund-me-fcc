// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.8;

// import "./PriceConverter5.sol";

// error NotOwner();

// contract FundMe4 {
//     using PriceConverter5 for uint256;

//     uint256 public constant MINIMUM_USD = 50 * 1e18;
//     address[] public funders;
//     mapping(address => uint256) public addressToAmountFunded;
//     address public immutable i_owner;

//     constructor() {
//         i_owner = msg.sender;
//     }

//     function fund() public payable {
//         require(
//             msg.value.getConversionRate() >= MINIMUM_USD,
//             "Didn't send enought"
//         );
//         funders.push(msg.sender);
//         addressToAmountFunded[msg.sender] += msg.value;
//     }

//     modifier onlyOwner() {
//         // require(msg.sender == i_owner, "Sender is not owner!");
//         if (msg.sender != i_owner) {
//             revert NotOwner();
//         }
//         _;
//     }

//     function withdraw() public onlyOwner {
//         for (
//             uint256 funderIndex = 0;
//             funderIndex < funders.length;
//             funderIndex++
//         ) {
//             address funder = funders[funderIndex];
//             addressToAmountFunded[funder] = 0;
//         }

//         funders = new address[](0);

//         (bool callSuccess, ) = payable(msg.sender).call{
//             value: address(this).balance
//         }("");
//         require(callSuccess, "Call failed");
//     }

//     //- What happens if someone sends Ether to this contract without calling the fund function
//     //receive function will automatically call fund function
//     receive() external payable {
//         fund();
//     }

//     //- if people call function that does not exist in this contract
//     //fallback function will automatically call fund function
//     fallback() external payable {
//         fund();
//     }
// }

//===============
//Refactor FundMe4 for Aggregator Price Feeed Address

// pragma solidity ^0.8.8;

// import "./PriceConverter5.sol";

// error NotOwner();

// contract FundMe4 {
//     using PriceConverter5 for uint256;

//     uint256 public constant MINIMUM_USD = 50 * 1e18;
//     address[] public funders;
//     mapping(address => uint256) public addressToAmountFunded;
//     address public immutable i_owner;

//     AggregatorV3Interface public priceFeed; //get the priceFeed address value depending on the chain we are using

//     constructor(address priceFeedAddress) {
//         i_owner = msg.sender;
//         priceFeed = AggregatorV3Interface(priceFeedAddress);
//     }

//     function fund() public payable {
//         require(
//             msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
//             "Didn't send enought"
//         );
//         funders.push(msg.sender);
//         addressToAmountFunded[msg.sender] += msg.value;
//     }

//     modifier onlyOwner() {
//         if (msg.sender != i_owner) {
//             revert NotOwner();
//         }
//         _;
//     }

//     function withdraw() public onlyOwner {
//         for (
//             uint256 funderIndex = 0;
//             funderIndex < funders.length;
//             funderIndex++
//         ) {
//             address funder = funders[funderIndex];
//             addressToAmountFunded[funder] = 0;
//         }

//         funders = new address[](0);

//         (bool callSuccess, ) = payable(msg.sender).call{
//             value: address(this).balance
//         }("");
//         require(callSuccess, "Call failed");
//     }

//     receive() external payable {
//         fund();
//     }

//     fallback() external payable {
//         fund();
//     }
// }

//==============
//Order of Layout
// Layout contract elements in the following order:

// // 1. Pragma statements
// pragma solidity ^0.8.8;

// // 2. Import statements
// import "./PriceConverter5.sol";

// // 3. Error Codes -> its a good pratice to add contract name before the error code in order
// //to easily know the contract that throw an error like this
// error FundMe__NotOwner();

// //if we have any 4. Interfaces and 5. Libraries insert it here

// // 6. Contracts
// contract FundMe4 {
//     using PriceConverter5 for uint256;

//     uint256 public constant MINIMUM_USD = 50 * 1e18;
//     address[] public funders;
//     mapping(address => uint256) public addressToAmountFunded;
//     address public immutable i_owner;

//     AggregatorV3Interface public priceFeed;

//     constructor(address priceFeedAddress) {
//         i_owner = msg.sender;
//         priceFeed = AggregatorV3Interface(priceFeedAddress);
//     }

//     function fund() public payable {
//         require(
//             msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
//             "Didn't send enought"
//         );
//         funders.push(msg.sender);
//         addressToAmountFunded[msg.sender] += msg.value;
//     }

//     modifier onlyOwner() {
//         if (msg.sender != i_owner) {
//             revert FundMe__NotOwner();
//         }
//         _;
//     }

//     function withdraw() public onlyOwner {
//         for (
//             uint256 funderIndex = 0;
//             funderIndex < funders.length;
//             funderIndex++
//         ) {
//             address funder = funders[funderIndex];
//             addressToAmountFunded[funder] = 0;
//         }

//         funders = new address[](0);

//         (bool callSuccess, ) = payable(msg.sender).call{
//             value: address(this).balance
//         }("");
//         require(callSuccess, "Call failed");
//     }

//     receive() external payable {
//         fund();
//     }

//     fallback() external payable {
//         fund();
//     }
// }

//================
//- NatSpec Format

// pragma solidity ^0.8.8;

// import "./PriceConverter5.sol";

// error FundMe__NotOwner();

// /// @title A contract for crowd funding
// /// @author Khadijat
// /// @notice This contract is to demo a sample funding contract
// /// @dev This implements price feeds as our library
// //alternatively
// /**
//  * @title A contract for crowd funding
//  * @author Khadijat
//  * @notice This contract is to demo a sample funding contract
//  * @dev This implements price feeds as our library
//  */
// contract FundMe4 {
//     using PriceConverter5 for uint256;

//     uint256 public constant MINIMUM_USD = 50 * 1e18;
//     address[] public funders;
//     mapping(address => uint256) public addressToAmountFunded;
//     address public immutable i_owner;

//     AggregatorV3Interface public priceFeed;

//     constructor(address priceFeedAddress) {
//         i_owner = msg.sender;
//         priceFeed = AggregatorV3Interface(priceFeedAddress);
//     }

//     function fund() public payable {
//         require(
//             msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
//             "Didn't send enought"
//         );
//         funders.push(msg.sender);
//         addressToAmountFunded[msg.sender] += msg.value;
//     }

//     modifier onlyOwner() {
//         if (msg.sender != i_owner) {
//             revert FundMe__NotOwner();
//         }
//         _;
//     }

//     function withdraw() public onlyOwner {
//         for (
//             uint256 funderIndex = 0;
//             funderIndex < funders.length;
//             funderIndex++
//         ) {
//             address funder = funders[funderIndex];
//             addressToAmountFunded[funder] = 0;
//         }

//         funders = new address[](0);

//         (bool callSuccess, ) = payable(msg.sender).call{
//             value: address(this).balance
//         }("");
//         require(callSuccess, "Call failed");
//     }

//     receive() external payable {
//         fund();
//     }

//     fallback() external payable {
//         fund();
//     }
// }

//==============
// Inside each contract, library or interface, use the following order:

// pragma solidity ^0.8.8;

// import "./PriceConverter5.sol";

// error FundMe__NotOwner();

// /**
//  * @title A contract for crowd funding
//  * @author Khadijat
//  * @notice This contract is to demo a sample funding contract
//  * @dev This implements price feeds as our library
//  */

// contract FundMe4 {
//     //1. Type declarations
//     using PriceConverter5 for uint256;

//     //2. State variables
//     uint256 public constant MINIMUM_USD = 50 * 1e18;
//     address[] public funders;
//     mapping(address => uint256) public addressToAmountFunded;
//     address public immutable i_owner;

//     AggregatorV3Interface public priceFeed;

//     //3. Events - we don't have events in this contract

//     //4. Errors

//     //5. Modifiers
//     modifier onlyOwner() {
//         if (msg.sender != i_owner) {
//             revert FundMe__NotOwner();
//         }
//         _;
//     }

//     constructor(address priceFeedAddress) {
//         i_owner = msg.sender;
//         priceFeed = AggregatorV3Interface(priceFeedAddress);
//     }

//     function fund() public payable {
//         require(
//             msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
//             "Didn't send enought"
//         );
//         funders.push(msg.sender);
//         addressToAmountFunded[msg.sender] += msg.value;
//     }

//     function withdraw() public onlyOwner {
//         for (
//             uint256 funderIndex = 0;
//             funderIndex < funders.length;
//             funderIndex++
//         ) {
//             address funder = funders[funderIndex];
//             addressToAmountFunded[funder] = 0;
//         }

//         funders = new address[](0);

//         (bool callSuccess, ) = payable(msg.sender).call{
//             value: address(this).balance
//         }("");
//         require(callSuccess, "Call failed");
//     }

//     receive() external payable {
//         fund();
//     }

//     fallback() external payable {
//         fund();
//     }
// }

// //=================
// // Order of Functions

// pragma solidity ^0.8.8;

// import "./PriceConverter5.sol";

// error FundMe__NotOwner();

// /**
//  * @title A contract for crowd funding
//  * @author Khadijat
//  * @notice This contract is to demo a sample funding contract
//  * @dev This implements price feeds as our library
//  */

// contract FundMe4 {
//     //1. Type declarations
//     using PriceConverter5 for uint256;

//     //2. State variables
//     uint256 public constant MINIMUM_USD = 50 * 1e18;
//     address[] public funders;
//     mapping(address => uint256) public addressToAmountFunded;
//     address public immutable i_owner;

//     AggregatorV3Interface public priceFeed;

//     //3. Events - we don't have events in this contract

//     //4. Errors

//     //5. Modifiers
//     modifier onlyOwner() {
//         if (msg.sender != i_owner) {
//             revert FundMe__NotOwner();
//         }
//         _;
//     }

//     //Order Function: //1. constructor
//     constructor(address priceFeedAddress) {
//         i_owner = msg.sender;
//         priceFeed = AggregatorV3Interface(priceFeedAddress);
//     }

//     //Order Function: //4. external
//     //Order Function: //2. receive function (if exists)
//     receive() external payable {
//         fund();
//     }

//     //Order Function: //4. external
//     //Order Function: //3. fallback function (if exists)
//     fallback() external payable {
//         fund();
//     }

//     /**
//      * @notice This function funds this contract
//      * @dev This implements price feeds as our library
//      */

//     //Order Function: //5. public
//     function fund() public payable {
//         require(
//             msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
//             "Didn't send enought"
//         );
//         funders.push(msg.sender);
//         addressToAmountFunded[msg.sender] += msg.value;
//     }

//     //Order Function: //5. public
//     function withdraw() public onlyOwner {
//         for (
//             uint256 funderIndex = 0;
//             funderIndex < funders.length;
//             funderIndex++
//         ) {
//             address funder = funders[funderIndex];
//             addressToAmountFunded[funder] = 0;
//         }

//         funders = new address[](0);

//         (bool callSuccess, ) = payable(msg.sender).call{
//             value: address(this).balance
//         }("");
//         require(callSuccess, "Call failed");
//     }

//     //Order Function: //6. internal

//     //Order Function: //7. private
// }

//=================
// Testing of FundMe4.sol

// pragma solidity ^0.8.8;

// import "./PriceConverter5.sol";

// error FundMe__NotOwner();

// /**
//  * @title A contract for crowd funding
//  * @author Khadijat
//  * @notice This contract is to demo a sample funding contract
//  * @dev This implements price feeds as our library
//  */

// contract FundMe4 {
//     using PriceConverter5 for uint256;

//     uint256 public constant MINIMUM_USD = 50 * 1e18;
//     address[] public funders;
//     mapping(address => uint256) public addressToAmountFunded;
//     address public immutable i_owner;

//     AggregatorV3Interface public priceFeed;

//     modifier onlyOwner() {
//         if (msg.sender != i_owner) {
//             revert FundMe__NotOwner();
//         }
//         _;
//     }

//     constructor(address priceFeedAddress) {
//         i_owner = msg.sender;
//         priceFeed = AggregatorV3Interface(priceFeedAddress);
//     }

//     /**
//      * @notice This function funds this contract
//      * @dev This implements price feeds as our library
//      */

//     function fund() public payable {
//         require(
//             msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
//             "Didn't send enought ETH"
//         );
//         funders.push(msg.sender);
//         addressToAmountFunded[msg.sender] += msg.value;
//     }

//     function withdraw() public onlyOwner {
//         for (
//             uint256 funderIndex = 0;
//             funderIndex < funders.length;
//             funderIndex++
//         ) {
//             address funder = funders[funderIndex];
//             addressToAmountFunded[funder] = 0;
//         }

//         funders = new address[](0);

//         (bool callSuccess, ) = payable(msg.sender).call{
//             value: address(this).balance
//         }("");
//         require(callSuccess, "Call failed");
//     }
// }

//===========
//Gas Optimizations using storage knowledge
//- let add s onto storage variables in the state variables
// pragma solidity ^0.8.8;

// import "./PriceConverter5.sol";

// error FundMe__NotOwner();

// /**
//  * @title A contract for crowd funding
//  * @author Khadijat
//  * @notice This contract is to demo a sample funding contract
//  * @dev This implements price feeds as our library
//  */

// contract FundMe4 {
//     using PriceConverter5 for uint256;

//     uint256 public constant MINIMUM_USD = 50 * 1e18;
//     address[] public s_funders;
//     mapping(address => uint256) public s_addressToAmountFunded;
//     address public immutable i_owner;

//     AggregatorV3Interface public s_priceFeed;

//     modifier onlyOwner() {
//         if (msg.sender != i_owner) {
//             revert FundMe__NotOwner();
//         }
//         _;
//     }

//     constructor(address priceFeedAddress) {
//         i_owner = msg.sender;
//         s_priceFeed = AggregatorV3Interface(priceFeedAddress);
//     }

//     /**
//      * @notice This function funds this contract
//      * @dev This implements price feeds as our library
//      */

//     function fund() public payable {
//         require(
//             msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
//             "Didn't send enought ETH"
//         );
//         s_funders.push(msg.sender);
//         s_addressToAmountFunded[msg.sender] += msg.value;
//     }

//     //this withdraw function is very expense becos we are reading from an array and its cost alot
//     //of gas to read from blockchain
//     function withdraw() public onlyOwner {
//         for (
//             uint256 funderIndex = 0;
//             funderIndex < s_funders.length; //if the condition here is true we keep on reading individual funders address
//             funderIndex++
//         ) {
//             address funder = s_funders[funderIndex]; //its store individual funders address onto chain
//             s_addressToAmountFunded[funder] = 0;
//         }

//         s_funders = new address[](0);

//         (bool callSuccess, ) = payable(msg.sender).call{
//             value: address(this).balance
//         }("");
//         require(callSuccess, "Call failed");
//     }

//     function cheaperWithdraw() public onlyOwner {
//         address[] memory funders = s_funders; //storing storage variable in memory is very cheap
//         //mappings can't be in memory but can be use on string
//         for (
//             uint256 funderIndex = 0;
//             funderIndex < funders.length;
//             funderIndex++
//         ) {
//             address funder = funders[funderIndex];
//             s_addressToAmountFunded[funder] = 0;
//         }
//         s_funders = new address[](0);
//         (bool success, ) = i_owner.call{value: address(this).balance}("");
//         require(success);
//     }
//     //- now that we have write cheaper withdraw function let rewrite the multipe funder test
//     //function inside FundMe.test.js file by copy and past "allows us to withdraw with multiple
//     //funders" test function
//     //- change the name to "cheaper withdraw test..." test function
// }

//============
//Gas Optimization
//- let refactor our code
pragma solidity ^0.8.8;

import "./PriceConverter5.sol";

error FundMe__NotOwner();

/**
 * @title A contract for crowd funding
 * @author Khadijat
 * @notice This contract is to demo a sample funding contract
 * @dev This implements price feeds as our library
 */

contract FundMe4 {
    using PriceConverter5 for uint256;

    uint256 public constant MINIMUM_USD = 50 * 1e18;
    address[] private s_funders;
    mapping(address => uint256) private s_addressToAmountFunded;
    address private immutable i_owner;

    AggregatorV3Interface private s_priceFeed;

    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert FundMe__NotOwner();
        }
        _;
    }

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    /**
     * @notice This function funds this contract
     * @dev This implements price feeds as our library
     */

    function fund() public payable {
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "Didn't send enought ETH"
        );
        s_funders.push(msg.sender);
        s_addressToAmountFunded[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            address funder = s_funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }

        s_funders = new address[](0);

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }

    function cheaperWithdraw() public onlyOwner {
        address[] memory funders = s_funders;
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success);
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getFunder(uint256 index) public view returns (address) {
        return s_funders[index];
    }

    function getAddressToAmountFunded(
        address funder
    ) public view returns (uint256) {
        return s_addressToAmountFunded[funder];
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }
}
