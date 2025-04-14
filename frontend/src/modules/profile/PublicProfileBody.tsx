import { Box, Divider, Stack, Tabs, Tab } from '@mui/material'
import styles from "../home/components/Home.module.css";
import { useState } from 'react';
import ProfileInfoDisplay from './ProfileInfoDisplay';
import test from '../../assets/test.png'
import ReviewsList from './ReviewsList';
import { ProfileInfoDisplayTypes, Reviews, UserCategory } from './Types';
import OfferDisplay from './OfferDisplay';

const PublicProfileBody = () => {
    const [tabSetting, setTabSetting] = useState({
        tabType : "reviews",
    });

  return (
    <Box className={styles.homeContent}>
        <ProfileInfoDisplay info={userInfo}/>

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
                <ReviewsList array={reviews} profileImg={userInfo.profileImg}/> : 
                <OfferDisplay/>
            }
        </Stack>
        
    </Box>
  )
}

const reviews : Reviews[] = [
    {rating: 4, review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies massa sem, in luctus lacus tincidunt sit amet. Aliquam urna mi, ultrices nec commodo et, ultrices eu tortor. Curabitur facilisis in ligula vel aliquam. Mauris sit amet mi sed mauris viverra tincidunt. Nunc ut nunc egestas, hendrerit risus vitae, facilisis enim. Quisque non purus id lectus aliquam condimentum in a magna. Fusce non turpis augue. Sed pulvinar consequat arcu, et auctor ex faucibus a. Nam ultrices lectus neque, ut lacinia quam pharetra non. Nullam eu lorem pretium, sagittis lectus in, vestibulum quam. In hac habitasse platea dictumst. Donec quis interdum.", user:"Marianne Lous", date: "March, 2025"},
    {rating: 5, review: "Everything perfect, thanks a lot!", user:"Marianne Lous", date: "March, 2025"},
    {rating: 4, review: "Was okay. Kids were annoying", user:"Marianne Lous", date: "March, 2025"}
]

const usersInterest: UserCategory[] = [
  { id: 1, displayValue: 'Technology' },
  { id: 2, displayValue: 'Art' },
];

const userInfo : ProfileInfoDisplayTypes = {
    name: "Max Schmidet",
    profileImg: test,
    location : "8004 Zurich, Switzerland",
    registrationYear : "2023",
    providedService: 2, //get offers from user and filter to completed and type: provided
    seekedServices: 3,
    avgRating: reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length,
    usersInterest: usersInterest
}

export default PublicProfileBody