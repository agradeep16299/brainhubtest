import React,{useContext} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import { Store } from '../Store';
function Navbar() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const { state } = useContext(Store);
const {  userInfo } = state;

  const signOut = () => {
    dispatch({
      type: "SET_USER",
      user: null,
    });

    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <Container>
      <Inner>
        <Logo onClick={() => navigate("/")}>
          <img src="./brain_logo.png" alt="" />
        </Logo>
        < ProductBar>
          <button onClick={() => navigate("/addproduct")}>
           <h3>DashBoard Prouct (click me to add product)</h3>
          </button>
        </ProductBar>
        <RightContainer>
          <NavButton
            onClick={user ? () => signOut() : () => navigate("/login")}
          >
            <p>Hello,</p>
            <p>{user ? user?.fullName : "Guest"}</p>
          </NavButton>
          
          <BasketButton onClick={() => navigate("/checkout")}>
            <img src="./basket-icon.png" alt="" />
            <p>{basket?.length}</p>
          </BasketButton>
        </RightContainer>
      </Inner>
      {userInfo && userInfo.isAdmin && (
      < MobileProductBar>
          <button onClick={() => navigate("/addproduct")}>
           <p>DashBoard (Add Product)</p>
          </button>
        </MobileProductBar> 
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color:brown;
  display: flex;
  align-items: center;
  position: relative;

  @media only screen and (max-width: 767px) {
    height: 120px;
    flex-direction: column;
  }
`;
const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 767px) {
    justify-content: space-between;
  }
`;

const Logo = styled.div`
  margin-left: 20px;
  cursor: pointer;
  img {
   width:70px;
   height:70px;
   border-radius: 100%;
   margin-top: 3px;
  }
`;
const ProductBar = styled.div`
  height: 35px;
  flex: 1;
  margin: 0px 15px;
  display: flex;
  align-items: center;
  

  button {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 5px 0px 0px 5px;
    cursor:pointer;
    &::placeholder {
      padding-left: 5px;
    }
  }

  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

const MobileProductBar = styled.div`
  height: 35px;
  width: 90%;
  display: flex;
  align-items: center;
  padding: 10px;

  button {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 5px 0px 0px 5px;

    &::placeholder {
      padding-left: 10px;
    }
  }

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;


const RightContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  justify-content: space-around;
  height: 100%;
  padding: 5px 15px;
`;

const NavButton = styled.div`
  color: #fff;
  padding: 5px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin-right: 15px;

  p {
    &:nth-child(1) {
      font-size: 12px;
    }

    &:nth-child(2) {
      font-size: 14px;
      font-weight: 600;
    }
  }
`;

const BasketButton = styled.div`
  display: flex;
  align-items: center;
  height: 90%;
  cursor: pointer;

  img {
    width: 30px;
    margin-right: 10px;
  }

  p {
    color: #fff;
    font-weight: 500;
  }
`;
export default Navbar;
