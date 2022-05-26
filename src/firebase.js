import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA03r7w3ujow94vabWcx57_EQex9kS9Wjw",
  authDomain: "alkemy-challenge-5b6cd.firebaseapp.com",
  projectId: "alkemy-challenge-5b6cd",
  storageBucket: "alkemy-challenge-5b6cd.appspot.com",
  messagingSenderId: "860862781817",
  appId: "1:860862781817:web:901788af3aefa2429677a8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
