const URL_API = "https://rickandmortyapi.com/api/character";

const getData = async () => {
  const response = await fetch(URL_API);
  const data = await response.json();
  return data?.results;
};

const getEpisode = async (episode) => {
  const response = await fetch(episode);
  const data = await response.json();
  return data;
};

const printData = async () => {
  const data = await getData();
  const container = document.querySelector("#main");
  const div = document.createElement("div");
  div.classList.add("container");
  data.forEach((character) => {
    const { name, image, species, status, location, episode } = character;
    const episodeName = new Promise((resolve, reject) => {
      getEpisode(episode[0])
        .then((data) => {
          resolve(data.name);
        })
        .catch((error) => {
          reject(error);
        });
    });
    episodeName.then((data) => {
      div.innerHTML += `<div class="character">
      <img
      src="${image}"
      alt="${name}"
    />
    <div class="description">
      <h3>${name}</h3>
      <p><span class=${
        status === "Alive" ? "alive" : "unknown"
      }></span>${status} - ${species}</p>
      <h6>Last know location:</h6>
      <p>${location.name}</p>
      <h6>First seen in:</h6>
      <p>${data}</p>
    </div>
      </div>`;
      container.appendChild(div);
    });
  });
};
getData().then(printData);
