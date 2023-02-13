import Head from 'next/head'

export default function Header (props) {
    return(
        <Head>
            <title>{props.title}</title>
            <meta name="description" content="coffee connouiser store" />
            <meta property="og:title" content="coffee connouiser app" key="title" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}