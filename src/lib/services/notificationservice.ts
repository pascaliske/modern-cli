import * as notifier from 'node-notifier'
import { Service, Inject } from '../container'

export interface Notification extends notifier.Notification {
    message: string
}

@Service()
export class NotificationService {
    /* --- constants --- */

    /* --- properties --- */

    @Inject('name')
    private name: string

    @Inject('version')
    private version: string

    /* --- constructor --- */

    /* --- protected --- */

    /* --- public --- */

    /**
     * Notifies the user with node-notifier.
     *
     * @param {string} message - The message for the notification.
     * @param {object} options - Optional options for the notification.
     * @returns {Promise<any>}
     */
    public notify(message: string, options: object = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            const defaults: Notification = {
                title: `${this.name}@${this.version}`,
                message: message,
                sound: true
            }

            notifier.notify(Object.assign(defaults, options), (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    }
}
