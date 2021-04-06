import {React, useState, useEffect} from 'react'
import {Bio, DivButtons, ImgProfile, Name, ProfileBox} from './styles'
import { Fab, Button } from '@material-ui/core';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import axios from 'axios'

export default function Main (props) {
 
    useEffect (() => {
        props.showNewProfile()
    }, [])

    const addToMatchList = () => {
        axios
        .post(`https://us-central1-missao-newton.cloudfunctions.net/astroMatch/rafael-fontes/choose-person`,
        {
            "id": props.profileId,
            "choice": true
        })
        .then (res => {
            console.log("Match")
            console.log(res.data)
        })
        .catch (err => {
            console.log(err)
        })
    }

    const addToRejectList = () => {
        axios
        .post(`https://us-central1-missao-newton.cloudfunctions.net/astroMatch/rafael-fontes/choose-person`,
        {
            "id": props.profileId,
            "choice": false
        })
        .then (res => {
            console.log("Reject")
            console.log(res.data)
        })
        .catch (err => {
            console.log(err)
        })
    }

    const onClickX = () => {
        addToRejectList()
        props.showNewProfile()
    }
    
    const onClickHeart = () => {
        addToMatchList()
        props.showNewProfile()
    }
    
    return (
        <div>
            {props.profilesEnd !=="" ?
                (<ProfileBox>
                    <Name>Fim dos perfis</Name>
                </ProfileBox>)
                :
                (<div>
                    <ProfileBox>
                        <ImgProfile src={props.profilePhoto}></ImgProfile>
                        <Name>{props.profileName}, {props.profileAge}</Name>
                        <Bio>{props.profileBio}</Bio>
                    </ProfileBox>
                    <DivButtons>
                        <Fab style={{ fontSize: 50 }} color="primary" onClick={onClickX}><BlockOutlinedIcon/></Fab>
                        <Fab style={{ fontSize: 50 }} color="secondary" onClick={onClickHeart}><FavoriteBorderRoundedIcon/></Fab>
                        
                    </DivButtons>
                </div>)
            }
        </div>
    )
}
