const url = 'https://pokeapi.co/api/v2/pokemon/';
const searchInput = document.getElementById('search');
const pokedexDiv = document.getElementById('pokedex');

function showError(msg) {
  pokedexDiv.innerHTML = `<p>${msg}</p>`;
}

async function searchPokemon() {
  const searchedPokemon = searchInput.value.toLowerCase();
  pokedexDiv.innerHTML = '';
  try {
    const response = await fetch(url + searchedPokemon);

    if (!response.ok) {
      showError(`No se encontró un Pokémon llamado ${searchedPokemon}`);
      return;
    }

    const data = await response.json();
    const name = document.createElement('h2');
    const originalName = data.name;
    const formattedName =
      originalName.charAt(0).toUpperCase() +
      originalName.slice(1).toLowerCase();

    name.innerHTML = formattedName;
    const img = document.createElement('img');
    img.src = data.sprites.front_default;
    img.style.width = '200px';
    const p = document.createElement('p');
    p.innerHTML = '#' + data.id;
    console.log(p.innerHTML);

    // Crear una tabla para las estadísticas
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    // Iterar a través de las estadísticas y crear filas de tabla
    data.stats.forEach((stat) => {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const valueCell = document.createElement('td');

      // Los nombres de las estadísticas suelen estar en minúsculas, así que capitalizamos la primera letra
      const statName =
        stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1);

      nameCell.textContent = statName;
      valueCell.textContent = stat.base_stat;

      row.appendChild(nameCell);
      row.appendChild(valueCell);

      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    const hgroup = document.createElement('hgroup');
    hgroup.appendChild(name);
    hgroup.appendChild(p);
    pokedexDiv.append(hgroup);
    pokedexDiv.append(img);
    pokedexDiv.append(table);
  } catch (e) {
    console.error(e);
    showError('Ha ocurrido un error al buscar el Pokémon');
  }
}
