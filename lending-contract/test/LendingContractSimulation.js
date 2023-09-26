const MyLendingContract = artifacts.require("MyLendingContract");

contract("LendingContractSimulation", (accounts) => {
    let lendingContract;
    const user1 = accounts[0];
    const user2 = accounts[1];

    beforeEach(async () => {
        lendingContract = await MyLendingContract.deployed();
    });

    it("should prevent a user from borrowing more than available liquidity", async () => {
        // Deposit some initial funds into the contract
        const initialDeposit = 100;
        await lendingContract.deposit(initialDeposit, { from: user1 });

        // Try to borrow more than available liquidity
        const borrowAmount = initialDeposit + 1;

        // Attempt to borrow
        try {
            await lendingContract.borrow(borrowAmount, { from: user2 });
            assert.fail("Borrow should have reverted"); // Fail the test if borrowing didn't revert
        } catch (error) {
            // Check if the error message contains "revert"
            assert(
                error.message.includes("revert"),
                "Expected a revert error, but got a different error"
            );

            // Ensure that user1's balance remains unchanged
            const user1Balance = await lendingContract.balances(user1);
            assert.equal(
                user1Balance.toNumber(),
                initialDeposit,
                "User 1's balance should remain unchanged"
            );
        }
    });
});
