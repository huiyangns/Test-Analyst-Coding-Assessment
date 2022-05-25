import { extractPrice } from "../../utils/helper"

export default class OrderingHomePage_PO {
  visitHomePage() {
    cy.visit(Cypress.env("OrderingHomePageURL"));
  }

  selectFictionCategory() {
    cy.get("#radioselect1>input").check();
  }

  selectDramaCategory() {
    cy.get("#radioselect2>input").check();
  }

  selectFiction(bookName) {
    cy.get("select[class='bookoptions']").select(bookName);
  }

  enterUnits(num) {
    cy.get("input[name='units']").type(num);
  }

  enterPrice(price) {
    cy.get("input[name='price']").type(price);
  }

  discount(discount) {
    cy.get("input[name='discount']")
      .check()
      .then(() => {
        cy.get("input[class='discountvalue']").type(discount);
      });
  }
  submit() {
    cy.get("[type='submit']").click();
  }

  checkTransOrder(bookName, units, price, discountRate = 0) {
    cy.get("#transactionsection tr").should("exist");
    //get tds in the last tr and assert them individually
    cy.get("#transactionsection tr:last-child td").as("tableData");
    cy.get("@tableData").eq(1).invoke("text").should("be.equal", bookName);
    cy.get("@tableData").eq(2).invoke("text").should("be.equal", units);
    cy.get("@tableData")
      .eq(3)
      .then(($ele) => {
        let price = extractPrice($ele.text());
        expect(price).to.be.eq(price);
      });

    cy.get("@tableData")
      .eq(4)
      .then(($ele) => {
        let amount = extractPrice($ele.text());
        localStorage.setItem("amount", amount);
        expect(Number(amount)).to.be.eq(price * units);
      });

    cy.get("@tableData")
      .eq(5)
      .then(($ele) => {
        let discount = extractPrice($ele.text());
        localStorage.setItem("discount", discount);
        expect(Number(discount)).to.be.eq(price * units * (discountRate / 100));
      });

    cy.get("@tableData")
      .eq(6)
      .then(($ele) => {
        let finalAmount = extractPrice($ele.text());
        let amount = localStorage.getItem("amount");
        let discount = localStorage.getItem("discount");
        expect(Number(finalAmount)).to.be.eq(amount - discount);
      });
  }

  deleteLastTransOrder(){
      cy.get("#transactionsection tr:last-child td:last-child").click().then(() => {
          cy.get("#deletedialog").find("button").contains("Yes, Delete it!").click()
          
      })

  }
}
