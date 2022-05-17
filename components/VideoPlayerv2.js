import VideoPlayer from 'react-native-reanimated-player';
import React, {useContext} from 'react';

import { useSharedValue } from 'react-native-reanimated';
import { SIZES } from '../constants';
export const VideoPlayerv2 = ({uri}) => {
  const videoHeight = useSharedValue(SIZES.height * 0.3);
  const isFullScreen = useSharedValue(false);
  const { paused, setPaused } = useContext(false);

  return (
    <VideoPlayer
      source={uri || ""}
      headerTitle={'Title in full screen mode'}
      onTapBack={() => {
        Alert.alert('onTapBack');
      }}
      onTapMore={() => {
        Alert.alert('onTapMore');
      }}
      onPausedChange={state => {
        Alert.alert(`onPausedChange: ${state}`);
        setPaused(state);
      }}
      videoHeight={videoHeight}
      paused={paused}
      isFullScreen={isFullScreen}
    />
  );
};