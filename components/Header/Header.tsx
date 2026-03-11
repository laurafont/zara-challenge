"use client";

import { Container } from "@/components/UI/Container";
import { CartIcon } from "@/components/CartIcon";
import styles from "./Header.module.scss";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { HomeIcon } from "../UI/Icons";

export function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.logo}>
            <Link href={ROUTES.HOME} aria-label="Zara home">
              <HomeIcon />
            </Link>
          </div>
          <div className={styles.cart}>
            <CartIcon />
          </div>
        </div>
      </Container>
    </header>
  );
}
