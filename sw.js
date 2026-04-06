self.addEventListener('push', (event) => {
  const data = event.data.json();

  const options = {
    body: data.body,
    icon: '/icon.png',
    badge: '/badge.png', // Small icon for the status bar
    tag: `urgent-alert: ${Date.now().toString()}`, // Unique ID: new notifications with same tag replace old ones
    renotify: true,      // Causes device to vibrate/ring even if tag is same
    vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40],
    data: { url: data.url || '/' }
  };

  self.registration.showNotification(data.title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});