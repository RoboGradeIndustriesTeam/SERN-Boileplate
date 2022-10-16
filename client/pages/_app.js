import SSRProvider from 'react-bootstrap/SSRProvider';
import 'bootstrap/dist/css/bootstrap.css'
import "../styles/globals.css"
import {GoogleOAuthProvider} from "@react-oauth/google";
import Head from "next/head"
import {useEffect, useState} from "react";

function App({Component, pageProps}) {
    let [vkInit, setVkInit] = useState(false)
    useEffect(() => {
        VK.init({
            apiId: parseInt(process.env.NEXT_PUBLIC_VK_CLIENT_ID)
        });
        setVkInit(true)
    }, [])
    return <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <SSRProvider>
            <Head>
                <script src="https://vk.com/js/api/openapi.js?169" type="text/javascript"></script>
            </Head>
            <div id="vk_community_messages"></div>

            {vkInit ? <Component {...pageProps} /> : ""}
        </SSRProvider>
    </GoogleOAuthProvider>
}

export default App
