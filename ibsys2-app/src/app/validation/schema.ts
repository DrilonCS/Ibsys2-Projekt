import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true });

const gameDataSchema = {
	type: "object",
	properties: {
		results: {
			type: "object",
			properties: {
				game: { type: "string" },
				group: { type: "string" },
				period: { type: "string" },
				forecast: {
					type: "object",
					properties: {
						p1: { type: "string" },
						p2: { type: "string" },
						p3: { type: "string" }
					},
					required: ["p1", "p2", "p3"]
				},
				warehousestock: {
					type: "object",
					properties: {
						article: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: { type: "string" },
									amount: { type: "string" },
									startamount: { type: "string" },
									pct: { type: "string" },
									price: { type: "string" },
									stockvalue: { type: "string" }
								},
								required: ["id", "amount", "startamount", "pct", "price", "stockvalue"]
							}
						},
						totalstockvalue: { type: "string" }
					},
					required: ["article", "totalstockvalue"]
				}
			},
			required: ["game", "group", "period", "forecast", "warehousestock"]
		}
	},
	required: ["results"]
};

export const validate = ajv.compile(gameDataSchema);
