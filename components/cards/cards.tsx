import { Box } from '@chakra-ui/core';

import styles from './card.module.scss';
function Card(props) {
    return (
        <Box className={styles.card}>
            <header className={styles.cardHeader}>
                <h2>
                    <a href={props.link}>{props.title}</a>
                </h2>
            </header>

            <div className={styles.cardAuthor}>
                <a>
                    <img className={styles.authorAvatarImg} src={props.image} alt={props.title} />
                </a>
                <svg className={styles.halfCircle} viewBox="0 0 106 57">
                    <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                </svg>

                <div className="author-name">
                    <div className="author-name-prefix">Author</div>
                    {props.author}
                </div>
            </div>

            <div className={styles.tags}>
                <a>{props.language}</a>
                <a>{props.async ? 'async' : 'Blocking'}</a>
                <a>coverage: {props.coverage}</a>
            </div>
        </Box>
    );
}

export default function Cards() {
    return (
        <section className={styles.cardList}>
            <Card
                title="asyncdagpi"
                author="Daggy1234"
                async={true}
                language="python"
                coverage="70%"
                image="/Tech/python.png"
                link="https://pypi.org/p/asyncdagpi"
            />
            <Card
                title="Dagpi [WIP]"
                author="Daggy1234"
                async={true}
                language="TypeScript"
                coverage="10%"
                image="/Tech/ts.png"
                link="https://mpmjs.org/Dagpi"
            />
            <Card
                title="DagpiRust [WIP]"
                author="Daggy1234"
                async={true}
                language="rust"
                coverage="20%"
                image="/Tech/rust.png"
                link="https://crates.io/DagpiRust"
            />
            <Card
                title="DagpiDeno [WIP]"
                author="Daggy1234"
                async={true}
                language="Deno (Ts)"
                coverage="100%"
                image="/Tech/denosvg.svg"
                link="https://deno.land/x/DagpiDeno"
            />
        </section>
    );
}
