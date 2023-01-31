import cardStyle from '../styles/card.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Card ({id, imgUrl, name, location}) {
    let {alt_description, urls} = imgUrl
    return (
        <>
            <Link href={`http://localhost:3000/store/${id}`}
            title={name}>
                <div className={cardStyle.card}>
                    <div className={cardStyle.cardTitle}>
                        <h2>{name}</h2>
                    </div>
                    <div className={cardStyle.cardImage}>
                        <Image
                        src={urls.regular} 
                        width="280"
                        height="240"
                        alt={alt_description}
                        title={name}>
                        </Image>
                    </div>
                    <br/>
                    <div className={cardStyle.cardLocation}>
                        <p>{location.address}</p>
                        <p>{location.country}</p>
                        <p>{location.postcode}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}