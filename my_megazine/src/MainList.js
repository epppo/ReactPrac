import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
// import { useNavigate } from "react-router-dom";


import { deletePostFB } from "./redux/modules/boardRedux";
import { changeLikeFB } from "./redux/modules/likeReducer";

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';


const MainList = (props) =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [likeImg, setHeart] = useState("🤍");
    const [ like, setLike] = useState(false);


    
    const board_list = useSelector((state) => state.board.list);

    const toggleLike = async (e) => {
        if(like === false){
            setHeart("❤️");
            setLike(true);
        }else if(like===true){
            setHeart("🤍");
            setLike(false);
        }
     }



    return (
        <div>
        {board_list.map((list, index) => 
            <><CardBox key={index}>
                <div style={{ display: 'flex' , padding:'0px', margin:'5px', justifyContent: 'space-around'}}>
                    <NicknameWrap>
                    <span style={{marginLeft : '20px'}}>🌼 {list.nick_name}</span>
                    <span>({list.date})</span>
                    </NicknameWrap>

                    {list.nick_name === sessionStorage.getItem("nick_name") ?
                        <div style={{ marginLeft: '550px' }}>
                            <CreateIcon fontSize="large" style={{ color: 'darkseagreen', marginRight:'10px'}}
                                onClick={() => { navigate("/modify/" + index) }}>수정</CreateIcon>
                            <DeleteIcon fontSize="large" style={{ color: 'darkseagreen'}}
                                onClick={() => {
                                dispatch(deletePostFB(board_list[index].id));
                                navigate("/");
                            }}>삭제</DeleteIcon></div> 
                            : <span style={{display:"flex", alignItems:"center", marginLeft:"425px"}}>본인글만 편집이 가능해요 😢</span>}
                </div>

                <Contents style={{flexDirection : list.position}} onClick={() => { navigate("/detail/" + index) }}>
                    <ImgWrap> <Img src={list.img} /></ImgWrap>
                    <TextArea>{list.text}</TextArea>

                </Contents>

                <div> <span style={{marginLeft :'20px'}} onClick={() => {
                    toggleLike();
                    dispatch(changeLikeFB(sessionStorage.getItem("user_id"), list.id));
                }}>{likeImg}</span>
                <span style={{marginLeft :'20px'}} >{list.likes}</span>
                
                </div>

            </CardBox></>

    )}</div>

    );

}


const NicknameWrap = styled.div`
display: flex;
border: 1px solid darkseagreen;
padding: 8px;
align-items: center;
height: 25px;
width: 300px;
border-radius: 20px;
background-color: darkseagreen;
color: white;
justify-content: space-evenly;
`;



const Contents = styled.div`
display: flex;
align-items: center;
height: 250px;
padding: 10px;
`;

const TextArea = styled.div`
width: -webkit-fill-available;
padding: inherit;
text-align: center;
`;

const ImgWrap = styled.div`
width : 310px;
height : 250px;
display: flex;
margin: 10px
border-radius: 20px;
align-items: center;
`;


const Img = styled.img`
width : 280px;
height : 200px;
border: 2px solid white;
border-radius: 20px;
`;

const CardBox = styled.div`
width: 1000px;
height: 350px;
padding: 10px;
border: 1px solid rgb(10, 112, 41);
border-radius: 10px;
margin:20px auto 30px auto;
`;



export default MainList;