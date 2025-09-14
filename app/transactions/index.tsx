import EmptyTransactions from "@/components/empty-transactions";
import { ThemedButton } from "@/components/themed-button";
import { ThemedIconButton } from "@/components/themed-icon-button";
import { ThemedText } from "@/components/themed-text";
import TransactionItem from "@/components/transaction-item";
import {
  moderateScale,
  PADDING_HORIZONTAL,
  verticalScale,
} from "@/constants/scale";
import { useTransactionsQuery } from "@/hooks/api";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Transaction } from "@/models/commmon";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  ListRenderItem,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TITLE_SCROLL_THRESHOLD = verticalScale(60);

const Transactions = () => {
  const backgroundColor = useThemeColor({}, "background");
  const listBackgroundColor = useThemeColor(
    { light: "#cbcdd7", dark: "#2E2E31" },
    "background"
  );
  const textColor = useThemeColor({}, "text");
  const scrollY = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useTransactionsQuery({
    per_page: 4,
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [
      0,
      TITLE_SCROLL_THRESHOLD - verticalScale(20),
      TITLE_SCROLL_THRESHOLD,
    ],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const headerTitleScale = scrollY.interpolate({
    inputRange: [
      0,
      TITLE_SCROLL_THRESHOLD - verticalScale(20),
      TITLE_SCROLL_THRESHOLD,
    ],
    outputRange: [0.8, 0.8, 1],
    extrapolate: "clamp",
  });

  const screenTitleOpacity = scrollY.interpolate({
    inputRange: [
      0,
      TITLE_SCROLL_THRESHOLD - verticalScale(30),
      TITLE_SCROLL_THRESHOLD,
    ],
    outputRange: [1, 0.3, 0],
    extrapolate: "clamp",
  });

  const screenTitleScale = scrollY.interpolate({
    inputRange: [0, TITLE_SCROLL_THRESHOLD],
    outputRange: [1, 0.9],
    extrapolate: "clamp",
  });

  const keyExtractor = useCallback(
    (_: Transaction, idx: number) => idx.toString(),
    []
  );

  const renderSeparatorComponent = useCallback(
    () => <View style={styles.div} />,
    []
  );

  const renderItem: ListRenderItem<Transaction> = useCallback(({ item }) => {
    return <TransactionItem item={item} />;
  }, []);

  const renderListEmptyComponent = useCallback(() => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }
    return <EmptyTransactions />;
  }, [isLoading]);

  const onLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }} edges={["top"]}>
      <View style={styles.mainHeader}>
        <ThemedIconButton
          variant="ghost"
          darkColor={textColor}
          lightColor={textColor}
          style={{ backgroundColor }}
          size="lg"
          icon={<Ionicons name="arrow-back" />}
          onPress={router.back}
        />
        <Animated.View
          style={[
            styles.headerTitleContainer,
            {
              opacity: headerTitleOpacity,
              transform: [{ scale: headerTitleScale }],
            },
          ]}
        >
          <ThemedText type="defaultSemiBold">Transactions</ThemedText>
        </Animated.View>
        <ThemedIconButton
          variant="ghost"
          darkColor={textColor}
          lightColor={textColor}
          style={{ backgroundColor }}
          size="lg"
          icon={<Ionicons name="filter" />}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <Animated.View
          style={[
            styles.screenTitleContainer,
            {
              opacity: screenTitleOpacity,
              transform: [{ scale: screenTitleScale }],
            },
          ]}
        >
          <ThemedText type="title">Transactions</ThemedText>
        </Animated.View>
        <FlatList
          data={data || []}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.list,
            { backgroundColor: listBackgroundColor },
          ]}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={renderSeparatorComponent}
          renderItem={renderItem}
          ListEmptyComponent={renderListEmptyComponent}
          ListFooterComponent={
            <View style={styles.footer}>
              {hasNextPage ? (
                <ThemedButton
                  variant="solid"
                  title={"Load more"}
                  loading={isFetchingNextPage}
                  onPress={onLoadMore}
                />
              ) : null}
            </View>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  headerTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  screenTitleContainer: {
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(24),
    alignItems: "flex-start",
  },
  list: { padding: moderateScale(24), borderRadius: moderateScale(16) },
  scrollView: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingBottom: verticalScale(24),
  },
  div: { height: verticalScale(44) },
  footer: { paddingVertical: verticalScale(16) },
});

export default Transactions;
