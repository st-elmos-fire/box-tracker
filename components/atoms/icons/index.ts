import React from 'react';
import House from './library/house';
import AppLogo from './library/app-logo';
import Upload from './library/upload';

interface ComponentProps extends React.FC<React.ComponentProps<'div'>> {
  House: typeof House;
  AppLogo: typeof AppLogo;
  Upload: typeof Upload;
}

export const Icons: ComponentProps = () => {
  return null;
};

Icons.House = House;
Icons.AppLogo = AppLogo;
Icons.Upload = Upload;

Icons.displayName = 'Icons';

export default Icons;
