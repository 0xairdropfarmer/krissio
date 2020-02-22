import React, {useState, useEffect} from 'react';
import {FlatList, ScrollView, View, TouchableOpacity} from 'react-native';
import ContentPlaceholder from '../components/ContentPlaceholder';
import {Card,Title} from 'react-native-paper'
const Categories = ({navigation}) => {
  const [isloading, setisloading] = useState(true);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setisloading(true);
    fetchCategorie();
  }, []);
  const fetchCategorie = async () => {
    const response = await fetch(`https://kriss.io/wp-json/wp/v2/categories`);
    const categories = await response.json();
    setCategories(categories);
    setisloading(false);
  };
  if (isloading) {
    return (
      <View style={{marginTop: 30, padding: 12}}>
        <ContentPlaceholder />
      </View>
    );
  } else {
    return (
      <ScrollView>
        <FlatList
          data={categories}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CategorieList', {
                  categorie_id: item.id,
                  categorie_name: item.name,
                })
              }>
              <Card>
                <Card.Content>
                  <Title>{item.name}</Title>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }
};
export default Categories;
