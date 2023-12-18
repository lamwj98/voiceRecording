import BackgroundActions from 'react-native-background-actions';

type BackgroundTaskFunction = (taskData?: { key1: string } | undefined) => Promise<void>;

const startBackgroundTask = async (task : BackgroundTaskFunction) => {
    try {
        await BackgroundActions.start(task, {
            taskName: 'Background Recording',
            taskTitle: 'Background Recording',
            taskDesc: 'Background Recording',
            taskIcon: {
              name: 'ic_launcher',
              type: 'mipmap',
            }
          });
          console.log("Recording in background started");
    } catch (e) {
        console.error("Error staring recording in background: ", e);
    }
}

const stopBackgroundTask = async (cleanUpTask: () => void) => {
    try {
        cleanUpTask();
        await BackgroundActions.stop();
        console.log("Recording in background stopped");
    } catch (e) {
        console.error("Error stopping recording in background: ", e);
    }
}

export { startBackgroundTask, stopBackgroundTask };