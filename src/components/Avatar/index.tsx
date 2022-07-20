import styles from './index.module.css';
import {ImgHTMLAttributes} from 'react';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  src:string;
  alt:string;
  hasBorder?:boolean
}

export function Avatar({ hasBorder = true, src, alt} : AvatarProps){

  return (
    <img 
      className={ hasBorder ? styles.avatarWithBorder : styles.avatar} 
      src={src} 
      alt={alt} 
    />
  );
}