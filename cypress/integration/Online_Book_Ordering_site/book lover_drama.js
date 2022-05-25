import OrderingHomePage_PO from "../../support/POM/Online_Book_Ordering_site/OrderingHomePage_PO";
///<reference types="cypress"/>

describe("Order Drama test", () => {
  let orderingHomePage_po = new OrderingHomePage_PO();

  beforeEach(() => {
    orderingHomePage_po.visitHomePage();
    cy.fixture("drama").then((data) => {
      globalThis.data = data;
    });
  });

  it("order 5 'The Rainbow' drama books at a rate of $25 each with discount 10%, and then delete the order", () => {
    orderingHomePage_po.selectDramaCategory();
    orderingHomePage_po.selectFiction(data.bookName);
    orderingHomePage_po.enterUnits(data.units);
    orderingHomePage_po.enterPrice(data.price);

    //order a drama called “The Rainbow” for no more than $125.00
    expect(data.units * data.price).to.at.most(data.sumLimitation)

    orderingHomePage_po.discount(data.discount)
    orderingHomePage_po.submit();

    orderingHomePage_po.checkTransOrder(data.bookName, data.units, data.price, data.discount)
    orderingHomePage_po.deleteLastTransOrder()
    cy.get("#transactionsection tr").should("not.exist");
  });

  it("append new order to the order table which already has other orders, then delete the newly added order", () => {
    orderingHomePage_po.selectDramaCategory();
    orderingHomePage_po.selectFiction(data.bookName);
    orderingHomePage_po.enterUnits(data.units);
    orderingHomePage_po.enterPrice(data.price);
    orderingHomePage_po.discount(data.discount)
    orderingHomePage_po.submit();

    //add another order to transaction order table
    orderingHomePage_po.submit();

    orderingHomePage_po.deleteLastTransOrder()
    cy.get("#transactionsection tr").should("have.length", 1);
  });
});
