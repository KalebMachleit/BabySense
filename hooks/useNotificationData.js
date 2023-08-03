import { useState } from "react";

export default function useNotificationData() {
    const [storedNotifications, setStoredNotifications] = useState(notifications)

    return {storedNotifications, setStoredNotifications}
}

const notifications = [
    {
        timestamp: "2023-08-24"
    },
    {
        timestamp: "2023-08-21"
    },
    {
        timestamp: "2023-08-23"
    },
    {
        timestamp: "2023-08-22"
    },
    {
        timestamp: "2023-08-22"
    },
    {
        timestamp: "2023-08-27"
    },
    {
        timestamp: "2023-08-02"
    },
    {
        timestamp: "2023-08-24"
    },
    {
        timestamp: "2023-08-02"
    },
]