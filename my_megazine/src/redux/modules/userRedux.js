import {auth, db} from "../../shared/firebase";
import {collection, 
        where,
        query,
        getDocs, 
        addDoc, 
    } from "firebase/firestore";
        
import { signOut, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword } from "firebase/auth";





const LOGIN = 'my_megazine/LOGIN';
const SIGNUP = 'my_megazine/SIGNUP';
const LOGOUT = 'my_megazine/LOGOUT';
const ISLOGIN = 'my_megazine/ISLOGIN';


const initialState = { 
    list: [
        {
        nick_name: "비회원",
        is_login : false
     }
    ]
}


// ------------------------ 액션 ---------------------------------

export function signupAction(){
    console.log("signup액션");
    return {type : SIGNUP, initialState }
}

export function loginAction(newUserState){
    console.log("login액션");
    console.log(newUserState);
    return {type : LOGIN, newUserState}
}

export function logoutAction(newUserState){
    console.log("logout 액션");
    console.log(newUserState);
    return {type : LOGOUT, newUserState}
}

export function isloginAction(newUserState){
    return {type : ISLOGIN, newUserState}
}


// ------------------------ 미들웨어 ---------------------------------

export const signupFB = (receiveUserInfo) =>{
    return async function (dispacth) {
         await createUserWithEmailAndPassword(
            auth,
            receiveUserInfo.user_id,
            receiveUserInfo.user_pw
        );

        await addDoc(collection(db,"users"),{
            user_id : receiveUserInfo.user_id,
            nick_name:receiveUserInfo.nick_name
        });

        signOut(auth).then(() => {
            console.log("singOut");
        })
        dispacth(signupAction());
    }
}


export const logOut = (receiveUserInfo) =>{
    return function (dispacth){
        sessionStorage.clear();
        const logOutInfo ={
            nick_name: "비회원",
            is_login : false
        }

        console.log(logOutInfo);


        dispacth(logoutAction(logOutInfo));

    }
}


export const loginFB = (receiveUserInfo) =>{
    return async function (dispacth) {

        const user = await signInWithEmailAndPassword(
                auth,
                receiveUserInfo.user_id,
                receiveUserInfo.user_pw
            ).catch(function(error){
                switch(error.code){
                    case "auth/wrong-password":
                        alert("비밀번호를 확인해주세요 !");
                        break;
                    case "auth/invalid-email":
                        alert("E-mail 형식으로 입력해주세요!");
                        break;
                    case "auth/user-not-found":
                        alert("등록되어있지 않은 회원이에요 😢");
                        break;
                    }})

            const user_docs = await getDocs(
                query(collection(db, "users"), where("user_id", "==", user.user.email)));
                
                
                let userInfo=[]
                
                user_docs.forEach((u)=>{
                    sessionStorage.setItem("nick_name", u.data().nick_name);
                    sessionStorage.setItem("user_id", u.data().user_id);
                    userInfo.push(u.data());
                });
                
                alert(sessionStorage.getItem("nick_name")+"님 어서오세요 :D");
                dispacth(loginAction({
                    nick_name : sessionStorage.getItem("nick_name"),
                    is_login : true
                }))
                
        }
}


// ------------------------ 리듀서 -----------------------------------

export default function reducer(state = initialState, action = {}) {
    switch (action.type) { 
        case "my_megazine/SIGNUP":{
            return {list : initialState};
        }

        case "my_megazine/LOGIN":{
            return { list : action.newUserState };
        }

        case "my_megazine/LOGOUT":{
            console.log(action.newUserState)
            return {list : action.newUserState};
        }
        
        case "my_megazine/ISLOGIN":{
            return {list : action.newUserState};
        }

        default:
            return state;
        }
    }
    