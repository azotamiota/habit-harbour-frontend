const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./index.html");
const { login, register} = require("../static/js/index");



describe("login", () => {

    test("login is a function", () => {
        expect(typeof login).toBe("function");
    })

    describe("login relocates to homepage", () => {

        test("login relocates after success", () => {
            expect(window.location.pathname).toBe(`/`);
        })
    })

});

describe("register", () => {

    test("register is a function", () => {
        expect(typeof register).toBe("function");
    });

    test("register relocates after success", () => {
        expect(window.location.pathname).toBe("/")
    })

    




})