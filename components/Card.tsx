/* eslint-disable react/no-unused-prop-types */
import cls from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";
import styles from "../styles/Card.module.css";

interface Props {
	name: string;
	imgUrl: string;
	href: string;
}

function Card({ name, imgUrl, href }: Props): ReactElement {
	return (
		<Link href={href}>
			<a className={styles.cardLink}>
				<div className={cls(styles.container, "glass")}>
					<div className={styles.cardHeaderWrapper}>
						<h2 className={styles.cardHeader}>{name}</h2>
					</div>
					<div className={styles.cardImageWrapper}>
						<Image className={styles.cardImage} src={imgUrl} width={260} height={160} />
					</div>
				</div>
			</a>
		</Link>
	);
}

export default Card;
