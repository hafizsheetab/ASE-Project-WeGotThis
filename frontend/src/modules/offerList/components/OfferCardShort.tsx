import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import TodayIcon from '@mui/icons-material/Today';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { Stack } from '@mui/material';
import {useNavigate} from "react-router-dom";
import { OfferResponseBody } from '../../offerCreation/Types';
import { calculateDuration, getDateTimeString, getReadableDateTimeString } from '../../shared/services';
import ContextStore from '../../../utils/ContextStore';

type OfferCardProps = {
    offer: OfferResponseBody
    deleteOffer: (offerId: string) => void
};

const BookingCard : React.FC<OfferCardProps>  = ({offer, deleteOffer}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const cardActionOffer = () => {
    return (
      <CardActions sx={{display:"flex", justifyContent:"space-between"}}>
          <IconButton aria-label="settings"
          onClick={handleClick}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}>
            <MoreVertIcon />
          </IconButton>
          <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
              'aria-labelledby': 'basic-button',
              }}
          >
              <MenuItem onClick={() => navigate(`/offer/${offer.id}`)}>View Offer</MenuItem>
              {offer.availability && <MenuItem onClick={() => {deleteOffer(offer.id)}}>Delete Offer</MenuItem>}
          </Menu>
      </CardActions> )
  }

  return (
    <Card sx={{alignSelf:"stretch", justifySelf:"stretch", flex:1}}>
      <CardHeader
        action={cardActionOffer()}
        title={offer.title}
        subheader={`Created on: ${getDateTimeString(offer.createdAt)}`}
      />
      
      <CardActionArea sx={{display: "flex"}}>
        <CardMedia
            sx={{flexBasis: "30%"}}
            component="img"
            height="100"
            image={offer.imageUrl}
            alt="requested offer"
          />

        <CardContent sx={{flex:"1"}}>
            <Typography variant="body2" color='textSecondary'>
                Service {offer.type.displayValue}
            </Typography>
          <Typography variant="body2" style={{verticalAlign: 'middle',display: 'inline-flex', marginTop: ".4em"}}>
                <TodayIcon fontSize="small" sx={{marginRight: ".2em"}}/>
                {getReadableDateTimeString(offer.startTime)}; ~ {calculateDuration(offer.startTime, offer.endTime)}
            </Typography>
            <br/>
            <Typography variant="body2" style={{verticalAlign: 'middle',display: 'inline-flex'}}>
                <NearMeOutlinedIcon fontSize="small" sx={{marginRight: ".2em"}}/>
                {offer.location.split(',').slice(-2).join(', ')}
            </Typography>
            <br/>
            <Stack direction="row">
              <LocalOfferOutlinedIcon fontSize="small" sx={{marginRight: ".2em"}}/>
              <Typography variant="body2" color={offer.price? 'info' : 'info'}>
                  {offer.price} CHF
              </Typography>
            </Stack>
        </CardContent>
      </CardActionArea>

    </Card>
  );
}

export default BookingCard