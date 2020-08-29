const waitFor = (selector, timeout = 2000) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(interval);
        clearTimeout(timeoutRef);
        resolve();
      }
    }, 30);

    const timeoutRef = setTimeout(() => {
      clearInterval(interval);
      reject();
    }, timeout);
  });
};

beforeEach(() => {
  document.querySelector("#target").innerHTML = "";
  createAutoComplete({
    root: document.querySelector("#target"),
    fetchData() {
      return [
        { Title: "Avengers" },
        { Title: "Not Avengers" },
        { Title: "Some other movie" },
      ];
    },
    renderOption(movie) {
      return movie.Title;
    },
  });
});

it("Dropdown starts closed", () => {
  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).not.to.include("is-active");
});

it("After searching, dropdown opens up", async () => {
  const input = document.querySelector("input");
  input.value = "foo";
  input.dispatchEvent(new Event("input"));

  await waitFor(".dropdown-item");

  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).to.include("is-active");
});

it("After searching, displays some results", async () => {
  const input = document.querySelector("input");
  input.value = "foo";
  input.dispatchEvent(new Event("input"));

  await waitFor(".dropdown-item");

  const items = document.querySelectorAll(".dropdown-item");
  expect(items.length).to.equal(3);
});
