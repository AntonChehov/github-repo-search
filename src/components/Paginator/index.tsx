import { ReactElement } from "react";
import { IPaginator } from "./interfaces";
import * as styles from "./paginator.module.css";

export default function Paginator({
  pages,
  currentPage,
  setPage,
}: IPaginator): ReactElement {
  return (
    <ul className={styles.ul}>
      {Array.from({ length: pages }, (_, i) => i + 1).map((pageNum) => (
        <li
          key={pageNum}
          className={`${styles.li} ${
            pageNum === currentPage ? styles.li__active : ""
          }`}
        >
          <a
            className={styles.a}
            href={String(pageNum)}
            onClick={(evt) => {
              evt.preventDefault();
              setPage(pageNum);
            }}
          >
            {pageNum}
          </a>
        </li>
      ))}
    </ul>
  );
}
