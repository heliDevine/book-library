const { expect } = require("chai");
const request = require("supertest");
const { Book } = require("../src/models");
const app = require("../src/app");

describe("/books", () => {
	before(async () => Book.sequelize.sync());

	beforeEach(async () => {
		await Book.destroy({ where: {} });
	});

	describe("with no records in the database", () => {
		describe("POST /books", () => {
			it("creates a new book in the database", async () => {
				const response = await request(app).post("/books").send({
					title: "The Godfather",
					author: "Mario Puzo",
					genre: "crime",
					ISBN: "978-0-0995-2812-8",
				});
				const newBookRecord = await Book.findByPk(response.body.id, {
					raw: true,
				});

				expect(response.status).to.equal(201);
				expect(response.body.title).to.equal("The Godfather");
				expect(newBookRecord.title).to.equal("The Godfather");
				expect(newBookRecord.genre).to.equal("crime");
				expect(newBookRecord.ISBN).to.equal("978-0-0995-2812-8");
			});

			it("cannot create a book if there is no author or title", async () => {
				const response = await request(app).post("/books").send({});
				const newBookRecord = await Book.findByPk(response.body.id, {
					raw: true,
				});

				expect(response.status).to.equal(400);
				expect(response.body.errors.length).to.equal(2);
				expect(newBookRecord).to.equal(null);
			});
		});
	});

	describe("with records in the database", () => {
		let books;

		beforeEach(async () => {
			books = await Promise.all([
				Book.create({
					title: "The Godfather",
					author: "Mario Puzo",
					genre: "crime",
					ISBN: "978-0-0995-2812-8",
				}),
				Book.create({
					title: "Kitchen Confidental",
					author: "Anthony Bourdain",
					genre: "autography",
					ISBN: "978-1-4088-4504-2",
				}),
				Book.create({
					title: "The fuck-it list",
					author: "John Niven",
					genre: "fiction",
					ISBN: "978-0-434-02326-4",
				}),
			]);
		});

		describe("GET /books", () => {
			it("gets all books records", async () => {
				const response = await request(app).get("/book");

				expect(response.status).to.equal(200);
				expect(response.body.length).to.equal(3);

				response.body.forEach((book) => {
					const expected = books.find((a) => a.id === book.id);

					expect(book.title).to.equal(expected.title);
					expect(book.author).to.equal(expected.author);
				});
			});
		});

		describe("GET /books/:id", () => {
			it("gets books record by id", async () => {
				const book = books[0];
				const response = await request(app).get(`/book/${book.id}`);

				expect(response.status).to.equal(200);
				expect(response.body.title).to.equal(book.title);
				expect(response.body.author).to.equal(book.author);
			});

			it("returns a 404 if the book does not exist", async () => {
				const response = await request(app).get("/book/12345");

				expect(response.status).to.equal(404);
				expect(response.body.error).to.equal("The book could not be found.");
			});
		});

		describe("PATCH /books/:id", () => {
			it("updates books title by id", async () => {
				const book = books[0];
				const response = await request(app)
					.patch(`/book/${book.id}`)
					.send({ title: "1984" });
				const updatedBookRecord = await Book.findByPk(book.id, {
					raw: true,
				});

				expect(response.status).to.equal(200);
				expect(updatedBookRecord.title).to.equal("1984");
			});

			it("returns a 404 if the book does not exist", async () => {
				const response = await request(app)
					.patch("/book/12345")
					.send({ title: "Animal farm" });

				expect(response.status).to.equal(404);
				expect(response.body.error).to.equal("The book could not be found.");
			});
		});

		describe("DELETE /books/:id", () => {
			it("deletes book record by id", async () => {
				const book = books[0];
				const response = await request(app).delete(`/book/${book.id}`);
				const deletedBook = await Book.findByPk(book.id, { raw: true });

				expect(response.status).to.equal(204);
				expect(deletedBook).to.equal(null);
			});

			it("returns a 404 if the book does not exist", async () => {
				const response = await request(app).delete("/book/12345");
				expect(response.status).to.equal(404);
				expect(response.body.error).to.equal("The book could not be found.");
			});
		});
	});
});
