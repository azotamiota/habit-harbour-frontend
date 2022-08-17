const each = require('jest-each').default;
const { login, register } = require("../static/js/index");

/**
 * @jest-environment ./custom_env
 */

describe("login", () => {

    test("login is a function", () => {
        expect(typeof login).toBe("function");
    })

})