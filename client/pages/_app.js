import SSRProvider from 'react-bootstrap/SSRProvider';
import 'bootstrap/dist/css/bootstrap.css'
import "../styles/globals.css"
import {GoogleOAuthProvider} from "@react-oauth/google";

function App({Component, pageProps}) {
    return <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}><SSRProvider><Component {...pageProps} /></SSRProvider></GoogleOAuthProvider>
}

export default App
