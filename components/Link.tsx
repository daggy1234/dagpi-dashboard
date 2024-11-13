import type { ReactNode } from 'react';

import styles from './link.module.css';

interface ExtProps {
    url: string;
    children: ReactNode;
}

export default function ExtLink({ url, children }: ExtProps) {
    return (
        <a href={url} className={styles.link}>
            {children}
        </a>
    );
}
