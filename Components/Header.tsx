import classes from './Header.module.css'
import Link from "next/link";
export function Header() {
  return (
    <header className={classes.header}>
      <Link href="/" className={classes.anchor}>
        {/* <a>index</a> next12ではaタグがいるらしい*/}
        cat
      </Link>

      <Link href="/dog"className={classes.anchor}>
        {/* <a>hoge</a> */}
        dog
      </Link>
    </header>
  );
}
