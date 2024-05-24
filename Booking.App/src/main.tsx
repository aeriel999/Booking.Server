import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store";
import {getLocalStorage} from "./utils/storage/localStorageUtils.ts";
import {isTokenActive} from "./utils/storage/isTokenActive.ts";
import {autoLogin} from "./store/accounts/account.slice.ts";
import {GoogleOAuthProvider} from "@react-oauth/google";

const token = getLocalStorage('authToken');

if (typeof token === 'string') {
    if (isTokenActive(token)) {
        store.dispatch(autoLogin(token));
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Router>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}>
            <Provider store={store}>
                <App />
            </Provider>
        </GoogleOAuthProvider>
    </Router>,
)

