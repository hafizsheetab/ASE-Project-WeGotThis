import styles from "./OfferCreation.module.css";
import DateTimeRange from "./DateTimeRange";

type TimeSelectionProps = {
    initialValues?: {
        startTime?: Date;
        endTime?: Date;
    };
};

const TimeSelection: React.FC<TimeSelectionProps> = ({initialValues}) => {
    return (
        <section>
            <div className={styles.categoryHeader}>
                <h2>Time</h2>
                <p>Enter when you are looking</p>
            </div>
            <DateTimeRange
                initialStartTime={initialValues?.startTime}
                initialEndTime={initialValues?.endTime}
            />
        </section>
    );
};

export default TimeSelection;