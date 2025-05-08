import { Box, Divider, Stack, Tabs, Tab } from '@mui/material'
import styles from "../../account/components/AccountManagement.module.css";
import { useContext, useEffect, useState } from 'react';
import ProfileInfoDisplay from './ProfileInfoDisplay';
import test from '../../../assets/test.png'
import ReviewsList from './ReviewsList';
import { ProfileInfoDisplayTypes, Reviews, UserCategory } from '../Types';
import OfferDisplay from './OfferDisplay';
import { useParams } from 'react-router-dom';
import { OpenAlert, ReviewResponse, UserResponse } from '../../shared/Types';
import ContextStore from '../../../utils/ContextStore';
import { getReviews, getUser } from '../services';
import AlertToast from '../../shared/components/AlertToast';
import { getMyOffers } from '../../offerList/services';
import { OfferResponseBody } from '../../offerCreation/Types';
import { getSelf } from '../../account/services';

const PublicProfileBody = () => {
    const [tabSetting, setTabSetting] = useState({
        tabType : "reviews",
    });

    const [user, setUser] = useState<UserResponse>({} as UserResponse)
    const [myOffers, setMyOffers] = useState<Array<OfferResponseBody>>([])
    const [reviews, setReviews] = useState<ReviewResponse[]>([])
    const {id} = useParams()
    const store = useContext(ContextStore)

    const [openAlert, setOpenAlert] = useState<OpenAlert>({
            open: false,
            message: "",
            severity: "error"
    });

    useEffect(() => {
      (async() => {
        if(!id){
          const userResponse = await getSelf(store, store.context.token)
          if("status" in userResponse){
            setOpenAlert({open: true, message: userResponse.popupMessage, severity: "error"})
            return
          }
          setUser(userResponse)
          store.setContext({...store.context, user: userResponse})
          const reviewsResponse = await getReviews(store, store.context.user.id)

          if("status" in reviewsResponse){
            setOpenAlert({open: true, message: reviewsResponse.popupMessage, severity: "error"})
            return
          }

          setReviews(reviewsResponse)
        } else {
          const userResponse = await getUser(store, id)

          if("status" in userResponse){
            setOpenAlert({open: true, message: userResponse.popupMessage, severity: "error"})
            return
          }

          setUser(userResponse)

          const reviewsResponse = await getReviews(store, id)

          if("status" in reviewsResponse){
            setOpenAlert({open: true, message: reviewsResponse.popupMessage, severity: "error"})
            return
          }

          setReviews(reviewsResponse)
        }

        const vOffers = await getMyOffers(store)
        if("status" in vOffers){
          setOpenAlert({open: true, message: vOffers.popupMessage, severity: "error"})
          return
        }

        setMyOffers(vOffers)
        console.log("MyOffers: ", vOffers)

        
      })()
    },[id])

    useEffect(() => {
      console.log(reviews)
      console.log(user)
    })

  return (
    <Box className={styles.homeContent}>
        <ProfileInfoDisplay user={user}/>

        <Stack divider={<Divider orientation="horizontal" flexItem />} sx={{width: "100%", py: 2}}>
            <Tabs
                orientation='horizontal'
                centered
                variant="fullWidth"
                value={tabSetting.tabType}
                onChange={(e, val) => setTabSetting({...tabSetting, tabType: val})}
                aria-label="Vertical tabs example"
                >
                <Tab sx={{fontSize: "1em"}} value={'reviews'} label="Reviews"/>
                <Tab sx={{fontSize: "1em"}} value={'offers'} label="Offers"/>
            </Tabs>

            {tabSetting.tabType.match("reviews") ? 
                <ReviewsList array={reviews}/> : 
                <OfferDisplay offers={myOffers}/>
            }
        </Stack>

        <AlertToast text={openAlert.message} open={openAlert.open} severity={openAlert.severity} handleClose={() => {
                setOpenAlert({...openAlert, open:false});
            }}/>
        
    </Box>
  )
}

export default PublicProfileBody