
import { storage } from "./shared/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import { modifyPostFB } from "./redux/modules/boardRedux";

import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';


function Modify(props){
    const params = useParams();
    const modi_Index = params.index;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const board_list = useSelector((state)=> state.board.list);
    const [imgFile, setImgFile] = useState(board_list[modi_Index].img);

    const file_link_ref = React.useRef(null);
    const text_ref = React.useRef(null);
    const toDay = new Date();

    const [position, setPosition] = useState();

    const positionCheckEvent = (e) =>{
        setPosition(e.target.value)
        
    }



    const uploadIMG = async (e) => {
        try{
            const uploded_file = await uploadBytes(
                ref(storage, `images/${e.target.files[0].name}`), e.target.files[0]);
                fileImagePreview(e.target.files[0]);
                const file_url = await getDownloadURL(uploded_file.ref);
                file_link_ref.current = { url : file_url};
        } catch{ return file_link_ref.current = null; }
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
        

    const modifyPost = () =>{
        console.log(board_list[modi_Index].img)

        window.setTimeout(()=>{
            dispatch(modifyPostFB({
                id : board_list[modi_Index].id,
                date : toDay.getFullYear()+"-"+(toDay.getMonth()+1)+"-" +toDay.getDate()
                +" "+toDay.getHours()+":"+toDay.getMinutes()+":"+toDay.getSeconds(),
                nick_name: sessionStorage.getItem("nick_name"),
                img : file_link_ref.current == null? 
                    board_list[modi_Index].img 
                    :file_link_ref.current.url,
                text : text_ref.current.value
            }))
            navigate("/");
       }, 1500);
    }


    return (
        <>
            <ModiExplain >
                수정하실거요?  <br />
                표시할 사진의 위치를 지정해주세요<br />
                <span style={{ fontSize: '15px' }}>(수정은 필수가 아니에요 😃)</span>
            </ModiExplain>
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

                <Img src={imgFile} /> <br />


                <div> <span>이미지 : </span><input type="file" onChange={uploadIMG} /> </div><br />

                <div>
                    <label style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>🌼 내용을 적어주세요 🌼</label>
                    <textarea ref={text_ref} class="form-control" id="exampleFormControlTextarea1"
                        style={{ width: '500px', height: '200px', resize: 'none' }}></textarea>
                </div>

                <div>
                    <CreateIcon fontSize="large" style={{ color: 'darkseagreen', marginTop: '20px', marginRight: '50px' }}
                        onClick={() => {
                            modifyPost();
                        }}> 수정 </CreateIcon>

                    <HomeIcon color="disabled" fontSize="large" style={{ color: 'darkseagreen' }} 
                        onClick={() => {
                        navigate("/");
                    }}>홈으로</HomeIcon>
                </div>

            </div>
        </>

    );
}


const Warp = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 1000px;

`;

const ModiExplain = styled.div`
display: flex;
justify-content : space-evenly;
margin-top: 25px;
font-size: 20px;
text-align: center;
flex-direction: column;
`;


const Img = styled.img`
width : 200px;
height : 200px;
`;
export default Modify;