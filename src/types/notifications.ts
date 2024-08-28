export type notifications = {
    id: string;
    title: string;
    message: string;
    createdAt: string;
    updatedAt: string;
    };
export type responseNotifications = {
    message: string;
    notifications: notifications[];
    notificationsNumber: number;
}