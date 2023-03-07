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


const getCoffeeStoresNearBy = () => {

    if(!navigator.geolocation) {
        console.log('Browser donesn\'t  supported for Geolocation, Please try with next browser!')
    } else {
        navigator.geolocation.getCurrentPosition(success, error)
    }

    function success(position){
        let lat= position.coords.latitude
        let long= position.coords.longitde
        console.log(`${lat}: latitude, ${long}: longitute`)
    }

    function error(e) {
        console.log(`opps! someting went wrong failed to locate your location! ${e}`)
    }
}

/* pre-render content @build time using props returned by getStaticProps() */
export async function getStaticProps() {
    /** coffee connouiser api configuration */
    let FSQData = await getCoffeeStores()
    return {
        props: {
            coffeeStores: FSQData
        }
    }
}


/**  client side  */
export default function Home(props) {
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
                        Discover your local coffee stores!
                        </p>
                    </div>
                    <div className={styles.right}>
                        <button 
                        className={styles.discoverBtn}
                        onClick={getCoffeeStoresNearBy}
                        >
                            Discover your local coffee stores
                        </button>
                    </div>
                </div>
                <div className='box'>
                    <h2 className={CardStyle.boxName}>The Coffee stores</h2>
                    <div className={cls(`text-center ${CardStyle.cardLayout}`)}>
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