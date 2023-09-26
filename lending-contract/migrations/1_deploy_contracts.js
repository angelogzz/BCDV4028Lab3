const ConvertLib = artifacts.require("ConvertLib");
const MyLendingContract = artifacts.require("MyLendingContract");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MyLendingContract);
  deployer.deploy(MyLendingContract);
};
