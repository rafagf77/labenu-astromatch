import {React, useState, useEffect} from 'react'
import axios from 'axios'
import {ImgProfile, ListDiv, Name, ProfileLine} from './styles'

export default function List () {
    
    const [matchList,setMatchList] = useState([])

    useEffect (() => {
        axios
        .get(`https://us-central1-missao-newton.cloudfunctions.net/astroMatch/rafael-fontes/matches`)
        .then (res => { 
            setMatchList(res.data.matches)
        })
        .catch (err => {
            console.log(err)
        })
    }, [matchList])

    return (
        <ListDiv>
        {matchList.length===0 ? 
            (<Name>Você não possui nenhum match</Name>)
            :
            (matchList.map(profile => {
                return(
                    <ProfileLine>
                        <ImgProfile src={profile.photo}></ImgProfile>
                        <Name>{profile.name}</Name>
                    </ProfileLine>
                )
            }))
        }
        </ListDiv>
    )
}