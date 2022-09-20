import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAzUOoByiUFTejU-N45JINAx1zPPBPSDvo",
    authDomain: "clown-clothing-27dc0.firebaseapp.com",
    projectId: "clown-clothing-27dc0",
    storageBucket: "clown-clothing-27dc0.appspot.com",
    messagingSenderId: "951167321346",
    appId: "1:951167321346:web:86994e235ba1f54c5cae1b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object)=>{
        const docRef= doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object);
    });

    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async ()=>{
    const collectionRef = collection(db, 'categories');
    const q=query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoryMap= querySnapshot.docs.reduce((acc, docSnapshot)=>{
        const {title, items}=docSnapshot.data();
        acc[title.toLowerCase()]=items;
        return acc;
    },{})

    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) { console.log(error.message); }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password)
}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password)
}

export const signOutUser = async()=> signOut(auth);

export const onAuthStateChangedListener = (callback)=>onAuthStateChanged(auth,callback);