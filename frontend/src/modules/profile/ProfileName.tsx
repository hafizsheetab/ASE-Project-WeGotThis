import { Avatar, Stack } from "@mui/material"
import { deepOrange } from "@mui/material/colors"

type ProfileNameProps = {
    name : string
    profileImg : string
}

const ProfileName : React.FC<ProfileNameProps> = ({name, profileImg}) => {
  return (
    <Stack direction="row"  alignItems='center' gap={2}>
        <Avatar 
            sx={{ bgcolor: deepOrange,  width: 64, height: 64}}
            alt={name}
            src={profileImg}
            />

        <h2>{name}</h2>
        
    </Stack>
  )
}

export default ProfileName