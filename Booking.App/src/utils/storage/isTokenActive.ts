import {jwtDecode} from "jwt-decode";

export const isTokenActive = (token : string | null) => {
    if (!token) {
        return false;
    }

    try {

        // const tokenTest = token.split('.')[1];
        // console.log("tokenTest", tokenTest)
        //
        // const test =  atob(tokenTest);
        //
        // console.log("test", test)
        //
        // const tokenData = JSON.parse(test);
        // console.log("tokenData", tokenData)

        const decodedToken = jwtDecode(token) as any;
        console.log("tokenTest", decodedToken)
        if (decodedToken.exp) {
            const expirationTime = decodedToken.exp * 1000;

            return expirationTime > Date.now();
        } else {
            return true;
        }
    } catch (error) {
        console.error('Error in token decode:', error);
        return false;
    }
};


