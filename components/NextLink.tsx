import Link from 'next/link';

import styles from './link.module.scss';

export default function NextLink({ url, children }) {
    return (
        <Link href={url}>
            <a className={styles.link}>{children}</a>
        </Link>
    );
}
