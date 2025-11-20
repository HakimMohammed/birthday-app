import {addDays, setYear, isFuture} from 'date-fns'
import {colorOptions} from '@/components/calendar/calendar-tailwind-classes'
import type {CalendarEvent} from "@/components/calendar/calendar-types.ts";
import {friendService} from "@/features/home/services/friend-service.ts"; // Import the friend service
import type {Friend} from "@/features/home/models/friend.ts"; // Import the Friend type

const BIRTHDAY_COLOR = colorOptions[0].value;
const NUM_YEARS_TO_PROJECT = 5;

export async function generateFriendBirthdayEvents(): Promise<CalendarEvent[]> {
    try {
        const friends: Friend[] = await friendService.findAll();
        const allEvents: CalendarEvent[] = [];
        const currentYear = new Date().getFullYear();

        friends.forEach((friend) => {
            const birthdayDate = new Date(friend.birthDate);
            const title = `${friend.firstName} ${friend.lastName} Birthday`;

            for (let i = 0; i < NUM_YEARS_TO_PROJECT; i++) {
                const year = currentYear + i;

                const projectedBirthday = setYear(birthdayDate, year);

                if (!isFuture(projectedBirthday) && year < currentYear) {
                    continue;
                }

                const start = projectedBirthday;

                const end = addDays(start, 1);

                const uniqueId = `${friend.id}-${year}`;

                allEvents.push({
                    id: uniqueId,
                    title: title,
                    color: BIRTHDAY_COLOR,
                    start: start,
                    end: end,
                });
            }
        });

        return allEvents.sort((a, b) => a.start.getTime() - b.start.getTime());

    } catch (error) {
        console.error("Failed to generate birthday events from friends service:", error);
        return [];
    }
}

export {generateFriendBirthdayEvents as generateEvents};