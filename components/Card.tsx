import cardStyle from '../styles/card.module.css'
import Link from 'next/link'

export default function Card ({id, name, imgUrl}) {
    return (
        <>
            <Link href={`http://localhost:3000/store/${id}`}
            title={imgUrl}>
                <div className={cardStyle.card}>
                    <div className={cardStyle.cardTitle}>
                        <h2>{name}</h2>
                    </div>
                    <div className={cardStyle.cardImage}>
                        <img
                        src={imgUrl} 
                        width="100%"
                        height="280"
                        alt={imgUrl} 
                        title={name} />
                    </div>
                </div>
            </Link>
        </>
    )
}