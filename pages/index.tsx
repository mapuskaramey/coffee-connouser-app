import Image from 'next/image'

import styles from '../styles/Home.module.css'
import CardStyle from '../styles/card.module.css'

import Footer from '../components/Footer'
import Header from '../components/Head'

import Card from '../components/Card'
import CoffeeStoresData from '../data/coffee-stores.json'

import cls from 'classnames'

import SEO from '../components/seo'
import { getCoffeeStores } from '../lib/coffee-store.js'
import Link from 'next/link'
import trackMyLocation from '../hooks/track-my-location'
import { useEffect, useState } from 'react'

/* pre-render content @build time using props returned by getStaticProps() */
export async function getStaticProps() {
    /** coffee connouiser api configuration */
    let FSQData = await getCoffeeStores()
    console.log({FSQData})
    return {
        props: {
            coffeeStores: FSQData
        }
    }
}

/**  client side  */
export default function Home(props) {
    
    const { trackMyLocationHandler, latLong, locationErrorMsg, isTrackLocationOn } = trackMyLocation()

    /* I was stuck in this scenario where data get de-structured & need to print here,
        mistakes:
        I. I was try to call latLong, errorMsg inside getCoffeeStoreNearBy() function which was wrong, hence 
        I was getting data on 2nd click of button
        II. I was calling Hooks on TOP of getStaticProps() function which was wrong, It should call inside function component 
    */
   
    const getCoffeeStoreNearBy = () => {
        trackMyLocationHandler()
        console.log({latLong, locationErrorMsg })
    }

    let boxes = props.coffeeStores
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
                                    <span className={styles.w1}>Coffee</span> <br/>
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
                            onClick={getCoffeeStoreNearBy}
                            >
                                {
                                    (!!isTrackLocationOn)?  'locating...': 'Discover coffee stores near me!'
                                    
                                }
                            </button>
                        </div>
                    </div>
                    <div className='box'>
                        <p id='cardFetch'>
                            {locationErrorMsg}
                        </p>
                        <h2 
                        className={CardStyle.boxName}
                        >
                            The Coffee stores
                        </h2>
                        <div 
                        className={cls(`text-center ${CardStyle.cardLayout}`)}
                        >
                            {
                                boxes.map(box => {
                                        return  (
                                                    <Card
                                                        id={box.fsq_id}
                                                        imgUrl={box.unsplashImages}
                                                        name={box.name}
                                                        key={box.fsq_id}
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