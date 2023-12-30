const submitButton = document.querySelector("button");
const inputTextBox = document.querySelector("input");
const resultContainer = document.querySelector(".result");
const regionCountriesContainer = document.querySelector(".region-countries");

const API_URL = "https://restcountries.com/v3.1";

const countryData = {
  countryRegion: "",
  countryInfo: "",
  regionData: "",
};

function fetchData(endpoint) {
  try {
    return fetch(`${API_URL}/${endpoint}`).then((response) => response.json());
  } catch (error) {
    throw error;
  }
}

function displayCountryInfo() {
  resultContainer.innerHTML = `
    <h3>Country Information</h3>
    <img src="${countryData.countryInfo.flag}"/>
    <p>Country Name: ${countryData.countryInfo.name}</p>
    <p>Population: ${countryData.countryInfo.population}</p>
    <p>Area: ${countryData.countryInfo.area}</p>
    <p>Currencies: ${Object.keys(countryData.countryInfo.currencies)
      .map((currency) => {
        const curr = countryData.countryInfo.currencies[currency];
        return `${curr.name} (${curr.symbol})`;
      })
      .join(", ")}</p>
    <p>Capital City: ${countryData.countryInfo.capital}</p>
    <p>Region: ${countryData.countryInfo.region}</p>`;
}

function displayRegionCountries() {
  const countriesInRegionHTML = countryData.regionData
    .map(
      (country) => `
    <div>
      <img 
        src="${country.flags?.png}" 
        alt="${country.name.common} Flag" />
      <p>${country.name.common}</p>
    </div>`
    )
    .join("");

  regionCountriesContainer.innerHTML = `
    <h3 class="region-title">Countries in the Same Region</h3>
    <div class="countries-container">
      ${countriesInRegionHTML}
    </div>`;
}

function handleError(error) {
  resultContainer.innerHTML = `
    <p>${error.message}</p>`;
  regionCountriesContainer.innerHTML = "";
}

function getData() {
  const textBoxValue = inputTextBox.value;

  fetchData(`name/${textBoxValue}`)
    .then((countryDataArray) => {
      if (countryDataArray.length > 0) {
        const country = countryDataArray[0];

        countryData.countryRegion = country?.region;
        countryData.countryInfo = {
          name: country.name.common,
          area: country.area.toLocaleString(),
          population: country.population.toLocaleString(),
          languages: country.languages,
          currencies: country.currencies,
          capital: country.capital[0],
          region: country.region,
          flag: country.flags.png,
        };

        displayCountryInfo();

        return fetchData(`region/${countryData.countryRegion}`);
      } else {
        throw new Error("Country not found");
      }
    })
    .then((regionDataArray) => {
      countryData.regionData = regionDataArray;
      displayRegionCountries();
    })
    .catch((error) => {
      handleError(error);
    });
}

submitButton.addEventListener("click", getData);
