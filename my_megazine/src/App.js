
import { Link, Route, Routes} from "react-router-dom";
import { onAuthStateChanged,signOut } from "firebase/auth";
import { auth } from "./shared/firebase";

import MainList from './MainList';
import Login from "./Login";
import Signup from "./Signup";
import WritePost from './WritePost';
import Modify from './Modify';
import DetailPage from './DetailPage';


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import {readFB} from "./redux/modules/boardRedux";
import {liksListFB} from "./redux/modules/likeReducer";
import {logOut} from "./redux/modules/userRedux";

import styled from "styled-components";
import HomeIcon from '@mui/icons-material/Home';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {readcommentFB} from "./redux/modules/commentRedux"


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.list);
 
      
  React.useEffect(() =>{
    
    dispatch(readFB());
    dispatch(liksListFB());
    dispatch(readcommentFB());

  }, [])


  return (
    <div className="App">
      <TopMenu>
        <Link to="/"><HomeIcon color="disabled" fontSize="large" style={{ color: 'aliceblue', marginLeft:'20px'}}> Home </HomeIcon></Link>
        <warp>
          { user.is_login ? (
            <div style={{display:'flex', alignItems : 'center'}}>
              <span style={{color:'white', marginRight:"30px"}}>{sessionStorage.getItem("nick_name")}님 어서오세요 ✧*｡٩(ˊᗜˋ*)و✧*｡</span>
              <LogoutIcon fontSize="large" style={{ color: 'aliceblue', marginRight:"20px"}} onClick={() => {
                dispatch(logOut());
                navigate("/");
                alert("로그아웃되었습니다.");
                
              }}> 로그아웃 </LogoutIcon>
              <div style={{ display: 'flex', position: 'fixed', bottom: '50px', right: '80px', color: 'green' }}>
                <AddCircleIcon sx={{ fontSize: 80 }}
                  style={{ color: 'darkseagreen', marginRight:'10px'}}
                  onClick={() => { navigate("/writepost"); }}>새글추가</AddCircleIcon> </div>
            </div>
          )
            :
            (<div style={{display:'flex', alignItems:'center', marginRight: '10px'}}>
              <span style={{color:'white', marginRight:"30px"}}> 비회원님 로그인해주세요 ✧*｡٩(ˊᗜˋ*)و✧*｡</span>
              <Link to="login"><VpnKeyRoundedIcon fontSize="large" style={{ color: 'aliceblue',  marginRight:"30px"}}> 로그인 </VpnKeyRoundedIcon></Link>
              <Link to="signup"><AddReactionIcon fontSize="large" style={{ color: 'aliceblue', marginRight:"20px"}}> 회원가입 </AddReactionIcon></Link>
            </div>)
          }

        </warp>
      </TopMenu>

      <Routes>
        <Route path="/" element={<MainList/>} exact></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/writepost" element={<WritePost/>}></Route>
        <Route path="/modify/:index" element={<Modify/>}></Route>
        <Route path="/detail/:index" element={<DetailPage/>}></Route>
        
        {/* <Route path="/cat/:name" element={<Cat/>}></Route> */}

      </Routes>
    
    </div>
  );
}



const warp = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`;

const TopMenu = styled.header`
display: flex;
width: 1000px;
height: 35px;
padding: 10px;
margin:20px auto 10px auto;

background-color: darkseagreen;
align-items: center;
border-radius: 10px;

justify-content: space-between;
`;



export default App;
