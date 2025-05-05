import { Avatar, Card, Rating, Stack, Typography } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { Reviews } from '../Types'
import { ReviewResponse } from '../../shared/Types'
import { getDateTimeString } from '../../shared/services'

type Props = {
    review: ReviewResponse,
    profileImg: string
}

const ReviewCards: React.FC<Props> = ({review, profileImg}) => {
  return (
    <Card sx={{px: 4, py: 2}}>
        <Rating name={`read-only${review.rating}`} value={review.rating} readOnly size="small" />
        <Typography variant='body1' sx={{mt: 1, mb:2}}>{review.text}</Typography>

        <Stack direction="row"  alignItems='center' gap={2}>
            <Avatar 
                sx={{ bgcolor: deepOrange,  width: 48, height: 48}}
                alt={review.user.firstName}
                src={profileImg}
                />

            <Stack gap={0} direction='column'>
                <Typography variant='subtitle2'>{`${review.user.firstName} ${review.user.lastName}`}</Typography>
                <Typography variant='subtitle2' color='textSecondary'>{getDateTimeString(review.time)}</Typography>
            </Stack>
            
        </Stack>
    </Card>
  )
}

export default ReviewCards