export const queries = {
	getStatus: "get_status",
	getStakers: "get_stakers",
	getAddresses: "get_addresses",
};

//Old code 
// export const createQuery = (ipValue: string ,addresses: Array<string>) => {
// 	return {
// 		// openrpc: "1.2.4",
// 		// info: {
// 		// 	title: "Get Global Data",
// 		// 	version: "1.0.0",
// 		// 	description: "Fetch all Data from the Massa Node",
// 		// },
// 		// servers: [
// 		// 	{
// 		// 		url: ipValue,
// 		// 		name: "Massa Public API",
// 		// 		description: "Massa Public url",
// 		// 	},
// 		// ],
// 		methods: [
// 			{
// 				tags: [
// 					{
// 						name: "public",
// 						description: "Massa public api",
// 					},
// 				],
// 				params: [],
// 				result: {
// 					schema: {
// 						$ref: "#/components/schemas/Stakers",
// 					},
// 					name: "Stakers",
// 				},
// 				name: queries.getStakers,
// 				summary: "Get stakers",
// 				description:
// 					"Returns the active stakers and their roll counts for the current cycle.",
// 			},
// 			{
// 				tags: [
// 					{
// 						name: "public",
// 						description: "Massa public api",
// 					},
// 				],
// 				params: [],
// 				result: {
// 					name: "NodeStatus",
// 					description: "Node status",
// 					schema: {
// 						$ref: "#/components/schemas/NodeStatus",
// 					},
// 				},
// 				name: queries.getStatus,
// 				summary: "Summary of the current state",
// 				description:
// 					"Summary of the current state: time, last final blocks (hash, thread, slot, timestamp), clique count, connected nodes count.",
// 				paramStructure: "by-name",
// 			},
// 			{
// 				tags: [
// 					{
// 						name: "public",
// 						description: "Massa public api",
// 					},
// 				],
// 				params: [
// 					{
// 						name: "address",
// 						description: "The strings should be valid address(es).",
// 						schema: {
// 							type: "array",
// 							items: {
// 								type: "string",
// 							},
// 						},
// 						required: true,
// 					},
// 				],
// 				result: {
// 					schema: {
// 						type: "array",
// 						items: {
// 							$ref: "#/components/schemas/AddressInfo",
// 						},
// 					},
// 					name: "AddressInfo(s)",
// 				},
// 				name: "get_addresses",
// 				summary: "To check when your address is selected to stake.",
// 				description:
// 					"To check when your address is selected to stake, run this command and look at the “next draws” section.\nAlso check that your balance increases, for each block or endorsement that you create you should get a small reward.",
// 			},
// 		],
// 	};
// };
