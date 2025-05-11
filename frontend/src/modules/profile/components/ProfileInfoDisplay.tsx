import { Rating, Stack, Typography } from '@mui/material'
import ProfileName from './ProfileName'
import ProfileSubInfo from './ProfileSubInfo'
import CategoryList from '../../shared/components/CategoryChipDisplay'
import { UserResponse } from '../../shared/Types'
import { getYearString } from '../../shared/services'

type ProfileInfoDisplayProps = {
  user : UserResponse
}

const ProfileInfoDisplay: React.FC<ProfileInfoDisplayProps> = ({user}) => {

  return (
    <Stack gap={1}>
        <ProfileName name={user.firstName + " " + user.lastName} profileImg={user.imageUrl}/>

        <Stack direction={{xs: 'column', smd: 'row'}} 
          gap={2}
          justifyContent='space-between' alignItems='flex-start'>
            <Stack gap={1}>
              <Stack direction='row' gap={2} alignItems='center'>
                <Typography variant='body1'>Rating: </Typography>
                <Rating name="read-only" value={user.rating?? 0} readOnly/>
              </Stack>

              <Stack direction='row' gap={2} alignItems='flex-start'>
                <Typography height="100%" variant='body1'>Interest: </Typography>
                <CategoryList categories={user.categories ? user.categories : []}/>
              </Stack>
            </Stack>

            <ProfileSubInfo 
              location={user.location} 
              registrationYear={getYearString(user.time)}
              providedService={user.servicesOffered}
              seekedServices={user.servicesSeeked}/>
        </Stack>


    </Stack>
  )
}

export default ProfileInfoDisplay