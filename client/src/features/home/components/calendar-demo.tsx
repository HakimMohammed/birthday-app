import {useEffect, useState} from 'react'
import Calendar from '../../../components/calendar/calendar.tsx'
import {generateEvents} from '@/lib/mock-calendar-events.ts'
import type {CalendarEvent, Mode} from "@/components/calendar/calendar-types.ts";

export default function CalendarDemo() {
    const [events, setEvents] = useState<CalendarEvent[] | undefined>(undefined)
    const [mode, setMode] = useState<Mode>('month')
    const [date, setDate] = useState<Date>(new Date())

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const fetchedEvents = await generateEvents();

                setEvents(fetchedEvents);
            } catch (error) {
                console.error("Failed to fetch calendar events:", error);
                setEvents([]);
            }
        };

        fetchEvents();
    }, [])

    if (events === undefined) {
        return <div>Loading calendar data...</div>;
    }

    return (
        <Calendar
            events={events}
            setEvents={setEvents}
            mode={mode}
            setMode={setMode}
            date={date}
            setDate={setDate}
        />
    )
}