/* eslint-disable react/no-unused-prop-types */
/* eslint-disable arrow-body-style */
import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { Params } from "next/dist/server/router";
import Head from 'next/head';
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import coffeeStoresData from "../../data/coffee-stores.json";

interface CoffeeStores {
	coffeeStores: CoffeeStore[];
}

interface CoffeeStore {
	id: number;
	name: string;
	imgUrl: string;
	websiteUrl: string;
	address: string;
	neighbourhood: string;
}

export async function getStaticProps({ params }: Params) {
	return {
		props: {
			coffeeStore: coffeeStoresData.find((coffeeStore: CoffeeStore) => {
				return coffeeStore.id.toString() === params.id;
			}),
		}, // will be passed to the page component as props
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
	const paths = coffeeStoresData.map((coffeeStore: CoffeeStore) => {
		return { params: { id: coffeeStore.id.toString()}}
	})

	return {
		paths,
		fallback: true,
	};
}

interface Props {
	coffeeStore: CoffeeStore;
}

function CoffeeStorePage({coffeeStore}: Props): ReactElement {
	const router = useRouter();

	if(router.isFallback) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<Head>
				<title>{coffeeStore.name}</title>
			</Head>
			<Link href="/">
				<a>Back to Home</a>
			</Link>
			<p>{coffeeStore.name}</p>
			<p>{coffeeStore.address}</p>
			<p>{coffeeStore.neighbourhood}</p>
		</div>
	);
}

export default CoffeeStorePage;
