import React, { useEffect, useState } from 'react'
import classes from "./Views.module.css"
import Bullet from '../about/Bullet'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../store/slices/authSlice'
import { selectProfilePageUser } from '../../../store/slices/profileSlice'
import { viewProfile } from '../../../store/slices/friendshipSlice'
import axiosInstance from '../../../api/axiosInstance'
import { API_ROUTES } from '../../../api/apiConfig'
import { FaSpinner } from 'react-icons/fa'

const Views = () => {

    const [views, setViews] = useState([])
    const [loader, setLoader] = useState(false)

    const loggedInUser = useSelector(selectUser)

    useEffect(() => {
      const getProfileViews = async() => {
        try {
            setLoader(true)
            const loggedUserViews = loggedInUser?.views; 
            console.log(loggedUserViews);
            if (loggedUserViews) {
            const getUserViewsPromises = loggedUserViews.map(async (view) => {
              const response = await axiosInstance.get(
                API_ROUTES.user + view
                );
                return response.data;
              });
            
              const viewData = await Promise.all(getUserViewsPromises);
              setViews(viewData)
              setLoader(false)

            }
          } catch (error) {
              console.error(error);
              throw error
          }
      }
      getProfileViews()
  }, [loggedInUser?.views])

  
  return (
  <div className={classes.Views}>
    <p className={classes.title}>Who viewed your profile</p>
    {loader && (
        <p className={classes.spinnerLoad}>
          <FaSpinner className={classes.spinner} />
        </p>
      )}
    <div className={classes["views-holder"]}>    
      { !loader && views.map((view, i) => {
                const isFriend = loggedInUser?.friends.includes(view?._id);
        return(
        <div className={classes.viewBlock} key={i}>
          <Bullet 
              navigation={`../../../id/${view?._id}`}
              content={view?.firstName}
              content2={view?.lastName}
              smallText="Viewed your profile"
              isFriend={isFriend}
              imageUrl={view?.profilePicture}
          />
        </div>
        )
      })}
      {!views.length && !loader ? <p className={classes.paragraph}>No profile viewers</p> : ""}
    </div> 
  </div>
  )
}

export default Views