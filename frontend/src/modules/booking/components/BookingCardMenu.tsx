import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface CardMenuProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleClose: () => void;
    offerId: string | number;
    madeByMe: boolean;
    userEmail: string;
    offerOwnerId: string | number;
}

const CardMenu: React.FC<CardMenuProps> = ({
  anchorEl,
  open,
  handleClose,
  offerId,
  madeByMe,
  userEmail,
  offerOwnerId
}) => {
  const navigate = useNavigate();

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={() => navigate(`/offer/${offerId}`)}>View Offer</MenuItem>

      {!madeByMe && (
        <>
          <MenuItem onClick={() => navigate(`/profile/${offerOwnerId}`)}>View User</MenuItem>
          <MenuItem onClick={() => (window.location.href = `mailto:${userEmail}`)}>
            Chat
          </MenuItem>
        </>
      )}
    </Menu>
  );
};

export default CardMenu;
