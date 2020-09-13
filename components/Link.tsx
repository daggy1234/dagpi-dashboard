import styles from './link.module.scss';

export default function ExtLink({ url, children }) {
    return (
        <>
            <a href={url} className={styles.link}>
                {children}
            </a>
        </>
    );
}
