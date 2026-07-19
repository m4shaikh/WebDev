import { useEffect, useMemo, useState } from "react";
import type { SessionType } from "../../Types/types";

const useCookingTimer = (
    session: SessionType | null
) => {
    
    const [now, setNow] = useState(Date.now());

    useEffect(() => {

        if (
            !session ||
            !session.current_step_data.requires_timer
        ) {
            return;
        }

        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(interval);

    }, [session]);

    const remainingTime = useMemo(() => {

        if (
            !session ||
            !session.current_step_data.requires_timer
        ) {
            return 0;
        }

        const started =
            new Date(session.step_started_at).getTime();

        const elapsed = Math.floor(
            (now - started) / 1000
        );

        return Math.max(
            session.current_step_data.duration - elapsed,
            0
        );

    }, [session, now]);

    const formattedTime = useMemo(() => {

        const mins = Math.floor(remainingTime / 60);
        const secs = remainingTime % 60;

        return `${String(mins).padStart(2, "0")}:${String(
            secs
        ).padStart(2, "0")}`;

    }, [remainingTime]);

    return {
        remainingTime,
        formattedTime,
    };
};

export default useCookingTimer;