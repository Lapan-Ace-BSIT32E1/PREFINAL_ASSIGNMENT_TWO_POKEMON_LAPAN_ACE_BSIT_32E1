
const pokemonListElement = document.getElementById('pokemon-list');
const pokemonDetailsElement = document.getElementById('pokemon-details');

fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    .then(response => response.json())
    .then(data => {
        data.results.forEach(pokemon => {
            fetchPokemonDetails(pokemon.url);
        });
    });

function fetchPokemonDetails(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            createPokemonCard(data);
        });
}

function createPokemonCard(pokemon) {
    const pokemonCard = document.createElement('div');
    pokemonCard.className = 'pokemon-card';

    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.sprites.front_default;

    const pokemonName = document.createElement('h3');
    pokemonName.textContent = pokemon.name;

    const pokemonButton = document.createElement('button');
    pokemonButton.className = 'pokemon-button';
    pokemonButton.textContent = 'View Details';
    pokemonButton.addEventListener('click', () => showPokemonDetails(pokemon));

    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(pokemonName);
    pokemonCard.appendChild(pokemonButton);

    pokemonListElement.appendChild(pokemonCard);
}

function showPokemonDetails(pokemon) {
    pokemonDetailsElement.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"/>
        <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
        <p>Moves: ${pokemon.moves.slice(0, 5).map(move => move.move.name).join(', ')}</p>
    `;
    pokemonDetailsElement.style.display = 'block';
}