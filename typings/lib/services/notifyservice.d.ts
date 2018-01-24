import * as notifier from 'node-notifier';
export interface Notification extends notifier.Notification {
    message: string;
}
export declare class NotificationService {
    private name;
    private version;
    constructor();
    /**
     * Notifies the user with node-notifier.
     *
     * @param {string} message - The message for the notification.
     * @param {object} options - Optional options for the notification.
     * @returns {Promise<any>}
     */
    notify(message: string, options?: object): Promise<any>;
}
