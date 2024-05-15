import {useEffect} from "react";
import {getListOfChatRooms} from "../../store/chat/chat.action.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import { startListening} from "../../SignalR";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

export default  function UserProfilePage (){
    const {user} = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
   // const {listChats} = useAppSelector(state => state.chat);

    useEffect(() => {
        if(user)
        {
            const getRooms = async ()=>{
                try {
                    const response = await dispatch(getListOfChatRooms());
                    unwrapResult(response);
                }catch (e)
                {
                    console.log(e)
                }
            }

            getRooms()
            startListening();
        }

    }, [user]);


    return(
        <>
            <h1>UserProfilePage</h1>
        </>
    )
}