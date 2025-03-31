import dayjs from "dayjs";

export function formatDuration(startTime: number, endTime: number) {
        const diffMinutes = dayjs(endTime).diff(dayjs(startTime), "minutes");
    
        if (diffMinutes >= 1440) {
            return `${Math.floor(diffMinutes / 1440)} days`;
        } else if (diffMinutes >= 60) {
            return `${Math.floor(diffMinutes / 60)} hours`;
        } else {
            return `${Math.max(diffMinutes, 0)} minutes`;
        }
    };

