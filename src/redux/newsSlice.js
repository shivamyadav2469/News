import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiKey = '1146f0fbcbff40659c5cbe1f290b06d3';

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ category, page, q }, { rejectWithValue }) => {
    const countries = ['in']; 
    const pageSize = 20;
    const queryParams = {
      apiKey,
      pageSize,
      page,
    };

    if (category) {
      queryParams.category = category;
    }

    if (q) {
      queryParams.q = q;
    }

    const queryString = Object.keys(queryParams)
      .map(key => `${key}=${queryParams[key]}`)
      .join('&');

    try {
      const promises = countries.map(country =>
        fetch(`https://newsapi.org/v2/top-headlines?country=${country}&${queryString}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch news for country: ${country}, status: ${response.status}`);
            }
            return response.json();
          })
      );

      const { articles, totalResults } = await Promise.all(promises)
        .then(results => {
          const allArticles = results.flatMap(result => result.articles);
          const totalResults = results.reduce((sum, result) => sum + result.totalResults, 0);
          return { articles: allArticles, totalResults };
        });

      if (articles.length === 0) {
        throw new Error('No News found.');
      }

      return { articles, totalResults };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Redux slice definition
const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    loading: false,
    error: null,
    totalResults: 0,
    page: 1,
    category: 'general',
    searchKeyword: '', 
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.page = 1;
      state.articles = [];
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
      state.page = 1;
      state.articles = [];
      state.category = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { setCategory, setPage, setSearchKeyword } = newsSlice.actions;

export default newsSlice.reducer;
