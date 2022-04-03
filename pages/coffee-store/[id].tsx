/* eslint-disable react/no-unused-prop-types */
/* eslint-disable arrow-body-style */
import cls from "classnames";
import { GetStaticPathsResult } from "next";
import { Params } from "next/dist/server/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { useLatLongStoreContext } from "../../hooks/use-store-context";
import fetchCoffeeStores from "../../lib/coffee-stores-api";
import { CoffeeStore } from "../../lib/types/types";
import styles from "../../styles/CoffeeStore.module.css";
import { isEmpty } from '../../utils';

export async function getStaticProps({ params }: Params) {
	const coffeeStores: CoffeeStore[] = await fetchCoffeeStores();
	const findCoffeeStoreById = coffeeStores.find((coffeeStore: CoffeeStore) => {
		return coffeeStore.id.toString() === params.id;
	});

	return {
		props: {
			initialCoffeeStore: findCoffeeStoreById || {},
		}, // will be passed to the page component as props
	};
}

// https://nextjs.org/docs/api-reference/data-fetching/get-static-paths

export async function getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
	const coffeeStores: CoffeeStore[] = await fetchCoffeeStores();

	const paths = coffeeStores.map((coffeeStore: CoffeeStore) => {
		return { params: { id: coffeeStore.id.toString() } };
	});

	return {
		paths,
		fallback: true, // requires if (router.isFallback) {return <div>Loading...</div>}
	};
}

interface Props {
	initialCoffeeStore: CoffeeStore;
}

function CoffeeStorePage({ initialCoffeeStore }: Props): ReactElement {
	const router = useRouter();
	const { id } = router.query;

	const [coffeeStore, setCoffeeStore] = useState(initialCoffeeStore || {});
	
	const {
		store: { coffeeStores },
	} = useLatLongStoreContext();

	useEffect(() => {
		if (isEmpty(initialCoffeeStore)) {
			if (coffeeStores.length > 0) {
				const coffeeStoreFromContext = coffeeStores.find((foundCoffeeStore: CoffeeStore) => {
					return foundCoffeeStore.id.toString() === id;
				});
				setCoffeeStore(coffeeStoreFromContext as CoffeeStore);
			}
		}
	}, [id, coffeeStores, initialCoffeeStore]);

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
							<a>← Back to Home</a>
						</Link>
					</div>
					<div className={styles.nameWrapper}>
						<h1 className={styles.name}>{coffeeStore.name}</h1>
					</div>
					<Image
						src={
							coffeeStore.imgUrl ||
							"https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
						}
						width={600}
						height={360}
						className={styles.storeImg}
						alt={coffeeStore.name}
					/>
				</div>
				<div className={cls("glass", styles.col2)}>
					<div className={styles.iconWrapper}>
						<Image src="/static/icons/places.svg" width="24" height="24" />
						<p className={styles.text}>{coffeeStore.address}</p>
					</div>
					{coffeeStore.neighbourhood && (
						<div className={styles.iconWrapper}>
							<Image src="/static/icons/nearMe.svg" width="24" height="24" />
							<p className={styles.text}>{coffeeStore.neighbourhood}</p>
						</div>
					)}
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
