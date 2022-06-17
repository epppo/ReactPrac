import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {signupFB} from "./redux/modules/userRedux";

import AddReactionIcon from '@mui/icons-material/AddReaction';
import HomeIcon from '@mui/icons-material/Home';


const Signup = () =>{
    const dispacth = useDispatch();
    const navigate = useNavigate();
    
    const id_ref = React.useRef();
    const pw_ref = React.useRef();
    const pw_ref2 = React.useRef();
    const nick_name_ref = React.useRef();

    const emailCheck =(str) =>{
        let reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        if(!reg_email.test(str)){
            return false;
        }else{
            return true;
        } 
    }

    

    const signUpDispacth =() =>{
        
        let checkEmail= id_ref.current.value;
        let checkPw = pw_ref.current.value;
        let checkPw2 = pw_ref2.current.value;
        


        console.log(checkPw, checkPw2   );

        
        if (!checkEmail) {
            alert("이메일을 입력하세요!");
            checkEmail.focus();	
            return;
        }
        else if(!emailCheck(checkEmail))	{
			alert("이메일 형식이 잘못되었습니다");
			checkEmail.focus();
			return;
        }

        if(checkPw != checkPw2){
            alert("비밀번호가 일치하지 않습니다.")
            return;
        }


        dispacth(signupFB({
            user_id : id_ref.current.value,
            user_pw : pw_ref.current.value,
            nick_name :  nick_name_ref.current.value
        }));

        alert("회원가입이 완료되었습니다. 로그인해주세요! :D");
        navigate("/login");
};



    return(
        <Wrap>
            <h1 style={{marginBottom:'40px'}}>  회원가입 🎉  </h1>
                <TableStyle>
                    <InputStyle><FontArea>아이디</FontArea> 
                        <InputboxStyle ref={id_ref} /></InputStyle>
                    <InputStyle><FontArea>비밀번호</FontArea>
                        <InputboxStyle ref={pw_ref} /></InputStyle>
                    <InputStyle><FontArea>비밀번호 확인</FontArea>
                        <InputboxStyle ref={pw_ref2} /></InputStyle>
                    <InputStyle><FontArea>닉네임</FontArea>
                        <InputboxStyle ref={nick_name_ref} /></InputStyle>
                </TableStyle>
                <div>
                    <AddReactionIcon fontSize="large" style={{ color: 'darkseagreen', marginRight:"50px"}}
                        onClick={signUpDispacth}>회원가입</AddReactionIcon>
                    <HomeIcon fontSize="large" style={{ color: 'darkseagreen' }}  
                            onClick={() => { navigate("/"); }}> 홈으로 </HomeIcon>
                </div>
        </Wrap>
    )

}

const Wrap = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 50px;
`;

const TableStyle = styled.ul`
display: flex;
flex-direction: column;
list-style-type: none;
margin-left: -80px;
`;

const InputStyle = styled.li`
display: flex;
justify-content: flex-end;
margin-bottom: 20px;
`;

const FontArea = styled.span`
width: 110px;
background-color: darkseagreen;
padding: 5px;
border-radius: 15px;
color: white;
display: flex;
align-items: center;
justify-content: center;
font-weight: bold;
`;

const InputboxStyle = styled.input`
margin-left: 10px;
border: 1px solid white;
border-bottom-color: forestgreen;
width: 200px;
`;


export default Signup;