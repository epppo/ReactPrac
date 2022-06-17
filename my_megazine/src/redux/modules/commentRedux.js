import {auth, db} from "../../shared/firebase";
import {collection, 
        where,
        query,
        getDocs, 
        addDoc, 
    } from "firebase/firestore";
import { async } from "@firebase/util";

    const READ_COMMENT = 'my_megazine/READ_COMMENT';
    const WRITE_COMMENT = 'my_megazine/WRITE_COMMENT';


    const initialState = { 
        list: []
    }

    // ------------------------ 액션 ---------------------------------

    export function readcommentAction (comment_list){
        return {type : READ_COMMENT, comment_list }
    }

    export function writecommentAction (new_comment_list){
        console.log(new_comment_list);
        return {type : READ_COMMENT, new_comment_list }
    }


    // ------------------------ 미들웨어 ---------------------------------

    export const readcommentFB = (postID) =>{
        return async function (dispacth){
            const comment_data = await getDocs(collection(db,"comment"))
            let comment_list = [];

            comment_data.forEach((doc) =>{
                comment_list.push({id:doc.id, ...doc.data()});
            });

            console.log(comment_list);

            dispacth(readcommentAction(comment_list));

        }
    }


    export const writecommentFB = (inputComment) =>{
        return async function (dispacth){
            const docRef = await addDoc(collection(db, "comment"), inputComment);
            const commentData = {id : docRef.id, ...inputComment};
            dispacth(writecommentAction(commentData))
        }
    }

    // ------------------------ 리듀서 -----------------------------------

    export default function reducer(state = initialState, action = {}) {
        switch (action.type) { 
            case 'my_megazine/READ_COMMENT' :{
                return {list : action.comment_list}
            }

            case 'my_megazine/WRITE_COMMENT' :{
                const new_comment_list = [...state.list, action.new_comment_list]

                return {list :new_comment_list}

            }

            default:
                return state;
        }}