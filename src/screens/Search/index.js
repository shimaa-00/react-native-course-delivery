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

  const onPressSearch = async () => {
    const _data = await getMovieList({searchValue: value});
    setData(_data);
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
  // const onViewableItemsChanged = ({viewableItems, changed}) =>
  //   this.setState({viewableItems});

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        // ref={r => (this.refs = r)} //create refrence point to enable scrolling
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        // onViewableItemsChanged={this.onViewableItemsChanged} //need this
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Input
              value={value}
              onChangeText={_value => {
                setValue(_value);
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
