const Engineer = require("../lib/Engineer");

test("When you run getGithub, you receive the engineer's github username", () => {
    const e = new Engineer("Ashley", "1", "ashleyhayjinlee@gmail.com", "ashleyhayjin");
    expect(e.getGithub()).toBe("ashleyhayjin");
});

