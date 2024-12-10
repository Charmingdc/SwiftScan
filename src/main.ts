import { Logger } from '../log.ts';

// import controller
import { initController } from './scripts/controller/controller.ts';




const initApp = async () => {
  await initController(); // initialize controller 
};
initApp();
