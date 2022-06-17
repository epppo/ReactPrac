import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePostFB } from "./redux/modules/boardRedux";
import {writecommentFB} from "./redux/modules/commentRedux";

import styled from "styled-components";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

const DetailPage = (props) =>{
    const params = useParams();
    const post_Index = params.index;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const comment_ref = React.useRef(null);

    
    const postContents = useSelector((state)=> state.board.list);
    const commentList = useSelector((state)=>state.comment.list);

    console.log(postContents[post_Index].id);
    

    return(
        <>
        <CardBox>
            <div style={{ display: 'flex' , padding:'0px', margin:'5px', justifyContent: 'space-around'}}>
                
            <NicknameWrap> 
            <span style={{marginLeft : '20px'}}>🌼 {postContents[post_Index].nick_name}</span>
            <span>({postContents[post_Index].date})</span>
            </NicknameWrap>

            {postContents[post_Index].nick_name === sessionStorage.getItem("nick_name") ?
                        <div style={{ marginLeft: '550px' }}>
                            <CreateIcon fontSize="large" style={{ color: 'darkseagreen', marginRight:'10px'}}
                                onClick={() => { navigate("/modify/" + post_Index) }}>수정</CreateIcon>
                            <DeleteIcon fontSize="large" style={{ color: 'darkseagreen'}}
                                onClick={() => {
                                dispatch(deletePostFB(postContents[post_Index].id));
                                navigate("/");
                            }}>삭제</DeleteIcon></div> 
                            : <span style={{display:"flex", alignItems:"center", marginLeft:"425px"}}>본인글만 편집이 가능해요 😢</span>}

            </div>
            
            <Contents style={{flexDirection :  postContents[post_Index].position}}>
                
                <Img src={postContents[post_Index].img}/>

                <TextArea>{postContents[post_Index].text}</TextArea>

                
            </Contents>
            <div>좋아요 </div>
{/*             
            <button onClick={()=>{
                 navigate("/");
            }}>홈으로</button> */}
        </CardBox>

        <CommentArea>
            <CommentInput>
                <NickName>{sessionStorage.getItem("nick_name")} 🌻 </NickName>
            <input style={{width:'700px',height: '30px'}} ref={comment_ref}></input>
            <button onClick={()=>{
                dispatch(writecommentFB({
                    post_id : postContents[post_Index].id,
                    nick_name : sessionStorage.getItem("nick_name"),
                    comment : comment_ref.current.value

                }));
                alert("등록이 완료되었어요 :)");
                navigate("/");
            }}>작성</button>
            </CommentInput>


            {commentList.map((list, index) =>
            <>
              { postContents[post_Index].id == list.post_id ?(  
                    <div style={{display :'flex', margin : '15px', alignItems :'center'}}>
                        <SubdirectoryArrowRightIcon/>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center',  width :'150px' }}>
                        {list.nick_name}</div>
                        <div style={{marginLeft:'35px'}}> {list.comment}</div>
                    </div>)
                    : ""
                }
            </>
            
            )}

        </CommentArea>

        </>
    )

}


const CardBox = styled.div`
width: 1000px;
height: 500px;
padding: 10px;
border: 1px solid rgb(10, 112, 41);
border-radius: 10px;
margin:20px auto 20px auto;
`;


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
height: 400px;
padding: 10px;
`;

const Img = styled.img`
width : 450px;
height : 300px;
`;

const TextArea = styled.div`
width: -webkit-fill-available;
padding: inherit;
text-align: center;
margin-top: 20px;
`;

const CommentArea = styled.div`
width: 1000px;
height: 300px;
padding: 10px;
border: 1px solid rgb(10, 112, 41);
border-radius: 10px;
margin:20px auto 30px auto;
margin-top: 10px;
`;

const CommentInput = styled.div`
display: flex;
align-items: center;
justify-content: center;
justify-content : space-around;;

`;

const NickName = styled.span`   
 width: 180px;
background-color: darkseagreen;
height: 20px;
border-radius: 20px;
display: flex;
align-items: center;
justify-content: center;
color: white;
font-weight: bold;
padding: 10px;
`;


export default DetailPage;



