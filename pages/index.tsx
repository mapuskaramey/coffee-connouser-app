import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'

import styles from '../styles/Home.module.css'
import CardStyle from '../styles/card.module.css'

import Footer from '../components/Footer'
import Header from '../components/Head'
import Card from '../components/common/Card'
import SEO from '../components/seo'
import CoffeeStorePayloads from '../components/common/CoffeeStorePayloads'

import CoffeeStoresData from '../data/coffee-stores.json'

import { getCoffeeStores } from '../lib/coffee-store.js'

import trackMyLocation from '../hooks/track-my-location'

import cls from 'classnames'



const { FSQueryParams, UnsplashQueryParams } = CoffeeStorePayloads()
/* 
*    To pre-render content, @ Build time getStaticProps method used which returns props: {} as object with some data
*/
export async function getStaticProps() {

    let FSQData = await getCoffeeStores()

    return {
        props: {
            coffeeStores: FSQData
        },
        revalidate: 5,
        notFound: false
    }
}

/*
* client side rendering
*/
export default function Home(props) {

    const [coffeeStoreNearMe, setCoffStoreNearMe] = useState(props.coffeeStores)

    const { trackMyCurrentLocationHandler, locationErrorMsg, latLong, isTrackLocationLocating } = trackMyLocation()
    
    let buttonText = (isTrackLocationLocating == 'false') ? 'Discover coffee stores near me!!' : 'locating...'
    let cardTitle = (latLong) ? 'Coffee stores near to you' : 'Coffee stores'
    let boxes = ''

    const discoverCoffeeStoresNearByLocation = async () => {
        let coffeeStores = ''
        await trackMyCurrentLocationHandler()
        let queryParams = {
            searchText: 'coffee store',
            latlong: latLong,
            limit: 2
        }
        coffeeStores = await getCoffeeStores(queryParams)
        setCoffStoreNearMe(coffeeStores)
    }

    // boxes = latLong ? coffeeStoreNearMe : coffeeStoresList
    boxes = coffeeStoreNearMe

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <SEO
                    title="coffeee connouiser app | Home"
                />
                <div className={styles.homeBannerWrapper}>
                    <div className={styles.left}>
                        <h1 className={styles.title}>
                            <Link href="#">
                                <span className={styles.w1}>Coffee</span> <br />
                                <span className={styles.w2}>Connoisseur</span>
                            </Link>
                        </h1>
                        <p
                            className={styles.subTitle}
                        >
                            Discover local coffee stores!
                        </p>
                    </div>
                    <div className={styles.right}>
                        <button
                            className={styles.discoverBtn}
                            onClick={discoverCoffeeStoresNearByLocation}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
                <div className='box'>
                    <h2
                        className={CardStyle.boxName}
                    >
                        {cardTitle}
                    </h2>
                    <div>
                        <p className={cls('txt-danger')}>{locationErrorMsg}</p>
                    </div>
                    <div
                        className={cls(`text-center ${CardStyle.cardLayout}`)} >
                        {
                            boxes.map(box => {
                                return (
                                    <Card
                                        key={box.fsq_id}
                                        id={box.fsq_id}
                                        imgUrl={box.unsplashImages}
                                        name={box.name}
                                        location={box.location}
                                    />
                                )
                            })
                        }
                    </div>
                </div>

            </main>
            <Footer></Footer>
        </div>
    )
}