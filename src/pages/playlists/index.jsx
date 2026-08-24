import React, { useEffect, useState, useContext } from 'react'
import "./styles.css"
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AppContext } from '@/contexts/app';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '@/firebase';
import { getDbAddress, getDbAddressM3u } from '../_app';
import axios from 'axios';
import { AES, enc } from 'crypto-js';
import Loading from '@/utils/loading';
import editIcon from "@/assets/edit.svg"
import deleteIcon from "@/assets/delete.svg"
import DeleteModal from './deleteModal';
import EditModal from './editModal';
import Image from 'next/image';
import AddRounded from '@mui/icons-material/AddRounded';
import EditRounded from '@mui/icons-material/EditRounded';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import SettingsRounded from '@mui/icons-material/SettingsRounded';
import { deleteFileByName } from '@/utils/indexDb/ indexedDB'
import { ALL_AVATARS, getAvatarById } from '@/constants/avatars';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profiles = () => {
  const router = useRouter();
  const [usersList, setUsersList] = useState([]);
  const { user: contextUser, toggleUser, streamData, alert, m3uStreams, m3uUrl, homeM3uStreams, scrolled } = useContext(AppContext);
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [manageProfilesClicked, setManageProfilesClicked] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentProfileToDelete, setCurrentProfileToDelete] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem("listUser");
      if (storedUsers) {
        try {
          const parsedUsers = JSON.parse(storedUsers);
          setUsersList(Array.isArray(parsedUsers) ? parsedUsers : []);
        } catch (e) {
          setUsersList([]);
        }
      } else {
        setUsersList([]);
      }
    }
  }, []);


  const selectProfileHandler = (user) => {
    if (!manageProfilesClicked && !loading) {

      localStorage.setItem("currentUser", JSON.stringify(user));
      const userDetail = Object.values(user)[0];
      const playlist = Object.keys(user)[0];
      const { username, password, portallink, serverInfo, id, parentalPin, loginType, formatted } = userDetail;
      const storedUser = {
        id,
        username,
        password,
        parentalPin,
        serverPrefix: portallink,
        server: portallink,
        serverInfo,
        playlist,
        loginType,
        M3U: loginType === 'm3u' ? userDetail?.M3U : null,
        formatted: formatted

      };
      loginUser(storedUser)
      localStorage.setItem('player', 'flowplayer')

    }
  }

  const getCurrentEpg = async (user) => {

    const decryptedServerAddress = AES.decrypt(user.server, "thisisserveraddress").toString(enc.Utf8);
    const decryptedPassword = AES.decrypt(user.password, "thisispassword").toString(enc.Utf8);
    const defaultEpgSrc = `${decryptedServerAddress}/xmltv.php?username=${user.username}&password=${decryptedPassword}`;
    const headers = {
      username: user.username,
      password: user.password,
      server: user.server,
      type: user.loginType,
      token: user.token,
      epgSrc: null
    };
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint.getEpgSrc}`, {
        headers: headers,
      });
      epgSrc.toggle({
        name: "Inbuilt EPG Source",
        src: defaultEpgSrc,
        data: response.data.message
      })
      localStorage.setItem("currentEpgSrc", JSON.stringify({
        name: "Inbuilt EPG Source",
        src: defaultEpgSrc,
      }))
    } catch (error) {
      console.log("Error", error)
    }
  }



  const loginUser = async (profileUser) => {
    setLoading(true);
    const { username, password, server, playlist, id, parentalPin, loginType, M3U, player, formatted } = profileUser;
    if (loginType !== 'm3u') {
      const dataToSend = {
        username: username,
        password: password,
      }
      const params = new URLSearchParams(dataToSend).toString();
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/login?${params}`, {
          headers: {
            server,
            type: loginType
          }
        });
        const { user_info, server_info, token } = response.data.message;
        const getTimeDifference = () => {
          const encryptedTime = server_info.time_now;
          const difference = new Date().getTime() - new Date(encryptedTime).getTime();
          return Number((((difference) / 1000) / 3600).toFixed(2));
        }
        const serverInfo = AES.encrypt(JSON.stringify(server_info), "thisisserverinfo").toString();
        const userInfo = AES.encrypt(JSON.stringify(user_info), "thisisuserinfo").toString();

        if (user_info.auth === 1 && user_info.status === "Active") {
          const credentials = {
            [playlist]: {
              id,
              username,
              password,
              parentalPin,
              portallink: server,
              serverInfo,
              userInfo,
              timeDifference: getTimeDifference(),
              loginType,
              token,
              player
            }
          };
          localStorage.setItem("currentUser", JSON.stringify(credentials));

          const userObj = {
            id,
            username,
            password,
            serverPrefix: server,
            server: server,
            timeDifference: getTimeDifference(),
            serverInfo,
            userInfo,
            loginType,
            token
          };

          const { movies, series, liveTv } = streamData || {};
          if (movies?.toggle) {
            movies.toggle(null, "streams");
            movies.toggle(null, "categories");
            if (movies.banner?.toggle) movies.banner.toggle(null);
          }
          if (series?.toggle) {
            series.toggle(null, "streams");
            series.toggle(null, "categories");
            if (series.banner?.toggle) series.banner.toggle(null);
          }
          if (liveTv?.toggle) {
            liveTv.toggle(null, "streams");
            liveTv.toggle(null, "categories");
          }
          if (m3uStreams?.toggle) {
            m3uStreams.toggle(null, null, null);
          }
          if (homeM3uStreams?.toggle) {
            homeM3uStreams.toggle(null);
          }

          toggleUser({
            ...userObj,
            dbAddress: getDbAddress(userObj, null),
            decryptedDbAddress: getDbAddress(userObj, 'decrypted')
          });

          signInAnonymously(auth).then((user) => {
            console.log("User signed in anonymously", user);
          })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log("Error signing in anonymously", errorCode, errorMessage);
            });
          setShow(false);
          router.push('/dashboard?view=movies');
        } else {
          setLoading(false);
          toast.error("Your Account is expired!");
        }
      } catch (error) {
        console.log("Error logging user", error);
        setLoading(false);
        toast.error("Connection error. Please try again.");
      }
    } else {
      try {
        const response = await axios.get(M3U);

        const credentials = {
          [playlist]: {
            id,
            loginType,
            username,
            password,
            portallink: server,
            M3U,
            formatted: formatted ? formatted : false
          }
        };
        localStorage.setItem("currentUser", JSON.stringify(credentials));

        const userObj = {
          id,
          loginType,
          username,
          password,
          server: server
        };

        const { movies, series, liveTv } = streamData || {};
        if (movies?.toggle) {
          movies.toggle(null, "streams");
          movies.toggle(null, "categories");
          if (movies.banner?.toggle) movies.banner.toggle(null);
        }
        if (series?.toggle) {
          series.toggle(null, "streams");
          series.toggle(null, "categories");
          if (series.banner?.toggle) series.banner.toggle(null);
        }
        if (liveTv?.toggle) {
          liveTv.toggle(null, "streams");
          liveTv.toggle(null, "categories");
        }
        if (m3uStreams?.toggle) {
          m3uStreams.toggle(null, null, null);
        }
        if (homeM3uStreams?.toggle) {
          homeM3uStreams.toggle(null);
        }

        if (M3U && m3uUrl?.toggle) {
          m3uUrl.toggle(M3U);
        }

        toggleUser({
          ...userObj,
          dbAddress: getDbAddressM3u(userObj)
        });

        signInAnonymously(auth).then((user) => {
          console.log("User signed in anonymously", user);
        })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error signing in anonymously", errorCode, errorMessage);
          });
        setShow(false);
        router.push('/dashboard?view=movies');
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Error loading playlist.");
      }
    }
  }

  const deleteProfile = () => {
    if (!currentProfileToDelete || !currentProfileToDelete.user) return;
    const { user } = currentProfileToDelete;
    const profileName = Object.keys(user)[0] || 'Playlist';
    setDeleteModal(false);
    deleteFileByName(Object.keys(user)[0]);
    const { id } = Object.values(user)[0];
    const storedList = JSON.parse(localStorage.getItem('listUser')) || [];
    const updatedUsers = storedList.filter(item => Object.values(item)[0].id !== id);

    setUsersList(updatedUsers);
    localStorage.setItem("listUser", JSON.stringify(updatedUsers));
    toast.success(`"${profileName}" deleted successfully!`);
  }

  const Profile = ({ user, index }) => {
    const userDetail = Object.values(user)[0];
    const profileName = Object.keys(user)[0] || "Playlist";
    const avatarObj = getAvatarById(userDetail?.avatarId) || ALL_AVATARS[index % ALL_AVATARS.length];

    return (
      <div
        onClick={() => selectProfileHandler(user)}
        className={`single-profile ${manageProfilesClicked ? 'manageModeActive' : ''}`}
      >
        <span className="thumb">
          <div className="netflixAvatarWrapper" style={{ background: avatarObj.gradient }}>
            {avatarObj.svg}
          </div>

          {manageProfilesClicked && (
            <div className="manageModeCornerBadge">
              <EditRounded style={{ fontSize: 18, color: '#ffffff' }} />
            </div>
          )}

          <div
            className='edit-delete-icons-container'
            style={{
              display: manageProfilesClicked ? "flex" : "none"
            }}
          >
            <button
              type="button"
              className="actionChip editChip"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentProfileToDelete({
                  user,
                  index
                })
                setEditModalOpen(true)
              }}
            >
              <EditRounded style={{ fontSize: 16 }} />
              <span>Edit</span>
            </button>
            <button
              type="button"
              className="actionChip deleteChip"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentProfileToDelete({
                  user,
                  index
                })
                setDeleteModal(true)
              }}
            >
              <DeleteRounded style={{ fontSize: 16 }} />
              <span>Delete</span>
            </button>
          </div>
        </span>
        <span className="text">{profileName}</span>
      </div>
    );
  };

  const handleEditPlaylist = (playlistDetails) => {
    const { playlistName, username, password, portallink, avatarId } = playlistDetails;
    const foundUser = Object.values(currentProfileToDelete.user)[0];
    const { id } = foundUser;
    const storedList = JSON.parse(localStorage.getItem('listUser')) || [];
    const existingUsers = storedList.filter(user => Object.values(user)[0].id !== id);
    const updatedUser = {
      [playlistName]: {
        ...foundUser,
        username,
        password,
        portallink,
        avatarId
      }
    };
    const userExist = storedList.filter(item => {
      return Object.keys(item)[0] === playlistName
    });
    if (userExist.length > 0 && id !== Object.values(userExist[0])[0].id) {
      toast.warning("This playlist name already exists! Try another one.");
    } else {
      existingUsers.splice(currentProfileToDelete.index, 0, updatedUser);
      const updatedUsersList = existingUsers;
      setEditModalOpen(false);
      setUsersList(updatedUsersList);
      localStorage.setItem('listUser', JSON.stringify(updatedUsersList));
      setManageProfilesClicked(false);
      toast.success(`"${playlistName}" updated successfully!`);
    }
  };



  const [menuOpen, setMenuOpen] = useState(false);

  return (
    usersList && (
      <section
        style={{
          transition: '.5s',
          opacity: show ? 1 : 0,
          transform: show ? 'scale(1)' : 'scale(0.9)'
        }}
        className="profileSection"
      >
        <div className="topRightMenuContainer">
          <button
            type="button"
            className={`topRightSettingsBtn ${menuOpen ? 'active' : ''} ${manageProfilesClicked ? 'managing' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            title="Options"
          >
            <SettingsRounded className="settingsGearIcon" />
          </button>

          {menuOpen && (
            <div className="topRightDropdownMenu">
              <Link
                href={'/login?action=add-profile&type=player-api'}
                className="dropdownMenuItem"
                onClick={() => setMenuOpen(false)}
              >
                <AddRounded style={{ fontSize: 20, color: '#38bdf8' }} />
                <span>Add Playlist</span>
              </Link>

              <button
                type="button"
                className="dropdownMenuItem"
                onClick={() => {
                  setManageProfilesClicked(!manageProfilesClicked);
                  setMenuOpen(false);
                }}
              >
                {manageProfilesClicked ? (
                  <>
                    <CheckRounded style={{ fontSize: 20, color: '#10b981' }} />
                    <span>Done Editing</span>
                  </>
                ) : (
                  <>
                    <EditRounded style={{ fontSize: 20, color: '#c084fc' }} />
                    <span>Manage Playlists</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="playlistsHeader">
          <h1 className="playlistsTitle">
            {manageProfilesClicked ? "Manage Playlists" : "Who is watching?"}
          </h1>
          <p className="playlistsSubtitle">
            {manageProfilesClicked
              ? "Click Edit to customize profile & character avatar, or Delete to remove"
              : "Select a playlist profile to start streaming"}
          </p>
        </div>
        {loading && <Loading />}
        <div className="profileList">
          {usersList.map((user, index) => {
            return <Profile key={index} user={user} index={index} />
          })}
        </div>
        <DeleteModal
          open={deleteModal}
          deleteProfile={deleteProfile}
          onClose={() => setDeleteModal(false)}
        />
        <EditModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          defaultPlaylist={currentProfileToDelete && currentProfileToDelete.user}
          onEdit={handleEditPlaylist}
        />
        <ToastContainer theme="dark" position="top-right" autoClose={3000} />
      </section>
    )
  )
}

export default Profiles
