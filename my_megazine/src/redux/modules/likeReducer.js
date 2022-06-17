import { collection,
         addDoc,
         getDoc,
         getDocs,
         query,
         where,
         deleteDoc,
         doc
 } from "firebase/firestore";
import { db } from "../../shared/firebase";
import { useSelector } from "react-redux";
import { async } from "@firebase/util";

const ADDLIKE = 'my_megazine/ADDLIKE';
const DELETELIKE = 'my_megazine/DELETELIKE';
const ROADLIKE = 'my_megazine/ROADLIKE';
const SETLIKE = 'my_megazine/SETLIKE';


const initialState ={ list : [ ] }


// ------------------------ 액션 ---------------------------------

export function readlikeAction(likes_list){
    return {type : ROADLIKE, likes_list }
}

export function addlikeAction(like_state){
    return {type:ADDLIKE, like_state}
}

export function deleteAction(stateDeleteId){
    return {type:DELETELIKE,stateDeleteId }
}

// ------------------------ 미들웨어 ---------------------------------


export const liksListFB = ()=>{
    return async function (dispacth){
        const like_data = await getDocs(collection(db, "likes"));
        let likes_list = [];

        like_data.forEach((doc)=>{
            likes_list.push({id:doc.id, ...doc.data()});
        })

        dispacth(readlikeAction(likes_list));
    }
}

export const changeLikeFB = (receiveUserId, postId) =>{
    return async function (dispacth, getState) {

        const userLike = {
            user_id: receiveUserId,
            post_id: postId
        }

        let likeBoardList = getState().like.list;
        console.log("state:::::" , likeBoardList);
        let list_id = likeBoardList.id;
        console.log("-----", list_id);


        if(!list_id){
            const docRef = await addDoc(collection(db,"likes"),userLike);
            console.log(docRef.id);
           
            const like_state = {
                id : docRef.id, ...userLike
            }
            dispacth(addlikeAction(like_state))
        
        }else{
            console.log("삭제해야해");
            await deleteDoc(doc(db, "likes", list_id ));
            const stateDeleteId = likeBoardList.findIndex((index)=>{
                return index.id == list_id
            });
            console.log("완");
            console.log(stateDeleteId);
            dispacth(deleteAction(stateDeleteId));
        }

    }
}

// ------------------------ 리듀서 -----------------------------------

export default function reducer(state = initialState, action = {}) {
    switch (action.type) { 
        case "my_megazine/ROADLIKE" :{
            return {list :action.likes_list}
        }
        case "my_megazine/ADDLIKE":{
            const new_like_list = [...state.list, action.like_state]
            return {list : new_like_list}
        }

        case "my_megazine/DELETELIKE" : {
            const new_like_list = state.list.filter((el, idx)=>{
                return parseInt(action.stateDeleteId) != idx;
            })
            return {list : new_like_list}
        }




        default:
            return state;
        }
    }
    