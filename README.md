# How to run the test
1. npm install
2. npm run triggerAllTests-headed

# Test Scenarios 1 -- wholesale customer buying fiction books
Including five test cases:

1. order 50 Harry Potter fiction books at a rate of $38.5 (float price) each without discount voucher.
This test case will **fail** because the price input will treat float price as invalid value.

2. order 50 Harry Potter fiction books at a rate of $38 (int price) each without discount voucher.
This test case will pass. After placing an order, it will assert the values in the Transaction record table according to form data I input.

3. cannot place an order without entering units.
This test case will pass. If I click submit without providing units, the form should not be submitted. I make an assertion on the error prompt.

4. cannot place an order by entering invalid units.
This test case will pass. If I provide an invalid units value, such as -1, the form should not be submitted. I make an assertion on the error prompt.

5. cannot place an order by entering invalid price.
This test case will pass. If I provide an invalid price value, such as -1, the form should not be submitted. I make an assertion on the error prompt.

6. cannot place an order without choosing a book
This test case will **fail** because order should not be appended to the Transaction record table without choosing a book.

# Test Scenarios 2 -- book lover buying drama books
Because Test Scenarios 1 has included some negative cases, I did not repeat them again in this scenario.
Including two test cases:

1. order 5 'The Rainbow' drama books at a rate of $25 each with discount 10%, and then delete the order
This test case will pass. It will order a drama called “The Rainbow” for no more than $125.00. After placing an order, it will assert the values in the Transaction record table according to form data I input. Then it will delete this order correctly.

2. append new order to the order table which already has other orders, then delete the newly added order
This test case will pass. It will append a new order to non-empty Transaction record table and then delete the newly added record correctly.