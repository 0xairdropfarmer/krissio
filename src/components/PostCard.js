import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import HTMLRender from 'react-native-render-html';
import moment from 'moment';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  withTheme,
  Headline,
} from 'react-native-paper';
const PostCard = ({item, navigation, theme}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('SinglePost', {
          post_id: item.id,
          name: item.title.rendered,
        })
      }>
      <Card
        style={{
          shadowOffset: {width: 5, height: 5},
          width: '90%',
          borderRadius: 12,
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        <Card.Content>
          <Title>{item.title.rendered}</Title>
          <Paragraph>Published on {moment(item.date).fromNow()}</Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: item.jetpack_featured_media_url}} />
        <Card.Content>
          <Card.Content>
            <HTMLRender
              html={item.excerpt.rendered}
              tagsStyles={{
                p: {color: theme.colors.text},
              }}
            />
          </Card.Content>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default withTheme(PostCard);
