import cardStyle from '../styles/card.module.css'

export default function Card ({id, name, imgUrl, websiteUrl}) {
    return (
        <a href={websiteUrl}
        target="_blank">
            <div className={cardStyle.card}>
                <div className={cardStyle.cardTitle}>
                    <h2>{name}</h2>
                </div>
                <div className={cardStyle.cardImage}>
                    <img
                    src={imgUrl} 
                    alt="" 
                    width="100%"
                    height="280"
                    title={name} />
                </div>
            </div>
        </a>
    )
}