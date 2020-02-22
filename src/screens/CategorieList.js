import React, {useEffect, useState} from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';
import ContentPlaceholder from '../components/ContentPlaceholder';
import PostCard from '../components/PostCard';
const CategorieList = ({navigation, route}) => {
  const [posts, setPosts] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchLastestPost();
  }, []);
  useEffect(() => {
    if (isFetching) {
      fetchLastestPost();
    }
  }, [isFetching]);
  useEffect(() => {
    if (page > 1) {
      fetchLastestPost();
    }
  }, [page]);
  fetchLastestPost = async () => {
    let categorie_id = route.params.categorie_id;
    const response = await fetch(
      `https://kriss.io/wp-json/wp/v2/posts?categories=${categorie_id}&per_page=5&page=${page}`,
    );
    const post = await response.json();
    if (page == 1) {
      setPosts(post);
    } else {
      setPosts([...posts, ...post]);
    }
    setIsLoading(false);
    setIsFetching(false);
  };
  function onRefresh() {
    setIsFetching(true);
  }
  function handleLoadMore() {
    setPage(page => page + 1);
  }
  function renderFooter() {
    if (isFetching) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  if (isloading) {
    return (
      <View style={{marginTop: 30, padding: 12}}>
        <ContentPlaceholder />
      </View>
    );
  } else {
    return (
      <View>
        <FlatList
          data={posts}
          onRefresh={() => onRefresh()}
          refreshing={isFetching}
          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => renderFooter()}
          renderItem={({item}) => (
            <PostCard item={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
};

export default CategorieList;
