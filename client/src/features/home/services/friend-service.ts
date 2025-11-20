import type {Friend} from "@/features/home/models/friend.ts";
import api from "@/utils/api.ts";
import type {FriendFrom} from "@/features/home/models/friend-form.ts";

export const friendService = {

    findAll: async (): Promise<Friend[]> => {
        try {
            const response = await api.get<Friend[]>('/api/friends');
            return response.data;
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    addFriend: async (data: FriendFrom): Promise<void> => {
        try {
            await api.post('/api/friends', data);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }


};