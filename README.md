## Setup Instructions:
- Start the backend app
- Follow directions in the backend README to set up port forwarding if running on localhost
- Edit apiClient.js to point to the port forwarded backend url
- Run the following commands
```bash
npm install
npm start
```
- Download Expo Go from AppStore.
- Scan the QR code with mobile device camera. It should redirect to Expo Go app and display client after short loading period.

#### Troubleshooting:
- VPNs may interfere with the connection to the mobile app. Try turning off any VPNs.

## Development

> ### Implementing a new Controller:
- If the controller is not yet implemented, create a new file in ./services using the following template...
```javascript
import apiClient from './apiClient';

const userController = 'userController';
const endpoint = {
    getUserById: 'getUserById',
}

const getUserById = async () => {
    try {
        const response = await apiClient.get(`/${userController}/${endpoint.getUserById}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export { getUserById };
```
> ### Creating new API connections for existing controller:
- If the controller you want to reference is already in use, find the appropriate ./services/controllerService file.
- Use the following template to implement the new API call...
```javascript
const newGetFunction = async () => {
    try {
        const response = await apiClient.get(`/${userController}/${endpoint.getUserById}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
```
- Add the name of the const to the export. Ex: export { getUserById, newGetFunction };