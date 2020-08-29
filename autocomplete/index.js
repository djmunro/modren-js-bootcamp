createAutoComplete({
  root: document.querySelector('.autocomplete'),
  renderItem(movie) {
    return `
        <img src="${movie.Poster}" />
        ${movie.Title} (${movie.Year})
      `;
  },
  onItemsSelect: (movie) => { console.log(movie); },
  inputValue: (movie) => movie.Title,
  async fetchData(searchParam) {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: '32402c01',
        s: searchParam,
      },
    });
    return response.data.Search || [];
  },
});

createAutoComplete({
  root: document.querySelector('.autocomplete-right'),
  renderItem(movie) {
    return `
          <img src="${movie.Poster}" />
          ${movie.Title} (${movie.Year})
        `;
  },
  onItemsSelect: (movie) => { console.log(movie); },
  inputValue: (movie) => movie.Title,
  async fetchData(searchParam) {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: '32402c01',
        s: searchParam,
      },
    });
    return response.data.Search || [];
  },
});
