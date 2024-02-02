import React, { useEffect } from 'react';
import {
  Text,
  View,
  useWindowDimensions,
  TextInput,
  Image,
  Pressable,
} from 'react-native';

 
import Edit from '../../components/PostAnnouncements/Edit/Edit';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import { getAnnouncementService } from '../../services/announcements.service';

export default function EditAnnouncement(props) {
  const {id} = props.route.params;
  const getAnnouncement = () =>{

  }
  useEffect(()=>{

  })
  
  console.log(id);
  return (
    <>
    <SkeletonLoader/>
      {/* <Edit /> */}
    </>
  );
}
