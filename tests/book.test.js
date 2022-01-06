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
				expect(newRBookRecord.title).to.equal("The Godfather");
				expect(newBookRecord.genre).to.equal("crime");
				expect(newBookRecord.password).to.equal("978-0-0995-2812-8");
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
				Book.create({ title: "Arya Stark", email: "vmorgul@me.com" }),
				Book.create({ name: "Lyra Belacqua", email: "darknorth123@msn.org" }),
			]);
		});

		describe("GET /readers", () => {
			it("gets all readers records", async () => {
				const response = await request(app).get("/reader");

				expect(response.status).to.equal(200);
				expect(response.body.length).to.equal(3);

				response.body.forEach((reader) => {
					const expected = readers.find((a) => a.id === reader.id);

					expect(reader.name).to.equal(expected.name);
					expect(reader.email).to.equal(expected.email);
				});
			});
		});

		describe("GET /readers/:id", () => {
			it("gets readers record by id", async () => {
				const reader = readers[0];
				const response = await request(app).get(`/reader/${reader.id}`);

				expect(response.status).to.equal(200);
				expect(response.body.name).to.equal(reader.name);
				expect(response.body.email).to.equal(reader.email);
			});

			it("returns a 404 if the reader does not exist", async () => {
				const response = await request(app).get("/reader/12345");

				expect(response.status).to.equal(404);
				expect(response.body.error).to.equal("The reader could not be found.");
			});
		});

		describe("PATCH /readers/:id", () => {
			it("updates readers email by id", async () => {
				const reader = readers[0];
				const response = await request(app)
					.patch(`/reader/${reader.id}`)
					.send({ email: "miss_e_bennet@gmail.com" });
				const updatedReaderRecord = await Reader.findByPk(reader.id, {
					raw: true,
				});

				expect(response.status).to.equal(200);
				expect(updatedReaderRecord.email).to.equal("miss_e_bennet@gmail.com");
			});

			it("returns a 404 if the reader does not exist", async () => {
				const response = await request(app)
					.patch("/reader/12345")
					.send({ email: "some_new_email@gmail.com" });

				expect(response.status).to.equal(404);
				expect(response.body.error).to.equal("The reader could not be found.");
			});
		});

		describe("DELETE /readers/:id", () => {
			it("deletes reader record by id", async () => {
				const reader = readers[0];
				const response = await request(app).delete(`/reader/${reader.id}`);
				const deletedReader = await Reader.findByPk(reader.id, { raw: true });

				expect(response.status).to.equal(204);
				expect(deletedReader).to.equal(null);
			});

			it("returns a 404 if the reader does not exist", async () => {
				const response = await request(app).delete("/readers/12345");
				expect(response.status).to.equal(404);
				expect(response.body.error).to.equal("The reader could not be found.");
			});
		});
	});
});
