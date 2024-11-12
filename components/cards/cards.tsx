/* eslint-disable @next/next/no-img-element */
import { Box } from '@chakra-ui/react';

import styles from './card.module.scss';

interface LibProps {
    link: string;
    title: string;
    image: string;
    language: string;
    async: string;
    coverage: string;
    author: string;
}

function Card(props: LibProps) {
    const { language, async, title, image, link, author, coverage } = props;
    return (
        <Box className={styles.card}>
            <header className={styles.cardHeader}>
                <h2>
                    <a href={link}>{title}</a>
                </h2>
            </header>

            <div className={styles.cardAuthor}>
                <span>
                    <img
                        loading="lazy"
                        height="40px"
                        width="40px"
                        className={styles.authorAvatarImg}
                        src={image}
                        alt={title}
                    />
                </span>
                <svg className={styles.halfCircle} viewBox="0 0 106 57">
                    <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4" />
                </svg>

                <div className="author-name">
                    <div className="author-name-prefix">Author</div>
                    {author}
                </div>
            </div>

            <div className={styles.tags}>
                <span>{language}</span>
                <span>{async}</span>
                <span>coverage: {coverage}</span>
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
                async="async"
                language="python"
                coverage="100%"
                image="/Tech/python.png"
                link="https://pypi.org/p/asyncdagpi"
            />
            <Card
                title="dagpijs"
                author="Daggy1234"
                async="Promise"
                language="TypeScript"
                coverage="100%"
                image="/Tech/ts.png"
                link="https://npmjs.com/package/dagpijs"
            />
            <Card
                title="Dagpirs"
                author="Daggy1234"
                async="async/sync"
                language="rust"
                coverage="100%"
                image="/Tech/rust.png"
                link="https://crates.io/crates/dagpirs"
            />
            <Card
                title="Dagpi.go"
                author="clvrk"
                async="concurent"
                language="go"
                coverage="100%"
                image="/Tech/go.png"
                link="https://github.com/clvrk/dagpi.go"
            />
            <Card
                title="dagpirb"
                author="mischievousdev"
                async="sync"
                language="ruby"
                coverage="70%"
                image="/Tech/ruby.png"
                link="https://github.com/mischievousdev/dagpirb"
            />
            <Card
                title="aiodagpi"
                author="DevilJamJar"
                async="async"
                language="python"
                coverage="30%"
                image="/Tech/python.png"
                link="https://pypi.org/p/aiodagpi"
            />
            <Card
                title="Dagpipy"
                author="Niztg"
                async="sync"
                language="python"
                coverage="50%"
                image="/Tech/python.png"
                link="https://github.com/niztg/dagpipy/"
            />
        </section>
    );
}
