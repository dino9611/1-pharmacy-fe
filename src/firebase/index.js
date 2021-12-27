import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyBR9XU6sbgvvPxHiPAlhYWd-D0eaAtoM0Y',
	authDomain: 'pharma-e2bef.firebaseapp.com',
	projectId: 'pharma-e2bef',
	storageBucket: 'pharma-e2bef.appspot.com',
	messagingSenderId: '208385451402',
	appId: '1:208385451402:web:70dc4b547c3ec850b8d473',
	measurementId: 'G-ZKCH2RYZQ4',
};
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { app, storage };
