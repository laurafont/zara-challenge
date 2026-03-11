import type { ChangeEvent } from "react";
import { Input } from "@/components/UI/Input";
import styles from "./SearchBar.module.scss";

const SEARCH_INPUT_ID = "search";

type SearchBarProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  /** Number of results; passed from parent (e.g. from useProductList totalCount). */
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
          value={value}
          onChange={onChange}
          label="Search"
          placeholder={placeholder}
          labelHidden
        />
      </div>

      <p className={styles.results} aria-live="polite">
        {resultCount} {resultCount === 1 ? "result" : "results"}
      </p>
    </div>
  );
}
