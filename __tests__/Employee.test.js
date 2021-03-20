const Employee = require("../lib/Employee");

test('tests getName() using the getName method.', () => {
    const e = new Employee("Ashley", "1", "ashleyhayjinlee@gmail.com");
    expect(e.getName()).toBe("Ashley");
});

test("tests if you can get a name via the constructor", () => {
    const e = new Employee("Ashley", "1", "ashleyhayjinlee@gmail.com");
    expect(e.name).toBe("Ashley");   
})

test("tests getId() to return the id of the employee.", () => {
    const e = new Employee("Ashley", "1", "ashleyhayjinlee@gmail.com");
    expect(e.getId()).toBe("1");
})

test("tests getEmail() to return the email of the employee.", () => {
    const e = new Employee("Ashley", "1", "ashleyhayjinlee@gmail.com");
    expect(e.getEmail()).toBe("ashleyhayjinlee@gmail.com");
})
