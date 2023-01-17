import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CardStyle from '../styles/card.module.css'

import Footer from '../components/Footer'
import Header from '../components/Head'

import Card from '../components/Card'
import CoffeeStoresData from '../data/coffee-stores.json'

import cls from 'classnames'

/* pre-render content @build time using props returned by getStaticProps() */
export async function getStaticProps() {
    return {
        props: {
            CoffeeStores: CoffeeStoresData
        }
    }
}

/**  client side  */
export default function Home(props) {
    
  return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Header title="Coffee connouiser store"/>
                <div className={styles.homeBannerWrapper}>
                    <div className={styles.left}>
                        <h1 className={styles.title}>
                            <a href="#">
                                <span className={styles.w1}>Coffee</span> <br/>
                                <span className={styles.w2}>Connoisseur</span>
                            </a>
                        </h1>
                        <p 
                        className={styles.subTitle}
                        >Discover your local coffee stores!</p>
                    </div>
                    <div className={styles.right}>
                        <button className={styles.discoverBtn}>Discover your local coffee stores</button>
                    </div>
                </div>


                <div className='box'>
                    <h2 className={CardStyle.boxName}>Coffee connouiser stores @ Dadar</h2>
                    <div className={cls(`text-center ${CardStyle.cardLayout}`)}>
                        {
                            props.CoffeeStores.map(coffeeStore => {
                                    return  (
                                                <Card
                                                    id={coffeeStore.storeId}
                                                    imgUrl={coffeeStore.imgUrl}
                                                    name={coffeeStore.name}
                                                    key={coffeeStore.id}
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