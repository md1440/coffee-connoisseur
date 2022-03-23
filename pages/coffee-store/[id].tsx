/* eslint-disable react/no-unused-prop-types */
/* eslint-disable arrow-body-style */
import cls from "classnames";
import { GetStaticPathsResult } from "next";
import { Params } from "next/dist/server/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import coffeeStoresData from "../../data/coffee-stores.json";
import styles from "../../styles/CoffeeStore.module.css";

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

// https://nextjs.org/docs/api-reference/data-fetching/get-static-paths

export async function getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
	const paths = coffeeStoresData.map((coffeeStore: CoffeeStore) => {
		return { params: { id: coffeeStore.id.toString() } };
	});

	return {
		paths,
		fallback: true, // requires if (router.isFallback) {return <div>Loading...</div>}
	};
}

interface Props {
	coffeeStore: CoffeeStore;
}

function CoffeeStorePage({ coffeeStore }: Props): ReactElement {
	const router = useRouter();

	const handleUpvoteButton = () => {};

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.layout}>
			<Head>
				<title>{coffeeStore.name}</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.col1}>
					<div className={styles.backToHomeLink}>
						<Link href="/">
							<a>Back to Home</a>
						</Link>
					</div>
					<div className={styles.nameWrapper}>
						<h1 className={styles.name}>{coffeeStore.name}</h1>
					</div>
					<Image src={coffeeStore.imgUrl} width={600} height={360} className={styles.storeImg} alt={coffeeStore.name} />
				</div>
				<div className={cls("glass", styles.col2)}>
					<div className={styles.iconWrapper}>
						<Image src="/static/icons/places.svg" width="24" height="24" />
						<p className={styles.text}>{coffeeStore.address}</p>
					</div>
					<div className={styles.iconWrapper}>
						<Image src="/static/icons/nearMe.svg" width="24" height="24" />
						<p className={styles.text}>{coffeeStore.neighbourhood}</p>
					</div>
					<div className={styles.iconWrapper}>
						<Image src="/static/icons/star.svg" width="24" height="24" />
						<p className={styles.text}>{1}</p>
					</div>
					<button type="button" className={styles.upvoteButton} onClick={handleUpvoteButton}>
						Like
					</button>
				</div>
			</div>
		</div>
	);
}

export default CoffeeStorePage;
