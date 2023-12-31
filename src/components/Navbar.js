import React, { useContext } from 'react';
import "../css/Navbar.css"
import accPic from '../images/accJSX.svg';
import cartPic from '../images/cart.svg';
import SignIn from './SignIn';
import { useState, useEffect, useRef } from 'react';
import { UserContext, CartContext } from '../App';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    const currentUser = useContext(UserContext);
    const cart = useContext(CartContext);
    const boxRef = useRef(null);
    const topButtonRef = useRef(null);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (event.target !== undefined && boxRef.current && !boxRef.current.contains(event.target)
                && (topButtonRef.current && !topButtonRef.current.contains(event.target))) {
                props.changeClick(false);
            }
        }
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [boxRef]);

    return (
        <>
            <div className="Navbar" style={{ zIndex: '10' }}>
                <div style={{ backgroundColor: "#ffe1bd" }} className="flex justify-center">
                    <Link to="/" className="text-6xl text-center mp-4" id="logoH1">Spicy Bite</Link>
                </div>
                <div className="border-t-2 border-b-2 border-offblack flex flex-row justify-between h-12">
                    <Link to="/Menu" className="bg-sea hover:bg-sealight font-bold py-2 px-2 border-r-2
                    border-offblack text-center flex items-center text-offblack shrink-0 itemNav">Menu</Link>
                    {/* <Link to="/Find-Us" className="bg-sea hover:bg-sealight font-bold py-2 px-2 border-r-2
                    border-offblack text-center flex items-center text-offblack shrink-0 itemNav">Find Us</Link> */}
                    <div className="flex-auto whitespace-nowrap text-offblack bg-terra" id="scroll-container">
                        <div id="scroll-text" className="text-2xl mt-1">For 15% off on all menu items use coupon XMAS15 on checkout at any of our locations during the period of 20.07.2023 till 28.12.2023</div>
                    </div>
                    <div className="flex flex-row shrink-0">
                        <button className="buttonBorder bg-sea hover:bg-sealight" onClick={() => props.changeClick(!props.clicked)} ref={topButtonRef}>
                            <img src={accPic} className="float-right w-10 pt-1 mx-3 justify-end" alt=" "></img>
                        </button>
                        <Link to='/Order' className="buttonBorder bg-sea hover:bg-sealight">
                            <div className='float-right relative'>
                            <img src={cartPic} className="w-10 pt-1 mx-3 justify-end"></img>
                            {currentUser && Object.keys(cart).length > 0 &&
                            <div className='absolute top-0 left-0 bg-terra w-4 h-4 text-offblack border-2 border-t-0 border-l-0 border-offblack text-xs text-align-center flex flex-row align-center justify-center textSignin'>{Object.keys(cart).length}</div>}
                            </div>
                        </Link>
                    </div>
                </div>
                {props.clicked &&
                    <div id="userDiv">
                        <SignIn authot={props.authot} changeAuth={props.changeAuth} changeClick={props.changeClick} boxRef={boxRef}></SignIn>
                    </div>}
            </div>
            <div className='phantomNavbar'></div>
        </>
    )
}
export default Navbar;