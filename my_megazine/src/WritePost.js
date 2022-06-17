import { storage } from "./shared/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { writePostFB } from "./redux/modules/boardRedux";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';


function WritePost(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imgFile, setImgFile] = useState();

    
    const toDay = new Date();
    const file_link_ref = React.useRef(null);
    const text_ref = React.useRef(null);
    const [position, setPosition] = useState();

    const positionCheckEvent = (e) =>{
        setPosition(e.target.value)
        
    }


    const uploadIMG = async (e) => {

        console.log(e.target.files);
        const uploded_file = await uploadBytes(
            ref(storage, `images/${e.target.files[0].name}`),
            e.target.files[0]);
            fileImagePreview(e.target.files[0]);
            const file_url = await getDownloadURL(uploded_file.ref);
            file_link_ref.current = { url : file_url};

    }

    const fileImagePreview = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        
        return new Promise((resolve) => {
            reader.onload = () => {
                setImgFile(reader.result);
                resolve();
            };
        
        });
    };
    
    console.log(imgFile);

    
    const postWords = () =>{
        window.setTimeout(()=>{
            dispatch(writePostFB({
                nick_name : sessionStorage.getItem("nick_name"),
                date : toDay.getFullYear()+"-"+(toDay.getMonth()+1)+"-" +toDay.getDate()
                +" "+toDay.getHours()+":"+toDay.getMinutes()+":"+toDay.getSeconds(),
                img : file_link_ref.current.url,
                text : text_ref.current.value,
                likes : "0",
                position: position
            }))
            navigate("/");
       }, 1500);
    }

    return (
        <>
            <WriteExplain >
                작성하실거에요?  <br />
                표시할 사진의 위치를 지정해주세요<br />
                <span style={{ fontSize: '15px' }}>(사진은 꼭 등록해주셔야해요 😃)</span>
            </WriteExplain>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <input class="form-check-input"
                    type="radio" value="row-reverse"
                    name="setPostion"
                    onChange={positionCheckEvent} />
                <label class="form-check-label">LEFT</label>

                <input class="form-check-input"
                    type="radio" value="column"
                    name="setPostion"
                    onChange={positionCheckEvent} />
                <label class="form-check-label" >CENTER</label>

                <input class="form-check-input"
                    type="radio" value="row"
                    name="setPostion"
                    onChange={positionCheckEvent} />
                <label class="form-check-label">RIGHT</label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <Img src={imgFile} /><br />

                <div>
                    <span>이미지 : </span><input type="file" onChange={uploadIMG} /> </div><br />
                
                 <div>
                    <label style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>🌼 내용을 적어주세요 🌼</label>
                    <textarea ref={text_ref} class="form-control" id="exampleFormControlTextarea1"
                        style={{ width: '500px', height: '200px', resize: 'none' }}></textarea>
                </div>

                <div style={{marginTop: '20px'}}>
                    <AddCircleIcon fontSize="large" style={{ color: 'darkseagreen', marginRight:'50px'}}
                        onClick={() => { postWords(); }}> 게시글 등록 </AddCircleIcon>
                    <HomeIcon fontSize="large" style={{ color: 'darkseagreen' }}  
                        onClick={() => { navigate("/"); }}> 홈으로 </HomeIcon>
                    
                </div>
            </div>

        </>
    );
}



const WriteExplain = styled.div`
display: flex;
justify-content : space-evenly;
margin-top: 25px;
font-size: 20px;
text-align: center;
flex-direction: column;
`;

const Img = styled.img`
margin: 20px 0px;
width : 200px;
height : 200px;
`;

const Warp = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 1000px;

`;


const Input = styled.input`  
width: 390px;
height: 32px;
font-size: 15px;
border: 0;
border-radius: 15px;
outline: none;
padding-left: 10px;
background-color: rgb(233, 233, 233);
margin-top:15px`;


export default WritePost;