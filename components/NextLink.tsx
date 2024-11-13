import Link from 'next/link';

import styles from './link.module.css';

export default function NextLink({ url, children }: { url: string; children: React.ReactNode }) {
    return (
        <Link className={styles.link} href={url}>
            {children}
        </Link>
    );
}
