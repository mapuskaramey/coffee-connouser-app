import ContactMe from '../components/Contact'
import Header from '../components/Head'
import Head from 'next/head'

export default function Contact() {
    return(
        <div>
            <Head>
                <title>coffee connouiser app -contact</title>
             </Head>
            <ContactMe></ContactMe>
        </div>
    )
}