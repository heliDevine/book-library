const { expect } = require("chai");
const request = require("supertest");
const { Reader } = require("../src/models");
const app = require("../src/app");

describe("/reader", () => {
	before(async () => Reader.sequelize.sync());
	beforeEach(async () => {
		await Reader.destroy({ where: {} });
	});
	describe("with no records in the database", () => {
		describe("POST/reader", () => {
			it("creates a new reader in the database", async () => {
				const response = await request(app).post("/reader").send({
					name: "Elizabeth Bennet",
					email: "future_ms_darcy@gmail.com",
				});
				expect(response.status).to.equal(201);
				const newReaderRecord = await Reader.findByPk(response.body.id, {
					raw: true,
				});

				expect(response.body.name).to.equal("Elizabeth Bennet");
				expect(newReaderRecord.name).to.equal("Elizabeth Bennet");
				expect(newReaderRecord.email).to.equal("future_ms_darcy@gmail.com");
			});
		});
	});
});
