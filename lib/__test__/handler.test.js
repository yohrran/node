const handlebars = require("../handler");

test("home page render", () => {
  const req = {};
  const res = { render: jest.fn() };

  //homepage render
  handlebars.home(req, res);

  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("home");
});

test("about page renders with fortune", () => {
  const req = {};
  const res = { render: jest.fn() };
  handlebars.about(req, res);

  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("about");
  expect(res.render.mock.calls[0][1]).toEqual(
    expect.objectContaining({
      fortune: expect.stringMatching(/\W/),
    })
  );
});

test("404 page render", () => {
  const req = {};
  const res = { render: jest.fn() };

  //404 render
  handlebars.notFound(req, res);

  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("404");
});

test("serverError page render", () => {
  const err = new Error("some error");
  const req = {};
  const res = { render: jest.fn() };
  const next = jest.fn();
  //serverError render
  handlebars.serverError(err, req, res, next);

  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("500");
});
