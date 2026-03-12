import Link from "next/link";
import { Container } from "@/components/UI/Container";
import { Text } from "@/components/UI/Typography";
import { ROUTES } from "@/constants";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <Container>
      <section className={styles.section} aria-label="Page not found">
        <Text variant="body" as="h1" className={styles.title}>
          404 – Page not found
        </Text>
        <Link href={ROUTES.HOME} className={styles.link}>
          Back to home
        </Link>
      </section>
    </Container>
  );
}
