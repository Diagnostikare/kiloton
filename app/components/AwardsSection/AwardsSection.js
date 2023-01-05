import Image from "next/image"
import styles from './AwardSection.module.scss'


export const AwardsSection = ({ children, ...props }) => {
  return (
    <section 
    className={styles.sectionContainer} {...props}
    >
    <Image
        priority
        className={styles.image}
        raw="true"
        alt="Kilotón"
        width={1440}
        height={792}
        src="/assets/images/landing/award/awards.png"
      />
    </section>
  )
}
