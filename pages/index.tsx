import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CardStyle from '../styles/card.module.css'

import Footer from '../components/Footer'
import Header from '../components/Head'

import Card from '../components/Card'
import CoffeeStores from '../data/coffee-stores.json'

import cls from 'classnames'

export default function Home() {
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
                  <p className={styles.subTitle}>Discover your local coffee stores!</p>
               </div>
               <div className={styles.right}>
                  <button className={styles.discoverBtn}>Discover your local coffee stores</button>
               </div>
            </div>

            <div className={cls(`text-center ${CardStyle.cardLayout}`)}>
               {
                  CoffeeStores.map(coffeeStore => {
                        return  <Card
                                    id={coffeeStore.id}
                                    imgUrl={coffeeStore.imgUrl}
                                    name={coffeeStore.name}
                                    websiteUrl={coffeeStore.websiteUrl}
                                 />
                     })
               }
            </div>
         </main>
         <Footer></Footer>
      </div>
  )
}