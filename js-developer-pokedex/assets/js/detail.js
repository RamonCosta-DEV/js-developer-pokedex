export class PokemonUrl {
  static namePokemon = "ditto";

  static get url() {
    return `https://pokeapi.co/api/v2/pokemon/${this.namePokemon}`;
  }

  static setPokemonName(name) {
    this.namePokemon = name;
  }

  static async getRequest() {
    const response = await fetch(this.url);
    if (!response.ok) throw new Error("Pokémon não encontrado");
    const data = await response.json();
    return data;
  }

  static convertToHtml(data) {
    const name = data.name;
    const id = data.id;
    const image = data.sprites.other["official-artwork"].front_default;
    const types = data.types.map((t) => t.type.name).join(", ");
    const abilities = data.abilities.map((a) => a.ability.name).join(", ");

    return `
      <div class="pokemon-detail ${data.types[0].type.name}">
        <div class="pokemon-name-type">
          <div class="name-container">
            <h2>${name}</h2>
            <p class="type ${types}">${types}</p>
            <p>ID: ${id}</p>
          </div>
        </div>
        <div class="pokemon-image">
          <img src="${image}" alt="${name}">
        </div>
      </div>

      <div class="describe-container">
        <p class="describe">Habilidades: ${abilities}</p>
        <div class="status">
          ${data.stats.map(
            (s) => `
              <p>${s.stat.name.toUpperCase()}: <strong>${s.base_stat}</strong></p>
            `
          ).join("")}
        </div>
      </div>
    `;
  }

  static getHtml(data) {
    document.querySelector("main").innerHTML = this.convertToHtml(data);
  }
}

// Executa automaticamente na página de detalhes
(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pokemonName = urlParams.get("name") || "pikachu";

  PokemonUrl.setPokemonName(pokemonName);
  const data = await PokemonUrl.getRequest();
  PokemonUrl.getHtml(data);
})();


