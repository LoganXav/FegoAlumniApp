import { View, useWindowDimensions } from "react-native";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedRef } from "react-native-reanimated";
import CustomImage from "./image-item";
import Pagination from "./pagination";

const ImageCarousel = ({ data = [], autoPlay, pagination }: Record<string, any>) => {
  const scrollViewRef = useAnimatedRef() as any;
  const interval = useRef() as any;
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  // const [newData, setNewData] = useState([...data, { key: "spacer-right" }]);
  const { width } = useWindowDimensions();
  const SIZE = width * 0.45;
  const SPACER = (width - SIZE) / 2;
  const x = useSharedValue(0);
  const offSet = useSharedValue(0);

  // Update newData if data changes
  const newData = useMemo(() => {
    return [...data, { key: "spacer-right" }];
  }, [data]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offSet.value = e.contentOffset.x;
    },
  });

  useEffect(() => {
    if (isAutoPlay === true) {
      let _offSet = offSet.value;
      interval.current = setInterval(() => {
        if (_offSet >= Math.floor(SIZE * (data.length - 1) - 10)) {
          _offSet = 0;
        } else {
          _offSet = Math.floor(_offSet + SIZE);
        }
        scrollViewRef.current.scrollTo({ x: _offSet, y: 0 });
      }, 5000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [SIZE, SPACER, isAutoPlay, data.length, offSet.value, scrollViewRef]);

  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        onScrollBeginDrag={(e) => {
          setIsAutoPlay(false);
        }}
        onMomentumScrollEnd={() => {
          setIsAutoPlay(autoPlay);
        }}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SIZE}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        {newData.map((item, index) => {
          return <CustomImage key={index} index={index} item={item} x={x} size={SIZE} spacer={SPACER} />;
        })}
      </Animated.ScrollView>
      {pagination && <Pagination data={data} x={x} size={SIZE} />}
    </View>
  );
};

export default ImageCarousel;
