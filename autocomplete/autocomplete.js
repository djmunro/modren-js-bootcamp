const createAutoComplete = ({
  root,
  renderItem,
  onItemsSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;

  const input = root.querySelector('.input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');

  const onInput = async ({ target }) => {
    const { value } = target;
    const items = await fetchData(value);

    if (!items.length) {
      dropdown.classList.remove('is-active');
      return;
    }

    // Clear any previous results
    resultsWrapper.innerHTML = '';

    dropdown.classList.add('is-active');

    // eslint-disable-next-line no-restricted-syntax
    for (const item of items) {
      const option = document.createElement('a');

      option.classList.add('dropdown-item');
      option.innerHTML = renderItem(item);
      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        input.value = inputValue(item);
        onItemsSelect(item);
      });

      resultsWrapper.appendChild(option);
    }
  };

  input.addEventListener('input', _.debounce(onInput, 500));

  document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};
