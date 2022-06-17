import styled from "@emotion/styled";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {loginFB} from "./redux/modules/userRedux"
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';

const Login = () =>{
    const id_ref = React.useRef();
    const pw_ref = React.useRef();

    const dispacth = useDispatch();
    let navigate = useNavigate();

    const emailCheck =(str) =>{
        let reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        if(!reg_email.test(str)){
            return false;
        }else{
            return true;
        } 
    }

    
    const loginDispacth =() =>{
        let checkEmail= id_ref.current.value;

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

        dispacth(loginFB({
            user_id : id_ref.current.value,
            user_pw : pw_ref.current.value,
        }));
        

    }
    
    return(
        <Wrap>
            <h1 style={{marginBottom:'50px'}}> 🌼 어서오세요 🌼 </h1>
            <TableStyle class="area">
                <InputStyle><FontArea>아이디</FontArea>
                            <InputboxStyle ref={id_ref} style={{marginLeft : '10px'}}/></InputStyle>
                <InputStyle><FontArea>비밀번호</FontArea>
                            <InputboxStyle ref={pw_ref}  style={{marginLeft : '10px'}}/> </InputStyle>
            </TableStyle>

            <div>
                <LoginIcon fontSize="large" style={{ color: 'darkseagreen', marginTop:'50px'}} 
                            onClick={() => {
                                loginDispacth();
                                navigate("/");
                            }
                                }>로그인</LoginIcon>
                <HomeIcon fontSize="large" style={{ color: 'darkseagreen', marginLeft:'80px' }}  
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

const InputboxStyle = styled.input`
margin-left: 10px;
border: 1px solid white;
border-bottom-color: forestgreen;
width: 200px;
`;


const FontArea = styled.span`
width: 80px;
background-color: darkseagreen;
padding: 5px;
border-radius: 15px;
color: white;
display: flex;
align-items: center;
justify-content: center;
font-weight: bold;
`;


const InputStyle = styled.li`
display: flex;
justify-content: flex-end;
margin-bottom: 10px;
`;


export default Login;



