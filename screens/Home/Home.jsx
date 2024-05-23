import { useRef, useState, useEffect, useCallback } from "react";
import {
  Animated,
  Keyboard,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import AppWrapper from "../../wrappers/AppWrapper";
import { SearchBar } from "../../components/search/SearchBar";
import { RecipeList } from "../../components/recipe/RecipeList";
import { Header } from "./Header";
import { CategoryBar } from "./CategoryBar";
import {
  SearchHeader,
  CustomHeader,
} from "../../components/search/CustomHeader";
import { SearchList } from "../../components/search/SearchList";
import { PRIMARY_COLOR } from "../../constants/color";
import { me } from "../../api/users";
import { recentSearch } from "../../api/search";
import { getPopularRecipes } from "../../api/recipes";

export const Home = ({ navigation }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const otherComponentsOpacity = useRef(new Animated.Value(1)).current;
  const searchHeaderOpacity = useRef(new Animated.Value(0)).current;
  const [searchActive, setSearchActive] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popularRecipes, setPopularRecipes] = useState([]);

  const targetTopPosition = -20;

  const scrollViewRef = useRef(null);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const refreshData = async () => {
        const results = await recentSearch();
        setDataSearch(results.data);

        const popularResponse = await getPopularRecipes();
        setPopularRecipes(popularResponse.data.content);
      };
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchDataUser = async () => {
      const results = await recentSearch();
      setDataSearch(results.data);

      const popularResponse = await getPopularRecipes();
      setPopularRecipes(popularResponse.data.content);
    };

    fetchDataUser();
  }, []);

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {searchActive ? (
          <Animated.View
            style={[
              {
                opacity: searchHeaderOpacity,
                paddingHorizontal: 30,
                width: "100%",
              },
            ]}
          >
            <CustomHeader
              goBack={toggleSearchBarPosition}
              title="Search Recipes"
            />
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
            isSearching={isSearching}
            setIsSearching={(value) => setIsSearching(value)}
            setDataSearch={(value) => setDataSearch(value)}
            setIsLoading={(value) => setIsLoading(value)}
          />
        </Animated.View>
        {searchActive ? (
          <Animated.View
            style={[
              {
                flex: 1,
                opacity: searchHeaderOpacity,
                width: "100%",
                paddingHorizontal: 30,
              },
            ]}
          >
            <SearchList
              isSearching={isSearching}
              dataSource={dataSearch}
              isLoading={isLoading}
            />
          </Animated.View>
        ) : (
          <Animated.View
            style={{
              opacity: otherComponentsOpacity,
            }}
          >
            <CategoryBar />
            <RecipeList title="Your recipes" dataSource={popularRecipes} />
            <RecipeList title="Popular recipes" dataSource={popularRecipes} />
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
    // paddingHorizontal: 30,
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
