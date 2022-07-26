import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { createContext, useContext } from 'react';
import getFirebase from '../services/firebase';
import { useRouter } from 'next/router'

const firebase = getFirebase();

const AuthContext = createContext<any>(null);

const AuthProvider: React.FC = ({ children }) => {

    const router = useRouter();

    const login = async (email: string, password: string) => {
        if (firebase) {
            try {
                const auth = getAuth();
                if (auth) {
                    const userDetails = await signInWithEmailAndPassword(auth, email, password);
                    localStorage.setItem('user', JSON.stringify({
                        email: userDetails.user.email,
                        uid: userDetails.user.uid
                    }));
                    router.push('/');
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
                localStorage.removeItem('userId');
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
        const user = localStorage.getItem('user') || '{}';
        return JSON.parse(user);
    }

    const contextValue = {
        login,
        logout,
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
