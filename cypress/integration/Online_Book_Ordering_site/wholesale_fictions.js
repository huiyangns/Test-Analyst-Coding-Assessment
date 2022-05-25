import OrderingHomePage_PO from "../../support/POM/Online_Book_Ordering_site/OrderingHomePage_PO";

///<reference types="cypress"/>

describe("Order fiction books test", () => {
  let orderingHomePage_po = new OrderingHomePage_PO();

  beforeEach(() => {
    orderingHomePage_po.visitHomePage();
    cy.fixture("fiction").then((data) => {
      globalThis.data = data;
    });
  });

  it("order 50 Harry Potter fiction books at a rate of $38.5 (float price) each without discount voucher", () => {
    orderingHomePage_po.selectFictionCategory();
    orderingHomePage_po.selectFiction(data.bookName);
    orderingHomePage_po.enterUnits(data.units);
    orderingHomePage_po.enterPrice(data.floatPrice);
    orderingHomePage_po.submit();

    //order should be appended to the Transaction record table
    cy.get("#transactionsection tr").should("exist");
  });

  it("order 50 Harry Potter fiction books at a rate of $38 (int price) each without discount voucher", () => {
    orderingHomePage_po.selectFictionCategory();
    orderingHomePage_po.selectFiction(data.bookName);
    orderingHomePage_po.enterUnits(data.units);
    orderingHomePage_po.enterPrice(data.price);
    orderingHomePage_po.submit();
    orderingHomePage_po.checkTransOrder(data.bookName, data.units, data.price)
  });

  it("cannot place an order without entering units", () => {
    orderingHomePage_po.selectFictionCategory();
    orderingHomePage_po.selectFiction(data.bookName);
    orderingHomePage_po.enterPrice(data.price);
    orderingHomePage_po.submit();

    cy.get("p").contains("Input is not valid");
  });

  it("cannot place an order by entering invalid units", () => {
    orderingHomePage_po.selectFictionCategory();
    orderingHomePage_po.selectFiction(data.bookName);
    orderingHomePage_po.enterUnits(data.minusUnits);
    orderingHomePage_po.enterPrice(data.price);
    orderingHomePage_po.submit();

    cy.get("p").contains("Input is not valid");
  });

  it("cannot place an order by entering invalid price", () => {
    orderingHomePage_po.selectFictionCategory();
    orderingHomePage_po.selectFiction(data.bookName);
    orderingHomePage_po.enterUnits(data.units);
    orderingHomePage_po.enterPrice(data.minusPrice);
    orderingHomePage_po.submit();

    cy.get("p").contains("Invalid price");
  });

  it("cannot place an order without choosing a book",() => {
    orderingHomePage_po.selectFictionCategory();
    orderingHomePage_po.enterUnits(data.units);
    orderingHomePage_po.enterPrice(data.price);
    orderingHomePage_po.submit();

    //order should not be appended to the Transaction record table
    cy.get("#transactionsection tr").should("not.exist");
  })
});
