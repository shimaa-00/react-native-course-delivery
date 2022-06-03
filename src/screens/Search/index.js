import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import Pagination, {Dot} from 'react-native-pagination'; //{Icon,Dot} also available
import Icon from 'react-native-vector-icons/Entypo';
import {getMovieList} from '../../api/movie';
import {Header, Input, MovieCard} from '../../components';
import {COLORS} from '../../theme';
import styles from './styles';
export const SearchScreen = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  var pageNum = 1;
  const onPressSearch = async () => {
    const _data = await getMovieList({searchValue: value, pageNumber: pageNum});
    data.push(..._data);
    setData(data);
  };
  const renderItem = ({item}) => {
    return (
      <MovieCard
        title={item.Title}
        releaseDate={item.Year}
        imageUrl={item.Poster}
      />
    );
  };
  const loadMoreItems = () => {
    pageNum++;
    onPressSearch();
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Input
              value={value}
              onChangeText={_value => {
                setValue(_value);
                setData([]);
                pageNum = 1;
                onPressSearch();
              }}
              right={
                <Pressable
                  style={styles.searchIconContainer}
                  onPress={onPressSearch}>
                  <Icon
                    name="magnifying-glass"
                    size={30}
                    color={COLORS.sun}
                    style={styles.icon}
                  />
                </Pressable>
              }
            />
            <Header text={'Search Result'} />
          </>
        }
      />
    </SafeAreaView>
  );
};
