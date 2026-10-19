"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { validTheme } from "@/content/demo-logic";
import styles from "./Layout.module.css";
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const select = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    if (select.current)
      select.current.value = validTheme(document.documentElement.dataset.theme);
    const escape = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        menuButton.current?.getAttribute("aria-expanded") === "true"
      ) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  return (
    <header className={styles.header} ref={header}>
      <div className={styles.inner}>
        <Link
          prefetch={false}
          href="/"
          className={styles.brand}
          aria-label="Hussein Elhaddad, home"
        >
          <span className={styles.mark} aria-hidden="true">
            h<span>.</span>
          </span>
          <span>Hussein Elhaddad</span>
        </Link>
        <button
          ref={menuButton}
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}{" "}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={`${styles.nav} ${open ? styles.open : ""}`}
        >
          {["Work", "About", "Contact"].map((label) => {
            const href = `/${label.toLowerCase()}/`;
            return (
              <Link
                prefetch={false}
                href={href}
                key={label}
                aria-current={path.startsWith(href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            );
          })}
          <a href={site.cv} download onClick={() => setOpen(false)}>
            CV <span aria-hidden="true">↗</span>
          </a>
          <label className={styles.theme}>
            <span className="sr-only">Color theme</span>
            <select
              ref={select}
              defaultValue="system"
              onChange={(e) => {
                const theme = validTheme(e.target.value);
                document.documentElement.dataset.theme = theme;
                try {
                  localStorage.setItem("portfolio-theme", theme);
                } catch {
                  /* Theme still applies for this page when storage is unavailable. */
                }
              }}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </nav>
      </div>
    </header>
  );
}
