import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && user.userData.isAuth) {    //이부분은 로그인 한 사람들이 보이는 페이지
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <a href="/diary/upload">다이어리 작성</a>
        </Menu.Item>
        <Menu.Item key="userName">
          {user.userData.name}                    
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (        //이부분은 로그인 안 한 사람들이 보이는 페이지
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">로그인</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">회원가입</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);


