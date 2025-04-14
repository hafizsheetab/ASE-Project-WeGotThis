import { Stack, Typography } from "@mui/material"
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import DoneIcon from '@mui/icons-material/Done';
import SearchIcon from '@mui/icons-material/Search';

type ProfileNameProps = {
    location : string
    registrationYear : string
    providedService: number
    seekedServices: number
}

const ProfileSubInfo : React.FC<ProfileNameProps> = ({location, registrationYear, providedService, seekedServices}) => {
  return (
    <Stack direction="row" justifyContent='center' alignItems='center' gap={5}>
        <Stack>
            <Typography variant="body2" style={{verticalAlign: 'middle',display: 'inline-flex'}}>
                <NearMeOutlinedIcon fontSize="small" sx={{marginRight: ".2em"}}/>
                {location}
            </Typography>
            <Typography variant="body2" style={{verticalAlign: 'middle',display: 'inline-flex'}}>
                <CardMembershipIcon fontSize="small" sx={{marginRight: ".2em"}}/>
                Member since {registrationYear}
            </Typography>
        </Stack>

        <Stack>
            <Typography variant="body2" style={{verticalAlign: 'middle',display: 'inline-flex'}}>
                <DoneIcon fontSize="small" sx={{marginRight: ".2em"}}/>
                Provided Services: {providedService}
            </Typography>
            <Typography variant="body2" style={{verticalAlign: 'middle',display: 'inline-flex'}}>
                <SearchIcon fontSize="small" sx={{marginRight: ".2em"}}/>
                Seeked Services: {seekedServices}
            </Typography>
        </Stack>
    </Stack>
  )
}

export default ProfileSubInfo