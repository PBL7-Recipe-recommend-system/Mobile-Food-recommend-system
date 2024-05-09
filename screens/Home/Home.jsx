import React, { useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppWrapper from "../../wrappers/AppWrapper";
import { SearchBar } from "../../components/search/SearchBar";
import { RecipeList } from "../../components/recipe/RecipeList";
import { Header } from "./Header";
import { CategoryBar } from "./CategoryBar";
import { SearchHeader } from "../../components/search/SearchHeader";
import { RecentSearchList } from "../../components/search/RecentSearchList";
import { PRIMARY_COLOR } from "../../constants/color";

export const Home = ({ navigation }) => {
  // Animated values to control search bar and other components' opacity
  const translateY = useRef(new Animated.Value(0)).current;
  const otherComponentsOpacity = useRef(new Animated.Value(1)).current;
  const searchHeaderOpacity = useRef(new Animated.Value(0)).current;
  const [searchActive, setSearchActive] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const targetTopPosition = -20;

  const scrollViewRef = useRef(null);

  const toggleSearchBarPosition = () => {
    const toValue = searchActive ? 0 : targetTopPosition;

    const otherOpacity = searchActive ? 1 : 0;

    const searchHeaderOpacityValue = searchActive ? 0 : 1;

    Animated.timing(translateY, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(otherComponentsOpacity, {
      toValue: otherOpacity,
      duration: 700,
      useNativeDriver: true,
    }).start();

    Animated.timing(searchHeaderOpacity, {
      toValue: searchHeaderOpacityValue,
      duration: 700,
      useNativeDriver: true,
    }).start();
    setSearchActive(!searchActive);
    Keyboard.dismiss();
    if (!searchActive && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    setScrollOffset(currentOffset);
  };

  return (
    <AppWrapper>
      <Animated.ScrollView
        ref={scrollViewRef}
        nestedScrollEnabled={true}
        contentContainerStyle={[style.container]}
        onScroll={handleScroll}
      >
        {searchActive ? (
          <Animated.View style={[{ opacity: searchHeaderOpacity }]}>
            <SearchHeader goBack={toggleSearchBarPosition} />
          </Animated.View>
        ) : (
          <Animated.View style={{ opacity: otherComponentsOpacity }}>
            <Header />
          </Animated.View>
        )}

        <Animated.View style={{ transform: [{ translateY }] }}>
          <SearchBar
            navigation={navigation}
            toggleSearchBar={toggleSearchBarPosition}
            activeSearch={searchActive}
            onOpen={() => setIsOverlayVisible(true)}
            onClose={() => setIsOverlayVisible(false)}
          />
        </Animated.View>
        {searchActive ? (
          <Animated.View
            style={[
              {
                flex: 1,
                opacity: searchHeaderOpacity,
                width: "100%",
              },
            ]}
          >
            <RecentSearchList />
          </Animated.View>
        ) : (
          <Animated.View style={{ opacity: otherComponentsOpacity }}>
            <CategoryBar />
            <RecipeList title="Your recipes" />
            <RecipeList title="Popular recipes" />
          </Animated.View>
        )}
        {isOverlayVisible && (
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />
        )}
      </Animated.ScrollView>
    </AppWrapper>
  );
};

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    marginBottom: 10,
    paddingBottom: 60,
    alignItems: "flex-start",
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    zIndex: 10,
  },
  fixedSearchBar: {
    position: "absolute",
    top: 60,
    width: "100%",
    zIndex: 9,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  seeAllText: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    fontWeight: "900",
  },
  otherComponentsContainer: {
    width: "100%",
    alignItems: "center",
  },
});
