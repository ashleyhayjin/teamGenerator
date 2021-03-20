const Manager = require("../lib/Manager");

test("When you run getOfficeNumber, you receive the manager's number", () => {
    const e = new Manager("Ashley", "1", "ashleyhayjinlee@gmail.com", "1234567897");
    expect(e.getOfficeNumber()).toBe("1234567897");
});
