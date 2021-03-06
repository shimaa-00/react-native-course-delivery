import {client} from './client';
export const getMovieList = async ({searchValue, pageNumber}) => {
  try {
    const response = await client.get('/', {
      params: {
        s: searchValue,
        page: pageNumber,
      },
    });
    const {data} = response;
    if (data.Response === 'True') {
      return data.Search;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};
