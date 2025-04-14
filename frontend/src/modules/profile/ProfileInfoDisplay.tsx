import { Rating, Stack, Typography } from '@mui/material'
import ProfileName from './ProfileName'
import ProfileSubInfo from './ProfileSubInfo'
import CategoryList from '../shared/components/CategoryChipDisplay'
import { ProfileInfoDisplayTypes } from './Types'

type ProfileInfoDisplayProps = {
  info : ProfileInfoDisplayTypes
}

const ProfileInfoDisplay: React.FC<ProfileInfoDisplayProps> = ({info}) => {
  return (
    <Stack gap={1}>
        <ProfileName name={info.name} profileImg={info.profileImg}/>

        <Stack direction="row" justifyContent='space-between' alignItems='flex-start'>
            <Stack gap={1}>
              <Stack direction='row' gap={2} alignItems='center'>
                <Typography variant='body1'>Rating: </Typography>
                <Rating name="read-only" value={info.avgRating} readOnly precision={0.5} />
              </Stack>

              <Stack direction='row' gap={2} alignItems='center'>
                <Typography variant='body1'>Interest: </Typography>
                <CategoryList categories={info.usersInterest}/>
              </Stack>
            </Stack>

            <ProfileSubInfo 
              location={info.location} 
              registrationYear={info.registrationYear}
              providedService={info.providedService}
              seekedServices={info.seekedServices}/>
        </Stack>


    </Stack>
  )
}

export default ProfileInfoDisplay