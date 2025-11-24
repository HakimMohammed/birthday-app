import React, {type FormEvent, useState} from 'react';
import {UserPlus, X, Cake} from 'lucide-react';
import type {FriendFrom} from "@/features/home/models/friend-form.ts";
import {friendService} from "@/features/home/services/friend-service.ts"; // Import the type

interface AddFriendFormProps {
    onClose: () => void;
}

export const AddFriendForm: React.FC<AddFriendFormProps> = ({onClose}) => {
    const [formData, setFormData] = useState<FriendFrom>({
        firstName: '',
        lastName: '',
        birthDate: new Date(),
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === 'birthDate') return setFormData(prev => ({...prev, birthDate: new Date(value)}))
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage('');
        setIsLoading(true);

        console.log('Attempting to add friend:', formData);

        try {
            // Mock API call delay
            await friendService.addFriend(formData);

            // Mock success scenario
            setMessage(`Success! Added ${formData.firstName} ${formData.lastName}.`);
            setFormData({firstName: '', lastName: '', birthDate: new Date()}); // Reset form

            // In a real application, you would close the dialog and refresh the event list here.
            onClose();
        } catch (error) {
            setMessage('Failed to add friend. Please try again.');
            console.error('API Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-2xl w-full max-w-md min-w-[500px]">
            <div className="flex justify-between items-center pb-4 border-b">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <UserPlus className="w-5 h-5 mr-2 text-primary"/>
                    New Friend
                </h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                    <X className="w-5 h-5"/>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-red-500"
                    />
                </div>

                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-red-500"
                    />
                </div>

                <div>
                    <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 flex items-center">
                        <Cake className="w-4 h-4 mr-1 text-pink-500"/> Birth Date
                    </label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate.toISOString().split('T')[0]}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-red-500"
                    />
                </div>

                {message && (
                    <p className={`text-sm font-medium p-2 rounded-md ${message.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </p>
                )}

                <div className="pt-4 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <>
                                <UserPlus className="w-4 h-4 mr-1"/> Save Friend
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};