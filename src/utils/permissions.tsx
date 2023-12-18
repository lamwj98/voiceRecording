import { request, PERMISSIONS } from 'react-native-permissions';

const handleRequestPermissions = async () => {
    try {
      const micResult = await request(PERMISSIONS.IOS.MICROPHONE);
      if (micResult === 'granted') {
        console.log('Microphone permission granted');
      } else {
        console.log('Microphone permission denied');
      }

      const mediaLibraryResult = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
      if (mediaLibraryResult === 'granted') {
        console.log('Media library permission granted');
      } else {
        console.log('Media library permission denied');
      }
    } catch (error) {
      console.error('Error requesting permission: ', error);
    }
  };

export default handleRequestPermissions;