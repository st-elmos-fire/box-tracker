import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../lib/context/auth-context'
import { DatabaseProvider } from '../lib/context/database-context'

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthProvider>
    <DatabaseProvider>
      <Component {...pageProps} />
    </DatabaseProvider>
    </AuthProvider>
}

export default MyApp
