import {useEffect, useRef, type PropsWithChildren, type FC} from 'react';
import {Animated, type ViewStyle, type StyleProp} from 'react-native';

type ExpandViewProps = PropsWithChildren<{
    style?: StyleProp<ViewStyle> //be able to take a stylesheet as a view would
    displayed: boolean
}>;

export function ExpandView({style, displayed, children}: ExpandViewProps) {
  const expandOpacityAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const expandTransformAnim = useRef(new Animated.Value(10)).current; // Initial value for transform: 20
  useEffect(() => {
    const opacityAnimation = Animated.timing(expandOpacityAnim, {
      toValue: displayed ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    });

    const transformAnimation = Animated.timing(expandTransformAnim, {
      toValue: displayed ? 0 : -10,
      duration: 300,
      useNativeDriver: true,
    });

    Animated.parallel([opacityAnimation, transformAnimation]).start()

    return () => {
        opacityAnimation.stop();
        transformAnimation.stop();
    }
  }, [expandOpacityAnim, expandTransformAnim, displayed]);

  return (
    <Animated.View // animated View
      style={[
        style, {
            transform: [{translateY: expandTransformAnim}],
            opacity: expandOpacityAnim // Bind opacity to animated value
        }]
      }>
      {children}
    </Animated.View>
  );
};


