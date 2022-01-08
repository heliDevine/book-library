const { expect } = require("chai");
const request = require("supertest");
const { Reader } = require("../src/models");
const app = require("../src/app");

describe("/readers", () => {
	before(async () => Reader.sequelize.sync());

	beforeEach(async () => {
		await Reader.destroy({ where: {} });
	});

	describe("with no records in the database", () => {
		describe("POST /readers", () => {
			it("creates a new reader in the database", async () => {
				const response = await request(app).post("/readers").send({
					name: "Elizabeth Bennet",
					email: "future_ms_darcy@gmail.com",
					password: "verysecretpassword",
				});

				const newReaderRecord = await Reader.findByPk(response.body.id, {
					raw: true,
				});

				expect(response.status).to.equal(201);
				expect(response.body.name).to.equal("Elizabeth Bennet");
				expect(newReaderRecord.name).to.equal("Elizabeth Bennet");
				expect(newReaderRecord.email).to.equal("future_ms_darcy@gmail.com");
				expect(newReaderRecord.password).to.equal("verysecretpassword");
			});

			it("errors if name is an empty string", async () => {
				const response = await request(app).post("/readers").send({
					name: "",
					password: "12345667895678",
					email: "email@domain.com",
				});
				const newReaderRecord = await Reader.findByPk(response.body.id, {
					raw: true,
				});

				expect(response.status).to.equal(400);
				expect(response.body.errors.length).to.equal(1);
				expect(newReaderRecord).to.equal(null);
			});

			it("errors if an email or is wrong format", async () => {
				const response = await request(app).post("/readers").send({
					name: "Elizabeth Bennet",
					email: "future_ms_darcygmail.com",
					password: "12345667895678",
				});
				const newReaderRecord = await Reader.findByPk(response.body.id, {
					raw: true,
				});

				expect(response.status).to.equal(400);
				expect(response.body.errors.length).to.equal(1);
				expect(newReaderRecord).to.equal(null);
			});

			it("errors if an password or is wrong format", async () => {
				const response = await request(app).post("/readers").send({
					name: "Elizabeth Bennet",
					email: "future_ms@darcygmail.com",
					password: "123",
				});
				const newReaderRecord = await Reader.findByPk(response.body.id, {
					raw: true,
				});

				expect(response.status).to.equal(400);
				expect(response.body.errors.length).to.equal(1);
				expect(newReaderRecord).to.equal(null);
			});

			it("errors if name is missing", async () => {
				const response = await request(app).post("/readers").send({
					email: "future_ms@darcygmail.com",
					password: "12345667895678",
				});
				const newReaderRecord = await Reader.findByPk(response.body.id, {
					raw: true,
				});

				expect(response.status).to.equal(400);
				expect(response.body.errors.length).to.equal(1);
				expect(newReaderRecord).to.equal(null);
			});

			it("errors if email is missing", async () => {
				const response = await request(app).post("/readers").send({
					name: "Elizabeth Bennet",
					password: "12345667895678",
				});
				const newReaderRecord = await Reader.findByPk(response.body.id, {
					raw: true,
				});

				expect(response.status).to.equal(400);
				expect(response.body.errors.length).to.equal(1);
				expect(newReaderRecord).to.equal(null);
			});

			it("errors if password is missing", async () => {
				const response = await request(app).post("/readers").send({
					name: "Elizabeth Bennet",
					email: "future_ms@darcygmail.com",
				});
				const newReaderRecord = await Reader.findByPk(response.body.id, {
					raw: true,
				});

				expect(response.status).to.equal(400);
				expect(response.body.errors.length).to.equal(1);
				expect(newReaderRecord).to.equal(null);
			});
		});
	});
	describe("with records in the database", () => {
		let readers;

		beforeEach(async () => {
			readers = await Promise.all([
				Reader.create({
					name: "Elizabeth Bennet",
					email: "future_ms_darcy@gmail.com",
					password: "verysecretpassword",
				}),
				Reader.create({
					name: "Arya Stark",
					email: "vmorgul@me.com",
					password: "verysecretpassword1",
				}),
				Reader.create({
					name: "Lyra Belacqua",
					email: "darknorth123@msn.org",
					password: "verysecretpassword2",
				}),
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

		describe("DELETE /reader/:id", () => {
			it("deletes reader record by id", async () => {
				const reader = readers[0];
				const response = await request(app).delete(`/reader/${reader.id}`);
				const deletedReader = await Reader.findByPk(reader.id, { raw: true });

				expect(response.status).to.equal(204);
				expect(deletedReader).to.equal(null);
			});

			it("returns a 404 if the reader does not exist", async () => {
				const response = await request(app).delete("/reader/12345");
				expect(response.status).to.equal(404);
				expect(response.body.error).to.equal("The reader could not be found.");
			});
		});
	});
});
