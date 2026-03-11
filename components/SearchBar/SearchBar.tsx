import type { ChangeEvent } from "react";
import { Input } from "@/components/UI/Input";
import { Text } from "@/components/UI/Typography";
import styles from "./SearchBar.module.scss";

const SEARCH_INPUT_ID = "search";

type SearchBarProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  resultCount: number;
};

export function SearchBar({
  value,
  onChange,
  placeholder,
  resultCount,
}: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <div className={styles.inputWrapper}>
        <Input
          id={SEARCH_INPUT_ID}
          type="search"
          value={value}
          onChange={onChange}
          label="Search"
          placeholder={placeholder}
          labelHidden
        />
      </div>

      <Text
        variant="overline"
        as="p"
        className={styles.results}
        aria-live="polite"
      >
        {resultCount} {resultCount === 1 ? "result" : "results"}
      </Text>
    </div>
  );
}
