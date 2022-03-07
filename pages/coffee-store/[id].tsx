import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

function CoffeeStore(): ReactElement {
	const router = useRouter();
	return (
		<div>
			CoffeeStore {router.query.id}
			<Link href="/">
				<a>Back to Home</a>
			</Link>
			<Link href="/coffee-store/dynamic">
				<a>Got page dynamic</a>
			</Link>
		</div>
	);
}

export default CoffeeStore;
