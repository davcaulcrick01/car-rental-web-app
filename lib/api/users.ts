interface UserPreferences {
    language: string;
    region: string;
    autoLogin: boolean;
    marketingEmails: boolean;
    darkMode: boolean;
}

export const getUserPreferences = async (userId: string): Promise<UserPreferences> => {
    const response = await fetch(`/api/users/${userId}/preferences`);
    if (!response.ok) {
        throw new Error('Failed to fetch user preferences');
    }
    return response.json();
};

export const updateUserPreferences = async (userId: string, preferences: Partial<UserPreferences>): Promise<void> => {
    const response = await fetch(`/api/users/${userId}/preferences`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
    });
    if (!response.ok) {
        throw new Error('Failed to update user preferences');
    }
};
