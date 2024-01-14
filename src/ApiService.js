import {jwtDecode} from 'jwt-decode';

const BASE_URL = 'http://127.0.0.1:8000';
const verifyJWT=(token)=>{
    const decoded=jwtDecode(token);
    const currentTimestamp=Date.now();
    return decoded.exp*1000 > currentTimestamp;
}
const refreshTokens = async (token) => {
    try{
        const response = await fetch(BASE_URL+'/auth/refresh',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({'refresh':token})
        });
        const res = await response.json();
        localStorage.setItem('finz-tokens',JSON.stringify({access_token:res.access}))
        return {access_token:res.access, refresh_token:token};
    }
    catch(err){
        console.log('Token refresh error:',err);
    }
}
const logout = () => {
    localStorage.clear();
    window.location.replace('/');
}
export const ApiService = async (url, method, body={}, extraHeaders={}, extraOptions={}) => {
    try {
        let tokens=null;
        if(localStorage.getItem('finz-tokens')){
            tokens = JSON.parse(localStorage.getItem('finz-tokens'))
            const isValid=verifyJWT(tokens.access_token)
            if(!isValid){
                if(!isValid(tokens.refresh_token)) {
                    logout();
                    return;
                }
                tokens=await refreshTokens(tokens.refresh_token)
            }
            const options={method:method,
                headers:{
                    'Authorization':`Bearer ${tokens.access_token}`,
                    // 'Content-type':'application/json',
                    ...extraHeaders
                },
                ...extraOptions}
            if(['PUT','PATCH','POST'].includes(method)){
                options['body']=body;
            }
            const response = await fetch(BASE_URL+url, options);
            const res = await response.json();
            return {success:true, response:res};
        }
        else{
            logout();
            return;
        }
    }
    catch(err){
        console.log(`err in ${url}:`,err);
        return {success:false, error: err}
    }
}