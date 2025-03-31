import styles from "./OfferCreation.module.css";
import DateTimeRange from "./DateTimeRange";

type TimeSelectionProps = {
    initialValues?: {
        startTime?: Date;
        endTime?: Date;
    };
    setTime: (x: number, y: number) => void
};

const TimeSelection: React.FC<TimeSelectionProps> = ({initialValues, setTime}) => {
    return (
        <section>
            <div className={styles.categoryHeader}>
                <h2>Time</h2>
                <p>When should the task take place?</p>
            </div>
            <DateTimeRange
                initialStartTime={initialValues?.startTime}
                initialEndTime={initialValues?.endTime}
                setTime={setTime}
            />
        </section>
    );
};

export default TimeSelection;