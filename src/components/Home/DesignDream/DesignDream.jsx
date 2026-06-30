import React from 'react'
import styles from '../DesignDream/DesignDream.module.css'
import right from '../../../assets/icons/rightarrow.svg'
import home from '../../../assets/designhome.png'
import { useNavigate } from 'react-router-dom'

const DesignDream = () => {
	const navigate =useNavigate();
	return (
		<div className={styles.parentContainer}>
			<div className={styles.mainContainer}>
				<div className={styles.child}>
					<div className={styles.leftContent}>
						<div className={styles.headContext}>
							<h3>Design Your Dream Home — Start with <span className={styles.redText}>Just One Click!</span></h3>
							<div className={styles.head2}>
								Just pick your home type below to get a personalized interior estimate — no calls, no delays. Fast. Simple. Free.
							</div>
						</div>
						<div className={styles.selectGrid}>
							<div className={styles.box1}>Studio Room</div>
							<div className={styles.box1}>1 BHK</div>
							<div className={styles.box1}>2 BHK</div>
							<div className={styles.box1}>3 BHK</div>
							<div className={`${styles.box1} ${styles.flowButton}`}><span className={styles.arrow}><img src={right} alt="" /></span></div>
							<div className={styles.box1}>4 BHK</div>
							<div className={styles.box1}>5 BHK</div>
							<div className={styles.box1}>6 BHK</div>
							<div className={styles.box1}>3 BHk</div>
						</div>
					</div>
					<div className={styles.rightContent}>
						<div className={styles.imageContainer}>
							<img src={home} alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DesignDream