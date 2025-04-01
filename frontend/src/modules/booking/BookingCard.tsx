import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import testImg from '../../assets/test.png';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import TodayIcon from '@mui/icons-material/Today';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { Stack } from '@mui/material';

type BookingCardProps = {
  title : string;
  requestedOn : string;
  type : string;
  availability : string;
  location : string;
  originalPrice : number; 
  priceMode : number;
  newPrice? : number;
}

const BookingCard : React.FC<BookingCardProps> = ({title, requestedOn, type, availability, location, originalPrice, priceMode, newPrice}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{width: "100%", margin: "3em 0", backgroundColor:"inherit", border:"none"}}>
    <CardHeader
        action={
            <CardActions sx={{display:"flex", justifyContent:"space-between"}}>
        <Button size="small" color="primary">
          Accept new Price
        </Button>
        <Button size="small" color="primary">
          Reject
        </Button>
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
            <MenuItem onClick={handleClose}>Chat</MenuItem>
            <MenuItem onClick={handleClose}>View Offer</MenuItem>
            <MenuItem onClick={handleClose}>Withdraw</MenuItem>
        </Menu>
      </CardActions>
        }
        title={title}
        subheader={`Requested on: ${requestedOn}`}
      />
      
      <CardActionArea sx={{display: "flex"}}>
        <CardMedia
            sx={{flexBasis: "30%"}}
            component="img"
            height="100"
            image={testImg}
            alt="requested offer"
          />

        <CardContent sx={{flex:"1"}}>
            <Typography variant="body2" color='textSecondary'>
                Service {type}
            </Typography>
          <Typography variant="body2" style={{verticalAlign: 'middle',display: 'inline-flex', marginTop: ".4em"}}>
                <TodayIcon fontSize="small" sx={{marginRight: ".2em"}}/>
                {availability}
            </Typography>
            <br/>
            <Typography variant="body2" style={{verticalAlign: 'middle',display: 'inline-flex'}}>
                <NearMeOutlinedIcon fontSize="small" sx={{marginRight: ".2em"}}/>
                {location}
            </Typography>
            <br/>
            <Stack direction="row">
              <LocalOfferOutlinedIcon fontSize="small" sx={{marginRight: ".2em"}}/>
              <Typography variant="body2" color={newPrice? 'info' : 'info'}>
                  {originalPrice} CHF
              </Typography>
              {newPrice && priceMode == 2 && 
                <>
                    <Typography variant="body2">
                      &nbsp;-&nbsp;
                    </Typography>
                    <Typography variant='body2' color='error'>
                      Proposed: {newPrice} CHF
                    </Typography> 
                </>
              }
            </Stack>
        </CardContent>
      </CardActionArea>

    </Card>
  );
}

export default BookingCard