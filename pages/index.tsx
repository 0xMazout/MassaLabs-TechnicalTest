import type {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import groupLabel from "../components/groupLabel";
// import {createQuery} from "../queries/getGlobalData";
// import {RPCClient} from "@therms/rpc-client";
// import { JSONRPCClient } from "json-rpc-2.0";
import {queries} from "../queries/getGlobalData";
import {useRef, useState} from "react";
import {RequestManager, Client, HTTPTransport} from "@open-rpc/client-js";

const Home: NextPage = () => {
	const ipRef = useRef<HTMLInputElement>(null);
	const stakingAddressRef = useRef<HTMLInputElement>(null);
	const [responseStatus, setResponseStatus] = useState(<div></div>);
	const [responseStakers, setResponseStakers] = useState(<div></div>);
	const [responseAddresses, setResponseAddresses] = useState(<div></div>);

	//setup front components
	const nodeAddress = groupLabel({
		label: "Node IP",
		placeholder: "http://localhost:33035/",
		type: "text",
		value: "http://{hostname}:{port}{path}",
		ref: ipRef,
	});
	const nodeId = groupLabel({
		label: "Node Staking Addresses",
		placeholder: "Addresses Addresses ...",
		type: "text",
		value: "Staking Addresses",
		ref: stakingAddressRef,
	});

	//setup rpc client
	const transport = new HTTPTransport(
		ipRef.current?.value ? ipRef.current.value : "",
	);
	const requestManager = new RequestManager([transport]);
	const client = new Client(requestManager);

	//Submit the form
	const SubmitRequest = async () => {
		await client
			.request({
				method: queries.getStakers,
			})
			.then((result) => {
				setResponseStakers(
					displayAlert(result.success, result.message, queries.getStakers),
				);
			})
			.catch((error) => {
				setResponseStakers(
					displayAlert(false, error.message, queries.getStakers),
				);
			});

		await client
			.request({
				method: queries.getAddresses,
				params: stakingAddressRef.current
					? stakingAddressRef.current?.value.split(" ")
					: [],
			})
			.then((result) => {
				setResponseAddresses(
					displayAlert(result.success, result.message, queries.getAddresses),
				);
			})
			.catch((error) => {
				setResponseAddresses(
					displayAlert(false, error.message, queries.getAddresses),
				);
			});

		await client
			.request({
				method: queries.getStatus,
			})
			.then((result) => {
				setResponseStatus(
					displayAlert(result.success, result.message, queries.getStatus),
				);
			})
			.catch((error) => {
				setResponseStatus(
					displayAlert(false, error.message, queries.getStatus),
				);
			});
	};
	//Display the alert
	const displayAlert = (
		success: boolean,
		message: string,
		methodname: string,
	) => {
		return success ? (
			<div className="alert alert-success shadow-lg mt-4 w-2/6">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>
						Success : {message} on Method : {methodname}
					</span>
				</div>
			</div>
		) : (
			<div className="alert alert-warning shadow-lg mt-4 w-2/6">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
					<span>
						Warning: {message} on Method : {methodname}
					</span>
				</div>
			</div>
		);
	};

	// const createQuery = (ipValue: string) => {
	// 	const query = {
	// 		openrpc: "1.2.4",
	// 		info: {
	// 			title: "Create Query",
	// 			version: "1.0.0",
	// 			description: "Create a new query",
	// 		},
	// 		servers: [
	// 			{
	// 				url: ipValue,
	// 				name: "Massa Public API",
	// 				description: "Massa Public url",
	// 			},
	// 		],
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
	// 		],
	// 	};
	// };
	return (
		<div className={styles.container}>
			<Head>
				<title>Monitor your Node</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Monitor your Node</h1>
				<p className={styles.description}>
					Enter your node Address and your Node ID to get live monitoring on
					public API{" "}
				</p>
				{nodeAddress}
				{nodeId}
				<button className="btn btn-primary mt-6" onClick={SubmitRequest}>
					Submit
				</button>
				{responseStatus}
				{responseStakers}
				{responseAddresses}
			</main>
		</div>
	);
};

export default Home;
