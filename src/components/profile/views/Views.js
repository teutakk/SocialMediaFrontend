import React, { useEffect, useState } from 'react'
import classes from "./Views.module.css"
import Bullet from '../about/Bullet'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../store/slices/authSlice'
import { selectProfilePageUser } from '../../../store/slices/profileSlice'
import { viewProfile } from '../../../store/slices/friendshipSlice'
import axiosInstance from '../../../api/axiosInstance'
import { API_ROUTES } from '../../../api/apiConfig'

const Views = () => {

    const [views, setViews] = useState([])

    const loggedInUser = useSelector(selectUser)
    const profilePageUser = useSelector(selectProfilePageUser)
    const userId = loggedInUser?._id
    const profileUserId = profilePageUser?._id


    useEffect(() => {
      const getProfileViews = async() => {
        try {
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
    <div className={classes["views-holder"]}>    
      {views?.map((view, i) => {
        return(
        <div className={classes.viewBlock} key={i}>
          <Bullet 
              navigation={`../../../id/${view?._id}`}
              content={view?.firstName}
              content2={view?.lastName}
              subContent={view?.email}
          />
        </div>
        )
      })}
      {!views.length ? <p className={classes.paragraph}>No profile viewers</p> : ""}
    </div> 
  </div>
  )
}

export default Views