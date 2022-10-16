import SSRProvider from 'react-bootstrap/SSRProvider';
import 'bootstrap/dist/css/bootstrap.css'
import "../styles/globals.css"
import {GoogleOAuthProvider} from "@react-oauth/google";
import Head from "next/head"
import {useEffect, useState} from "react";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function App({Component, pageProps}) {
    let [vkInit, setVkInit] = useState(false)
    useEffect(() => {
        VK.init({
            apiId: parseInt(process.env.NEXT_PUBLIC_VK_CLIENT_ID)
        });
        setVkInit(true)
        VK.Widgets.CommunityMessages("vk_community_messages", 216517246, {disableButtonTooltip: 1, disableExpandChatSound: 1});   }, [])
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
