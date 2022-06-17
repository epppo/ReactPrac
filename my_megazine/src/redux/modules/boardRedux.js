
import { db } from "../../shared/firebase";
import {collection, 
        deleteDoc,
        updateDoc,
        getDocs,
        addDoc,
        doc 
    } from "firebase/firestore";



const READ = 'my_megazine/READ';
const WRITE = 'my_megazine/WRITE';
const MODIFY = 'my_megazine/MODIFY';
const DELETE = 'my_megazine/DELETE';


const initialState ={ list : [ ] }

// ------------------------ 액션 ---------------------------------

export function readAction(board_list){
    return {type : READ, board_list}
}

export function writeAction(new_write_list){
    return {type : WRITE, new_write_list}
}


export function deleteAction(post_id){
    return {type : DELETE, post_id}
}

export function modifyAction(post_index, n_post_list){
    return {type : MODIFY, post_index, n_post_list}
}


// ------------------------ 미들웨어 ---------------------------------

export const readFB = ()=>{
    return async function (dispacth)  {
        const board_data = await getDocs(collection(db, "board")); 
        
        let board_list = [];

        board_data.forEach((doc) =>{
            board_list.push({ id: doc.id , ...doc.data()}); 
        });


        dispacth(readAction(board_list)); 
    }
}


export const writePostFB = (receivePostInfo) =>{
    return async function (dispacth){
        const docRef = await addDoc(collection(db, "board"), receivePostInfo);
        const writePostData = {id : docRef.id, ...receivePostInfo};
        dispacth(writeAction(writePostData))
    }
}

export const deletePostFB = (postId) =>{
    return async function(dispacth, getState){
        const doRef = doc(db, "board", postId);
        await deleteDoc(doRef);

        const new_post_list = getState().board.list;
        const post_id = new_post_list.findIndex((words)=>{
           return words.id == postId;
        });

        dispacth(deleteAction(post_id));
    }
}


export const modifyPostFB = (receiveMPostInfo) =>{
    return async function(dispacth, getState){
        const doRef =  doc(db,"board", receiveMPostInfo.id);
        const modiwords ={
            date : receiveMPostInfo.date,
            img : receiveMPostInfo.img, 
            nick_name : receiveMPostInfo.nick_name, 
            text : receiveMPostInfo.text
        };
        
        console.log(modiwords);

        await updateDoc(doRef,modiwords);
        
        const n_post_list = getState().board.list;
        const post_index = n_post_list.findIndex((post)=>{
            return post.id === receiveMPostInfo.id;
        });

        dispacth(modifyAction(post_index, n_post_list));

    }
    
}
// ------------------------ 리듀서 -----------------------------------

export default function reducer(state = initialState, action = {}){
    switch(action.type) {
        case "my_megazine/READ" :{
            return {list: action.board_list};
        }
        
        case "my_megazine/WRITE" : {
            const new_board_list = [...state.list, action.new_write_list]

            return {list : new_board_list}
        }

        case "my_megazine/DELETE" : {
        const new_write_list = state.list.filter((el, idx) => {
                return parseInt(action.post_id) != idx;
            })
            return {list : new_write_list}
        }

        case "my_megazine/MODIFY" :{
            const new_word_list = state.list.map((el, idx) =>{
                if(parseInt(action.post_index) === idx){
                    return { 
                        date : action.n_post_list.date,
                        img : action.n_post_list.img, 
                        nick_name : action.n_post_list.nick_name, 
                        text : action.n_post_list.text

                }}else return el;
            })
            return { list : new_word_list };
        }

        default:
            return state;
    }
}
