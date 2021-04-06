import {React, useState, useEffect} from 'react'
import { Tooltip, Button } from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import List from './components/List/index'
import Main from './components/Main/index'
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState("main")
  const [profileName,setProfileName] = useState('')
  const [profileBio,setProfileBio] = useState('')
  const [profileAge,setProfileAge] = useState('')
  const [profilePhoto,setProfilePhoto] = useState('')
  const [profileId,setProfileId] = useState('')
  const [profilesEnd, setProfilesEnd] = useState('')
  const [homeColor, setHomeColor] = useState("disabeld")
  const [listColor, setListColor] = useState("secondary")

  useEffect (() => {
    if(currentPage==="list") {
      setHomeColor("secondary")
      setListColor("disabled")
    } else {
      setHomeColor("disabled")
      setListColor("secondary")
    }
  },[currentPage])

  const onClickMain = () => {
    setCurrentPage("main")
  }

  const onClickList = () => {
    setCurrentPage("list")
  }

  const onClickClear = () => {
    if (window.confirm("Limpar todos os matches?")) {
      axios
      .put(`https://us-central1-missao-newton.cloudfunctions.net/astroMatch/rafael-fontes/clear`)
      .then (res => {
        setProfilesEnd("")
      })
      .catch (err => {
        console.log(err)
      })
    }
  }

  const showNewProfile = () => {
    axios
    .get(`https://us-central1-missao-newton.cloudfunctions.net/astroMatch/rafael-fontes/person`)
    .then (res => { 
        setProfileName(res.data.profile.name)
        setProfileBio(res.data.profile.bio)
        setProfileAge(res.data.profile.age)
        setProfilePhoto(res.data.profile.photo)
        setProfileId(res.data.profile.id)
    })
    .catch (err => {
        console.log(err)
        setProfilesEnd(err)
    })
  }

  return (
    <div className="App">
      <div className="Box">
        <div className="TitleBar">
          <Tooltip title="Home" arrow>
            <Button color={homeColor} onClick={onClickMain}><HomeOutlinedIcon/></Button>
          </Tooltip>
          <p className="AppName">Astromatch</p>
          <Tooltip title="Lista" arrow>
            <Button color={listColor} onClick={onClickList}><ListAltOutlinedIcon/></Button>
          </Tooltip>
        </div>
        <div className="Conditional">
          {currentPage === "main" ?
            (<Main
              showNewProfile={showNewProfile}
              profileName={profileName}
              profileBio={profileBio}
              profileAge={profileAge}
              profilePhoto={profilePhoto}
              profileId={profileId}
              profilesEnd={profilesEnd}
            />)
            :
            (<List/>)  
          }
        </div>
        <div className="ClearButton">
          <Button variant="contained" startIcon={<DeleteIcon />} onClick={onClickClear}>Limpar Matches</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
