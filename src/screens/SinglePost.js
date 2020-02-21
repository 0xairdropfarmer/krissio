import React, {useState, useEffect} from 'react';
import {Avatar, Button, Card, Title, Paragraph, List} from 'react-native-paper';
import HTML from 'react-native-htmlview';
import {View, ScrollView, ActivityIndicator, Dimensions} from 'react-native';
import moment from 'moment';
const fetchPost = async url => {
  const response = await fetch(url);
  return response.json();
};
const SinglePost = () => {
  const [isLoading, setisLoading] = useState(true);
  const [post, setpost] = useState([]);
  useEffect(() => {
    let post_id = this.props.routes?.post_id;
    fetchPost(
      `https://kriss.io/wp-json/wp/v2/posts?_embed&include=${post_id}`,
    ).then(({post}) => {
      setpost(post);
    });
    setisLoading(false);
  }, []);

  if (isLoading) {
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
  } else {
    return (
      <ScrollView>
        <Card>
          <Card.Content>
            <Title>{post[0].title.rendered} </Title>
            <List.Item
              title={`${post[0]._embedded.author[0].name}`}
              description={`${post[0]._embedded.author[0].description}`}
              left={props => {
                return (
                  <Avatar.Image
                    size={55}
                    source={{
                      uri: `${post[0]._embedded.author[0].avatar_urls[96]}`,
                    }}
                  />
                );
              }}
            />
            <List.Item
              title={`Published on ${moment(
                post[0].date,
                'YYYYMMDD',
              ).fromNow()}`}
            />
            <Paragraph />
          </Card.Content>
          <Card.Cover source={{uri: post[0].jetpack_featured_media_url}} />
          <Card.Content>
            <HTML value={post[0].content.rendered} />
          </Card.Content>
        </Card>
        )}
      </ScrollView>
    );
  }
};

export default SinglePost;
