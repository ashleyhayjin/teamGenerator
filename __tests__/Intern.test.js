const Intern = require("../lib/Intern");

test("When you run getSchool, you receive the intern's school", () => {
    const e = new Intern("Ashley", "1", "ashleyhayjinlee@gmail.com", "UT");
    expect(e.getSchool()).toBe("UT");
});
