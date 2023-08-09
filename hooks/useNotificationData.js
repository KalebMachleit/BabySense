import { useState } from "react";

export default function useNotificationData() {
    const [storedNotifications, setStoredNotifications] = useState(notifications)

    return {storedNotifications, setStoredNotifications}
}

const notifications = []