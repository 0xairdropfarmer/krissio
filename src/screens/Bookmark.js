import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import PostCard from '../components/PostCard';
import {Headline} from 'react-native-paper';
import ContentPlaceholder from '../components/ContentPlaceholder';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';
const Bookmark = ({navigation}) => {
  const [bookmarkpost, setbookmarkpost] = useState([]);
  const [isloading, setisloading] = useState(true);
  const fetchBookMark = async () => {
    let bookmark = await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token);
      if (res != null) {
        const result = res.map(post_id => {
          return 'include[]=' + post_id;
        });
        return result.join('&');
      } else {
        return null;
      }
    });
    const response = await fetch(
      `https://kriss.io/wp-json/wp/v2/posts?${bookmark}`,
    );
    const post = await response.json();
    //this.setState({ posts: post });
    setbookmarkpost(post);
    setisloading(false);
  };
  useEffect(() => {
    fetchBookMark();
  }, []);
  useFocusEffect(() => {
    if (!isloading) {
      fetchBookMark();
    }
  }, [isloading]);
  if (isloading) {
    return (
      <View style={{marginTop: 30, padding: 12}}>
        <ContentPlaceholder />
      </View>
    );
  } else {
    return (
      <View>
        <Headline style={{marginLeft: 30}}>Bookmark Post</Headline>
        <FlatList
          data={bookmarkpost}
          renderItem={({item}) => (
            <PostCard item={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
};

export default Bookmark;
