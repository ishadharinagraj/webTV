import React, { useEffect, useState } from 'react'
import Loading from '@/utils/loading';
import { useRouter } from "next/router";
import CryptoJS from "crypto-js";
import axios from 'axios';
import { v4 } from "uuid";
import { AES, enc } from 'crypto-js'
import { validateDns } from '@/utils/dnsValidation';


const TokenLogin = () => {
     const router = useRouter();
  const { token } = router.query;
  const [tokenInfo,setTokenInfo] = useState(token);
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  const [serverAddress,setServerAddress]= useState('http://nubiatv.live');
  const SECRET = "12345678901234567890123456789012"; 
   function decryptHexToken(token, SECRET) {
    if (!token || !SECRET) throw new Error("token and SECRET are required");
    const [ivHex, cipherHex] = token.split(":");
    if (!ivHex || !cipherHex) throw new Error("invalid token format");
    const keyWA = CryptoJS.enc.Utf8.parse(SECRET);     
    const ivWA = CryptoJS.enc.Hex.parse(ivHex);
    const cipherWA = CryptoJS.enc.Hex.parse(cipherHex);
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: cipherWA,
    });
    const decryptedWA = CryptoJS.AES.decrypt(cipherParams, keyWA, {
      iv: ivWA,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedStr = decryptedWA.toString(CryptoJS.enc.Utf8);
    if (!decryptedStr) throw new Error("decryption failed or wrong SECRET");
    const parts = decryptedStr.split(":");
    if (parts.length < 3) throw new Error("invalid decrypted token format");
    const timestamp = parseInt(parts.pop(), 10); 
    const password = parts.pop();               
    const username = parts.join(":");           
    setUsername(username);
    setPassword(password);
    const  curentDate = Date.now();
    const diffMs = curentDate - timestamp;
    const diffHours = diffMs / (1000 * 60 * 60);
    console.log("Hour difference:", diffHours);
    if (diffHours > 1) {
    console.log("Token expired (older than 1 hour)");
  } else {
    console.log("Token still valid");
  }
    return { username, password, timestamp };
  }
    
  const convertToHttp = (url) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        } else {
            return 'http://' + url;
        }
    }

  const login=async()=>{
            if (!username || !password) return;
            const dnsCheck = await validateDns(serverAddress);
            if (!dnsCheck.isWhitelisted) {
              console.error(dnsCheck.message || "DNS is not whitelisted!");
              return;
            }
            const uid = v4();
            const convertedUrl = convertToHttp(serverAddress);
                const encryptedPassword = AES.encrypt(password, "thisispassword").toString();
                const encryptedAddress = AES.encrypt(convertedUrl, "thisisserveraddress").toString();
                const dataToSend = {
                    username: username,
                    password: encryptedPassword,
                }
                const params = new URLSearchParams(dataToSend).toString();
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/login?${params}`, {
                headers: {
                    server: encryptedAddress,
                    type:"player-api"
                }
            });

            console.log("response here---",response?.data?.message)
    } catch (error) {
      console.log("error---",error)
    }
  };
  useEffect(()=>{
    if(tokenInfo){
  decryptHexToken(token,SECRET)
    }
  },[tokenInfo]);
  useEffect(()=>{login()},[username])
  return (
    <div>

     <Loading/>   
    </div>
  )
}

export default TokenLogin