import styles from "./OfferCreation.module.css"
import DateTimeRange from "./DateTimeRange";

const TimeSelection = () => {
  return (
    <section>
            <div className={styles.categoryHeader}>
                <h2>Time</h2>
                <p>Enter for when you are looking</p>
            </div>

            <DateTimeRange/>
    </section>
  )
}

export default TimeSelection