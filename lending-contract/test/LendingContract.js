const MyLendingContract = artifacts.require("MyLendingContract");

contract("MyLendingContract", (accounts) => {
    let lendingContract;
    const user1 = accounts[0];

    before(async () => {
        lendingContract = await MyLendingContract.deployed();
    });

    it("should allow users to deposit", async () => {
        const depositAmount = 100;
        await lendingContract.deposit(depositAmount, { from: user1 });
        const balance = await lendingContract.balances(user1);
        assert.equal(balance, depositAmount, "Incorrect balance after deposit");
    });

    it("should allow users to borrow if they have enough balance", async () => {
        const initialBalance = await lendingContract.balances(user1);
        const borrowAmount = 50;
        await lendingContract.borrow(borrowAmount, { from: user1 });
        const updatedBalance = await lendingContract.balances(user1);
        assert.equal(
            updatedBalance.toNumber(),
            initialBalance.toNumber() - borrowAmount,
            "Incorrect balance after borrowing"
        );
    });

    it("should not allow users to borrow more than their balance", async () => {
        const initialBalance = await lendingContract.balances(user1);
        const borrowAmount = initialBalance + 1;
        try {
            await lendingContract.borrow(borrowAmount, { from: user1 });
            assert.fail("Borrowing should have failed");
        } catch (error) {
            assert(
                error.message.includes("revert"),
                "Expected a revert error"
            );
        }
    });
});
