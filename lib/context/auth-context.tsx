import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, } from 'firebase/auth';
import { createContext, useContext } from 'react';
import getFirebase from '../services/firebase';
import { useRouter } from 'next/router'
import { getDatabase, ref, onValue } from "firebase/database";

const firebase = getFirebase();

const AuthContext = createContext<any>(null);

const AuthProvider: React.FC = ({ children }) => {


    const router = useRouter();

    const getDBDetails = (uid: string) => {
        let userData = {};
        if (firebase) {
            const db = getDatabase(firebase)
            try {
                const userRef = ref(db, `users/${uid}`)
                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        localStorage.setItem('user', JSON.stringify(data));
                        router.push('/');
                    }
                })
            } catch (error) {
                console.error(error);
            }
        }
    }

    const login = async (email: string, password: string) => {
        if (firebase) {
            try {
                const auth = getAuth();
                if (auth) {
                    const userDetails = await signInWithEmailAndPassword(auth, email, password);
                    if (userDetails.user) {
                        getDBDetails(userDetails.user.uid);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    const logout = async () => {
       if (firebase) {
        try {
            const auth = getAuth();
            if (auth) {
                await auth.signOut();
                localStorage.removeItem('user');
            }
        } catch (error) {
            console.error(error);
        }
       }
    }

    const register = async (email: string, password: string, name: string) => {
        if (firebase) {
            try {
                const auth = getAuth();
                if (auth) {
                    await createUserWithEmailAndPassword(auth, email, password);
                    login(email, password);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    const getUser = () => {
        if (typeof window === 'undefined') {
            throw new Error('getUser can only be called in the browser. Try calling it from a useEffect hook.');
        }
        return JSON.parse(localStorage.getItem('user') || '{}');
    }

    const contextValue = {
        login,
        logout,
        register,
        getUser
    };

    return (<AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>);
}

const useAuth = () => {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };

export default useAuth;

