document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // ÉTAT GLOBAL DU JEU
    // =============================================
    const gameState = {
        teams: [],
        currentTeam: 0,
        round: 1,
        maxRounds: 3,
        timerDuration: 60,
        timerInterval: null,
        initialDeck: [],
        roundDeck: [],
        turnDeck: [],
        passedDeck: [],
        currentCard: null,
        scoreThisTurn: 0,
        foundCardsThisTurn: [],
        isAnimating: false,
        roundTypes: [
            { name: "Description", instruction: "Décrivez sans le nommer" },
            { name: "Un mot", instruction: "Faites deviner avec un seul mot" },
            { name: "Mime", instruction: "Faites deviner sans parler" }
        ]
    };

    // =============================================
    // DONNÉES DES CARTES
    // =============================================
    const sampleCards = {
        films: [
                    { "name": "Forrest Gump" },
                    { "name": "La Ligne verte" },
                    { "name": "Le Seigneur des anneaux" },
                    { "name": "Le Roi Lion" },
                    { "name": "Star Wars" },
                    { "name": "Joker" },
                    { "name": "Tu ne tueras point" },
                    { "name": "Spider-Man" },
                    { "name": "Titanic" },
                    { "name": "Avatar" },
                    { "name": "Indiana Jones" },
                    { "name": "Toy Story" },
                    { "name": "Hunger Games" },
                    { "name": "Le Labyrinthe" },
                    { "name": "Harry Potter" },
                    { "name": "Coco" },
                    { "name": "Wall-E" },
                    { "name": "Le Chat Potté" },
                    { "name": "Les trois petits cochons" },
                    { "name": "The Mask" },
                    { "name": "Batman" },
                    { "name": "Iron Man" },
                    { "name": "Avengers" },
                    { "name": "Vice Versa" },
                    { "name": "Charlotte aux fraises" },
                    { "name": "Dragons" },
                    { "name": "Jurassic Park" },
                    { "name": "Les Mondes de Ralph" },
                    { "name": "Le Livre de la jungle" },
                    { "name": "Vaiana" },
                    { "name": "Raiponce" },
                    { "name": "Pirates des Caraïbes" },
                    { "name": "Men in Black" },
                    { "name": "Le Petit Prince" },
                    { "name": "Astérix et Obélix" },
                    { "name": "La Reine des Neiges" },
                    { "name": "E.T. l'Extra-Terrestre" },
                    { "name": "La Petite Sirène" },
                    { "name": "Peter Pan" },
                    { "name": "La Belle au bois dormant" },
                    { "name": "Le Monde de Nemo" },
                    { "name": "Alice au pays des merveilles" },
                    { "name": "La Belle et le Clochard" },
                    { "name": "SOS Fantôme" },
                    { "name": "Moi, Moche et Méchant" },
                    { "name": "Le Parrain" },
                    { "name": "Les Évadés" },
                    { "name": "Inception" },
                    { "name": "Dune" },
                    { "name": "Retour vers le Futur" },
                    { "name": "The Dark Knight" },
                    { "name": "Gladiator" },
                    { "name": "The Truman Show" },
                    { "name": "Les Infiltrés" },
                    { "name": "Blade Runner" },
                    { "name": "Gran Torino" },
                    { "name": "The Social Network" },
                    { "name": "Les Sept Samouraïs" },
                    { "name": "Le Bon, la Brute et le Truand" },
                    { "name": "Scarface" },
                    { "name": "The Shining" },
                    { "name": "Fight Club" },
                    { "name": "Les Bronzés" },
                    { "name": "OSS 117" },
                    { "name": "Intouchables" },
                    { "name": "Le Dîner de Cons" },
                    { "name": "Ratatouille" },
                    { "name": "Kung Fu Panda" },
                    { "name": "Shrek" },
                    { "name": "Madagascar" },
                    { "name": "Zootopie" },
                    { "name": "Les Minions" },
                    { "name": "Soul" },
                    { "name": "Les Indestructibles" },
                    { "name": "Le Monde de Dory" },
                    { "name": "Les Nouveaux Héros" }
                        
        
                ],
                series: [
                    { "name": "Game of Thrones" },
                    { "name": "Breaking Bad" },
                    { "name": "Friends" },
                    { "name": "Stranger Things" },
                    { "name": "La Casa de Papel" },
                    { "name": "The Crown" },
                    { "name": "The Simpsons" },
                    { "name": "Grey's Anatomy" },
                    { "name": "Better Call Saul" },
                    { "name": "Peaky Blinders" },
                    { "name": "Le jeu de la dame" },
                    { "name": "Shameless" },
                    { "name": "Dexter" },
                    { "name": "Black Mirror" },
                    { "name": "MINDHUNTER" },
                    { "name": "Brooklyn Nine-Nine" },
                    { "name": "Pokémon" },
                    { "name": "Barbapapa" },
                    { "name": "Bob l'éponge" },
                    { "name": "Tom et Jerry" },
                    { "name": "Un gars, une fille" },
                    { "name": "Lupin" },
                    { "name": "Family Business" },
                    { "name": "Mr. Robot" },
                    { "name": "Rick et Morty" },
                    { "name": "Teen Wolf" },
                    { "name": "Cobra Kai" },
                    { "name": "Dr House" },
                    { "name": "Naruto" },
                    { "name": "Vampire Diaries" },
                    { "name": "Santa Clarita Diet" },
                    { "name": "Scooby-Doo" },
                    { "name": "One Piece" },
                    { "name": "Demon Slayer" },
                    { "name": "Les 100" },
                    { "name": "Peppa Pig" },
                    { "name": "Dora l'exploratrice" },
                    { "name": "Inspecteur Gadget" },
                    { "name": "Teletubbies" },
                    { "name": "Popeye le marin" },
                    { "name": "L'âne Trotro" },
                    { "name": "Dragon Ball Z" },
                    { "name": "Beyblade" },
                    { "name": "Ben 10" },
                    { "name": "The Walking Dead" },
                    { "name": "The Witcher" },
                    { "name": "The Mandalorian" },
                    { "name": "The Office" },
                    { "name": "The Big Bang Theory" },
                    { "name": "Sherlock" },
                    { "name": "The Last of Us" },
                    { "name": "House of Cards" },
                    { "name": "Narcos" },
                    { "name": "Westworld" },
                    { "name": "The Queen's Gambit" },
                    { "name": "The Boys" },
                    { "name": "The Umbrella Academy" },
                    { "name": "Wednesday" },
                    { "name": "Outer Banks" },
                    { "name": "The Haunting of Hill House" },
                    { "name": "Squid Game" },
                    { "name": "Money Heist" },
                    { "name": "Elite" },
                    { "name": "Dark" },
                    { name: "The Sandman",},
                    { name: "The Bear",},
                    { name: "Succession",},
                    { name: "Euphoria",},
                    { name: "The White Lotus",},
                    { name: "Bridgerton",},
                    { name: "Emily in Paris",},
                    { name: "You",},
                    { name: "Sex Education",},
                    { name: "The Handmaid's Tale"},
                    { name: "Chernobyl"},
                    { name: "Arcane"},
                    { name: "Attack on Titan"}
                
                ],
                acteurs: [
                    { name: "Leonardo DiCaprio" },
                    { name: "Tom Hanks" },
                    { name: "Meryl Streep" },
                    { name: "Brad Pitt" },
                    { name: "Jennifer Lawrence" },
                    { name: "Denzel Washington" },
                    { name: "Emma Watson" },
                    { name: "Robert Downey Jr." },
                    { name: "Scarlett Johansson" },
                    { name: "Johnny Depp" },
                    { name: "Will Smith" },
                    { name: "Tom Cruise" },
                    { name: "Angelina Jolie" },
                    { name: "Natalie Portman" },
                    { name: "Christian Bale" },
                    { name: "Matt Damon" },
                    { name: "Charlize Theron" },
                    { name: "Ryan Reynolds" },
                    { name: "Chris Hemsworth" },
                    { name: "Anne Hathaway" },
                    { name: "Morgan Freeman" },
                    { name: "Samuel L. Jackson" },
                    { name: "Keanu Reeves" },
                    { name: "Nicole Kidman" },
                    { name: "Cate Blanchett" },
                    { name: "Joaquin Phoenix" },
                    { name: "Margot Robbie" },
                    { name: "Timothée Chalamet" },
                    { name: "Zendaya" },
                    { name: "Dwayne Johnson" },
                    { name: "Gal Gadot" },
                    { name: "Jason Momoa" },
                    { name: "Hugh Jackman" },
                    { name: "Daniel Day-Lewis" },
                    { name: "Anthony Hopkins" },
                    { name: "Kate Winslet" },
                    { name: "Jodie Foster" },
                    { name: "Al Pacino" },
                    { name: "Robert De Niro" },
                    { name: "Jack Nicholson" },
                    { name: "Sandra Bullock" },
                    { name: "Julia Roberts" },
                    { name: "George Clooney" },
                    { name: "Bruce Willis" },
                    { name: "Arnold Schwarzenegger" },
                    { name: "Sylvester Stallone" },
                    { name: "Keira Knightley" },
                    { name: "Benedict Cumberbatch" },
                    { name: "Tom Hardy" },
                    { name: "Chris Evans" },
                    { name: "Mark Ruffalo" },
                    { name: "Jeremy Renner" },
                    { name: "Paul Rudd" },
                    { name: "Vin Diesel" },
                    { name: "Jason Statham" },
                    { name: "Liam Neeson" },
                    { name: "Harrison Ford" },
                    { name: "Sigourney Weaver" },
                    { name: "Winona Ryder" },
                    { name: "Michelle Pfeiffer" },
                    { name: "Emma Stone" },
                    { name: "Ryan Gosling" },
                    { name: "Jake Gyllenhaal" },
                    { name: "Jessica Chastain" },
                    { name: "Amy Adams" },
                    { name: "Viola Davis" },
                    { name: "Lupita Nyong'o" },
                    { name: "Idris Elba" },
                    { name: "Michael B. Jordan" },
                    { name: "Chadwick Boseman" },
                    { name: "Letitia Wright" },
                    { name: "Florence Pugh" },
                    { name: "Anya Taylor-Joy" }
                ],
                personnages: [
                    { name: "Tony Stark (Iron Man)" },
                    { name: "Walter White (Breaking Bad)" },
                    { name: "Jon Snow (Game of Thrones)" },
                    { name: "Harry Potter" },
                    { name: "Darth Vader (Star Wars)" },
                    { name: "Hannibal Lecter" },
                    { name: "Ellen Ripley (Alien)" },
                    { name: "James Bond" },
                    { name: "Indiana Jones" },
                    { name: "The Joker" },
                    { name: "Batman" },
                    { name: "Superman" },
                    { name: "Spider-Man" },
                    { name: "Wonder Woman" },
                    { name: "Gandalf (Le Seigneur des Anneaux)" },
                    { name: "Frodo Baggins (Le Seigneur des Anneaux)" },
                    { name: "Katniss Everdeen (Hunger Games)" },
                    { name: "Jack Sparrow (Pirates des Caraïbes)" },
                    { name: "Neo (Matrix)" },
                    { name: "Marty McFly (Retour vers le futur)" },
                    { name: "Sherlock Holmes" },
                    { name: "Lisbeth Salander (Millénium)" },
                    { name: "John Wick" },
                    { name: "Lara Croft (Tomb Raider)" },
                    { name: "Ethan Hunt (Mission Impossible)" },
                    { name: "Jason Bourne" },
                    { name: "Rocky Balboa" },
                    { name: "Forrest Gump" },
                    { name: "Tyler Durden (Fight Club)" },
                    { name: "Don Vito Corleone (Le Parrain)" },
                    { name: "Hercule Poirot" },
                    { name: "Mary Poppins" },
                    { name: "Willy Wonka" },
                    { name: "Hannibal Lecter" },
                    { name: "Norman Bates (Psychose)" },
                    { name: "Freddy Krueger" },
                    { name: "Jason Voorhees" },
                    { name: "Chucky" },
                    { name: "Sonic" },
                    { name: "Mario" },
                    { name: "Pikachu (Pokémon)" },
                    { name: "Mickey Mouse" },
                    { name: "Donald Duck" },
                    { name: "Bugs Bunny" },
                    { name: "Scooby-Doo" },
                    { name: "Snoopy" },
                    { name: "Tintin" },
                    { name: "Astérix" },
                    { name: "Obélix" },
                    { name: "Lucky Luke" },
                    { name: "Corto Maltese" },
                    { name: "Black Adam" },
                    { name: "Black Panther" },
                    { name: "Deadpool" },
                    { name: "Wolverine" },
                    { name: "Magneto" },
                    { name: "Professor X" },
                    { name: "Les Minions" },
                    { name: "Gru (Moi, Moche et Méchant)" },
                    { name: "Megamind" },
                    { name: "Kermit la grenouille" },
                    { name: "Miss Piggy" },
                    { name: "Elmo (Sesame Street)" },
                    { name: "Big Bird (Sesame Street)" },
                    { name: "SpongeBob SquarePants" },
                    { name: "Patrick Star" },
                    { name: "Sandy Cheeks" },
                    { name: "Mr. Krabs" },
                    { name: "Plankton" },
                    { name: "Goku (Dragon Ball)" },
                    { name: "Naruto Uzumaki (Naruto)" },
                    { name: "Daenerys Targaryen (Game of Thrones)" }, 
                    { name: "Eleven (Stranger Things)" },
                    { name: "Geralt of Rivia (The Witcher)" },
                    { name: "Din Djarin (The Mandalorian)" },
                    { name: "Michael Scott (The Office)" }, 
                    { name: "Barney Stinson (How I Met Your Mother)" },
                    { name: "Homer Simpson (Les Simpson)" },
                    { name: "Bob l'éponge" },
                    { name: "Buzz l'Éclair (Toy Story)" },
                    { name: "Shrek" },

                ],

                dessinsAnimes: [
                                
                { "name": "Objectif Blake !" },
                { "name": "Les Bisounours" },
                { "name": "Code Lyoko" },
                { "name": "La Maison de Mickey" },
                { "name": "Les Blagues de Toto" },
                { "name": "La Ferme en folie" },
                { "name": "Les aventures de Spirou et Fantasio" },
                { "name": "Magic" },
                { "name": "Les aventures de Tintin" },
                { "name": "Teen Titans" },
                { "name": "Adventure Time" },
                { "name": "Bob l’éponge" },
                { "name": "The Simpsons" },
                { "name": "Tom et Jerry" },
                { "name": "Pokémon" },
                { "name": "Barbapapa" },
                { "name": "Peppa Pig" },
                { "name": "Dora l'exploratrice" },
                { "name": "Inspecteur Gadget" },
                { "name": "Teletubbies" },
                { "name": "Popeye le marin" },
                { "name": "L'âne Trotro" },
                { "name": "Beyblade" },
                { "name": "Ben 10" },
                { "name": "My Little Pony" },
                { "name": "La Panthère Rose" },
                { "name": "Totally Spies" },
                { "name": "Tom-Tom et Nana" },
                { "name": "Scooby-Doo" },
                { "name": "Les Schtroumpfs" },
                { "name": "Les Razmoket" },
                { "name": "Dragon Ball Z" },
                { "name": "Les Chevaliers du Zodiaque" },
                { "name": "Maya l'abeille" },
                { "name": "Il était une fois... la Vie" },
                { "name": "Titi et Grosminet" },
                { "name": "Les Pierrafeu" },
                { "name": "Woody Woodpecker" },
                { "name": "Les Super Nanas" },
                { "name": "Foot 2 Rue" },
                { "name": "Martin Mystère" },
                { "name": "Oggy et les Cafards" },
                { "name": "Les Zinzins de l'espace" },
                { "name": "Miraculous" },
                { "name": "Capitain Flam" },
                { "name": "Mon ami Marsupilami" },
                { "name": "Famille Pirate" },
                { "name": "Wakfu" },
                { "name": "Lucky Luke" },
                { "name": "Fifi Brindacier" },
                { "name": "Boule et Bill" },
                { "name": "Les histoires du Père Castor" },
                { "name": "Calimero" },
                { "name": "Rekkit" },
                { "name": "Charlie Brown" },
                { "name": "Le Muppet Show" },
                { "name": "Hello Kitty" },
                { "name": "Ratz" },
                { "name": "Bienvenue chez les Loud" },
                { "name": "Courage le chien froussard" },
                { "name": "Les Aventures de Jackie Chan" },
                { "name": "Gravity Falls" },
                { "name": "Phinéas et Ferb" },
                { "name": "La Légende de Korra" },
                { "name": "Samouraï Jack" },
                { "name": "Les Tortues Ninja" },
                { "name": "Gargoyles" },
                { "name": "Les Mondes Engloutis" },
                { "name": "Ulysse 31" },
                { "name": "Jayce et les Conquérants de la Lumière" },
                { "name": "Les Mystérieuses Cités d'Or" },
                { "name": "Chip 'n Dale Rescue Rangers" },
                { "name": "Darkwing Duck" },
                { "name": "Kaeloo" },
                { "name": "Grizzy et les Lemmings" },
                { "name": "Lastman" },
                { "name": "Les Malheurs de Sophie" },
                { "name": "Sonic Boom" },
                { "name": "Looney Tunes" },
                { "name": "Les Aventures de T-Rex" },
                { "name": "Gigantosaurus" }
            ],
                jeuxVideo: [
                { "name": "Minecraft" },
                { "name": "Fortnite" },
                { "name": "The Legend of Zelda" },
                { "name": "Pokémon Go" },
                { "name": "Grand Theft Auto V" },
                { "name": "Among Us" },
                { "name": "FIFA" },
                { "name": "League of Legends" },
                { "name": "Overwatch" },
                { "name": "Animal Crossing" },
                { "name": "Plants vs. Zombies" },
                { "name": "Rocket League" },
                { "name": "Tetris" },
                { "name": "Pac-Man" },
                { "name": "Mortal Kombat" },
                { "name": "Les Sims" },
                { "name": "PUBG" },
                { "name": "Brawl Stars" },
                { "name": "Mario Kart" },
                { "name": "Splatoon" },
                { "name": "Wii Sport" },
                { "name": "Donkey Kong" },
                { "name": "Super Mario 64" },
                { "name": "Mii" },
                { "name": "candy crush" },
                { "name": "Angry Birds" },
                { "name": "Clash of Clans" },
                { "name": "Subway Surfers" },
                { "name": "Temple Run" },
                { "name": "Fruit Ninja" },
                { "name": "Flappy Bird" },
                { "name": "Clash Royale" },
                { "name": "Gardenscapes" },
                { "name": "Super Mario Odyssey" },
                { "name": "MovieStarPlanet" },
                { "name": "Resident Evil" },
                { "name": "Red Dead Redemption 2" },
                { "name": "Countdown" },
                { "name": "Jetpack Joyride" },
                { "name": "Pou" },
                { "name": "Slither.io" },
                { "name": "Geometry Dash" },
                { "name": "Minion Rush" },
                { "name": "Talking Tom cat" },
                { "name": "My Talking Angela" },
                { "name": "Bike Race" },
                { "name": "Roblox" },
                { "name": "Final Fantasy IX" },
                { "name": "The Witcher 3: Wild Hunt" },
                { "name": "God of War (2018)" },
                { "name": "Hollow Knight" },
                { "name": "Celeste" },
                { "name": "Stardew Valley" },
                { "name": "The Elder Scrolls V: Skyrim" },
                { "name": "Dark Souls" },
                { "name": "Sekiro: Shadows Die Twice" },
                { "name": "Bloodborne" },
                { "name": "Metroid Dread" },
                { "name": "Hades" },
                { "name": "Portal 2" },
                { "name": "Half-Life 2" },
                { "name": "BioShock" },
                { "name": "Mass Effect 2" },
                { "name": "Dead Space" },
                { "name": "Doom Eternal" },
                { "name": "Street Fighter II" },
                { "name": "Sonic Mania" },
                { "name": "Crash Bandicoot N. Sane Trilogy" },
                { "name": "Spyro Reignited Trilogy" },
                { "name": "Persona 5" },
                { "name": "Final Fantasy VII Remake" },
                { "name": "Chrono Trigger" },
                { "name": "Metal Gear Solid" },
                { "name": "Silent Hill 2" },
                { "name": "Castlevania: Symphony of the Night" },
                { "name": "StarCraft II" },
                { "name": "Diablo II" },
                { "name": "Civilization VI" },
                { "name": "The Last of Us Part II" },
                { "name": "Ghost of Tsushima" },
                { "name": "Demon's Souls" },
                ],
            };


    // =============================================
    // ÉLÉMENTS DU DOM
    // =============================================
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('[data-page]');
    const setupPage = document.getElementById('setup-page');
    const gameScreen = document.getElementById('game-screen');
    const roundTransition = document.getElementById('round-transition');
    const resultsScreen = document.getElementById('results-screen');
    const loadingScreen = document.getElementById('loading-screen');
    const startGameBtn = document.getElementById('start-game');
    const endGameBtn = document.getElementById('end-game');
    const newGameBtn = document.getElementById('new-game');
    const nextRoundBtn = document.getElementById('next-round');
    const addTeamBtn = document.getElementById('add-team');
    const teamsContainer = document.getElementById('teams-container');
    const teamsScoreElement = document.getElementById('teams-score');
    const roundResultsElement = document.getElementById('round-results');
    const finalResultsElement = document.getElementById('final-results');
    const cardElement = document.getElementById('game-card');
    const currentCardElement = document.getElementById('current-card');
    const cardTypeBadge = document.getElementById('card-type-badge');
    const roundTypeElement = document.getElementById('round-type');
    const roundInstructionElement = document.getElementById('round-instruction');
    const currentRoundElement = document.getElementById('current-round');
    const transitionTitle = document.getElementById('transition-title');
    const transitionInfo = document.getElementById('transition-info');
    const nextTeamNameElement = document.getElementById('next-team-name');
    const cardsFoundCountElement = document.getElementById('cards-found-count');
    const currentTeamNameElement = document.getElementById('current-team-name');
    const foundCardsElement = document.getElementById('found-cards');
    const timerElement = document.getElementById('timer');
    const timerCircle = document.getElementById('timer-circle');
    const timerDurationSelect = document.getElementById('timer-duration');
    const cardsCountSelect = document.getElementById('cards-count');
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const closeMenuBtn = document.getElementById('close-menu-button');
    const mainNav = document.getElementById('main-nav');
    const modalOverlay = document.getElementById('custom-card-modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalFooter = document.getElementById('modal-footer');

    // =============================================
    // NAVIGATION
    // =============================================
    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(`${pageId}-page`)?.classList.add('active');
        mainNav.classList.remove('active');
    }
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            showPage(link.getAttribute('data-page'));
        });
    });
    mobileMenuBtn.addEventListener('click', () => mainNav.classList.add('active'));
    closeMenuBtn.addEventListener('click', () => mainNav.classList.remove('active'));
    showPage('home');

    // =============================================
    // GESTION DES MODALES
    // =============================================
    function showModal(title, body, footer) {
        modalTitle.innerHTML = title;
        modalBody.innerHTML = body;
        modalFooter.innerHTML = footer;
        modalOverlay.classList.add('active');
    }

    function hideModal() {
        modalOverlay.classList.remove('active');
    }

    // =============================================
    // CONFIGURATION DU JEU & FLUX DES CARTES PERSONNALISÉES
    // =============================================
    addTeamBtn.addEventListener('click', () => {
        if (teamsContainer.children.length < 4) {
            const teamInput = document.createElement('div');
            teamInput.className = 'team-input';
            teamInput.innerHTML = `
                <input type="text" class="input-field" placeholder="Nom de l'équipe">
                <button class="remove-team btn-danger px-3 py-2 rounded-r-lg transition"><i class="fas fa-times"></i></button>
            `;
            teamsContainer.appendChild(teamInput);
            teamInput.querySelector('.remove-team').addEventListener('click', () => {
                if (teamsContainer.children.length > 2) teamsContainer.removeChild(teamInput);
                else alert('Il faut au moins 2 équipes !');
            });
        }
    });
    document.getElementById('custom-cards-container').style.display = 'none';
    document.getElementById('add-custom-card').style.display = 'none';
    teamsContainer.innerHTML = ''; 
    addTeamBtn.click();
    addTeamBtn.click();
    teamsContainer.querySelector('input').value = 'Équipe 1';
    teamsContainer.querySelectorAll('input')[1].value = 'Équipe 2';

    startGameBtn.addEventListener('click', async () => {
        const teams = Array.from(teamsContainer.querySelectorAll('.team-input input'))
            .map(input => input.value.trim()).filter(name => name).map(name => ({ name, score: 0 }));

        if (teams.length < 2) {
            alert('Veuillez entrer un nom pour au moins 2 équipes.');
            return;
        }

        gameState.teams = teams;

        // Lire la durée sélectionnée dans le menu déroulant
        gameState.timerDuration = parseInt(timerDurationSelect.value);

        const wantsToAddCards = await promptForCustomCards();
        let customCards = [];
        if (wantsToAddCards) {
            customCards = await collectCardsFromTeams(teams);
        }

        // Logique de création de paquet
        const totalStandardCardsNeeded = parseInt(cardsCountSelect.value);
        const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.dataset.category);

        // Créer une réserve de cartes standards
        let standardCardsPool = [];
        selectedCategories.forEach(category => {
            if (sampleCards[category]) {
                standardCardsPool.push(...sampleCards[category].map(card => ({ ...card, category })));
            }
        });

        // S'assurer que les cartes standards ne sont pas des doublons des cartes personnalisées
        const customCardNames = new Set(customCards.map(c => c.name.toLowerCase()));
        const uniqueStandardCards = standardCardsPool.filter(
            card => !customCardNames.has(card.name.toLowerCase())
        );

        // Mélanger et prendre le nombre requis de cartes standards
        shuffleCards(uniqueStandardCards);
        const selectedStandardCards = uniqueStandardCards.slice(0, totalStandardCardsNeeded);

        // Combiner les cartes standards sélectionnées avec TOUTES les cartes personnalisées
        gameState.initialDeck = [...selectedStandardCards, ...customCards];

        if (gameState.initialDeck.length === 0) {
            alert('Aucune carte n\'est disponible ! Sélectionnez des catégories ou ajoutez des cartes personnalisées.');
            return;
        }

        // Mélanger le paquet final et démarrer le jeu
        shuffleCards(gameState.initialDeck);
        loadingScreen.classList.add('active');
        await new Promise(resolve => setTimeout(resolve, 500));

        startNewRound();
        loadingScreen.classList.remove('active');
        gameScreen.classList.remove('hidden');
        setupPage.classList.remove('active');
    });


    function promptForCustomCards() {
        return new Promise(resolve => {
            showModal(
                'Cartes Personnalisées',
                '<p>Voulez-vous que chaque équipe ajoute une carte personnalisée ?</p>',
                `<button id="confirm-add" class="btn-primary">Oui, ajouter</button>
                 <button id="deny-add" class="btn-secondary">Non, commencer</button>`
            );
            document.getElementById('confirm-add').onclick = () => { hideModal(); resolve(true); };
            document.getElementById('deny-add').onclick = () => { hideModal(); resolve(false); };
        });
    }

    async function collectCardsFromTeams(teams) {
        const collectedCards = [];
        const addedCardNames = new Set();

        for (const team of teams) {
            let card;
            let isDuplicate;
            do {
                isDuplicate = false;
                card = await getCardFromTeamModal(team.name);
                if (card && addedCardNames.has(card.name.toLowerCase())) {
                    alert(`La carte "${card.name}" a déjà été ajoutée. Veuillez en choisir une autre.`);
                    isDuplicate = true;
                }
            } while (isDuplicate);

            if (card) {
                collectedCards.push(card);
                addedCardNames.add(card.name.toLowerCase());
            }
        }
        return collectedCards;
    }

    function getCardFromTeamModal(teamName) {
        return new Promise(resolve => {
            showModal(
                `Au tour de l'équipe : <span class="text-yellow-400">${teamName}</span>`,
                `<div>
                    <label class="block mb-2">Catégorie</label>
                    <select id="modal-card-category" class="input-field w-full mb-4">
                        <option value="films">Film</option>
                        <option value="series">Série</option>
                        <option value="acteurs">Acteur</option>
                        <option value="personnages">Personnage</option>
                        <option value="dessinsAnimes">Dessin Animé</option>
                        <option value="jeuxVideo">Jeu Vidéo</option>
                    </select>
                    <label class="block mb-2">Nom de la carte</label>
                    <input id="modal-card-name" type="text" class="input-field w-full" placeholder="Ex: Indiana Jones">
                </div>`,
                `<button id="submit-card" class="btn-primary">Ajouter et passer à la suite</button>`
            );
            const nameInput = document.getElementById('modal-card-name');
            nameInput.focus();
            
            const submitButton = document.getElementById('submit-card');
            const handleSubmit = () => {
                const category = document.getElementById('modal-card-category').value;
                const name = nameInput.value.trim();
                if (!name) {
                    alert('Veuillez entrer un nom pour la carte.');
                    return;
                }
                hideModal();
                resolve({ name, category });
            };
            submitButton.onclick = handleSubmit;
            nameInput.onkeydown = (e) => { if(e.key === 'Enter') handleSubmit(); };
        });
    }

    // =============================================
    // LOGIQUE DE JEU PRINCIPALE
    // =============================================
    function startNewRound() {
        gameState.roundDeck = [...gameState.initialDeck];
        shuffleCards(gameState.roundDeck);
        startTurn();
    }

    function startTurn() {
        gameState.scoreThisTurn = 0;
        gameState.foundCardsThisTurn = [];
        gameState.passedDeck = [];
        gameState.turnDeck = [...gameState.roundDeck];
        
        updateTeamsScoreDisplay();
        updateFoundCardsDisplay();

        currentTeamNameElement.textContent = gameState.teams[gameState.currentTeam].name;
        currentRoundElement.textContent = `${gameState.round}/${gameState.maxRounds}`;
        const roundInfo = gameState.roundTypes[gameState.round - 1];
        roundTypeElement.textContent = `Manche ${gameState.round} - ${roundInfo.name}`;
        roundInstructionElement.textContent = roundInfo.instruction;
        
        resetTimer();
        startTimer();
        drawNextCard();
    }

    function drawNextCard() {
        if (gameState.isAnimating) return;
        if (gameState.turnDeck.length === 0) {
            if (gameState.passedDeck.length > 0) {
                gameState.turnDeck = [...gameState.passedDeck];
                gameState.passedDeck = [];
                shuffleCards(gameState.turnDeck);
            } else {
                endTurn(true);
                return;
            }
        }

        gameState.isAnimating = true;
        gameState.currentCard = gameState.turnDeck.pop();
        const category = getCardCategory(gameState.currentCard);

        // Obtenez la couleur de la catégorie
        const categoryColor = getCategoryColor(category);

        // Appliquez la couleur de la catégorie au cercle du timer
        const timerCircle = document.getElementById('timer-circle');
        timerCircle.style.stroke = categoryColor;

        const cardBack = cardElement.querySelector('.card-back .back-card-content');
        cardBack.querySelector('.card-category').textContent = category;
        cardBack.querySelector('.card-category').style.color = categoryColor;
        cardElement.classList.add('card-flipped');

        setTimeout(() => {
            currentCardElement.textContent = gameState.currentCard.name;
            cardTypeBadge.textContent = category;
            cardTypeBadge.style.backgroundColor = categoryColor;
            cardElement.classList.remove('card-flipped');
            setTimeout(() => { gameState.isAnimating = false; }, 400);
        }, 800);
    }

    function handleCardSuccess() {
        if (gameState.isAnimating || !gameState.currentCard) return;

        gameState.teams[gameState.currentTeam].score++;
        gameState.scoreThisTurn++;
        gameState.foundCardsThisTurn.push(gameState.currentCard);
        
        const cardName = gameState.currentCard.name;
        gameState.roundDeck = gameState.roundDeck.filter(c => c.name !== cardName);

        updateTeamsScoreDisplay();
        updateFoundCardsDisplay();
        
        gameState.currentCard = null;
        drawNextCard();
    }

    function handleCardSkip() {
        if (gameState.isAnimating || !gameState.currentCard) return;
        gameState.passedDeck.push(gameState.currentCard);
        gameState.currentCard = null;
        drawNextCard();
    }

    function endTurn(allCardsFound = false) {
        resetTimer();
        const lastTeamIndex = gameState.currentTeam;
        
        if (!allCardsFound) {
            gameState.currentTeam = (gameState.currentTeam + 1) % gameState.teams.length;
        }
        
        updateRoundResultsDisplay(lastTeamIndex);
        
        if (allCardsFound) {
            transitionTitle.textContent = `Manche ${gameState.round} terminée !`;
            transitionInfo.style.display = 'none';
            
            gameState.round++;
            if (gameState.round > gameState.maxRounds) {
                nextRoundBtn.textContent = 'Voir les résultats';
                nextRoundBtn.onclick = endGame;
            } else {
                nextRoundBtn.textContent = `Commencer la Manche ${gameState.round}`;
                nextRoundBtn.onclick = () => {
                    roundTransition.classList.add('hidden');
                    gameScreen.classList.remove('hidden');
                    startNewRound();
                };
            }
        } else {
            transitionTitle.textContent = `Fin du tour de ${gameState.teams[lastTeamIndex].name}`;
            transitionInfo.style.display = 'block';
            nextRoundBtn.textContent = 'Tour Suivant';
            nextRoundBtn.onclick = () => {
                roundTransition.classList.add('hidden');
                gameScreen.classList.remove('hidden');
                startTurn();
            };
        }
        
        gameScreen.classList.add('hidden');
        roundTransition.classList.remove('hidden');
    }

    function endGame() {
        resetTimer();
        gameScreen.classList.add('hidden');
        roundTransition.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        updateFinalResultsDisplay();
    }

    // =============================================
    // FONCTIONS UTILITAIRES & UI
    // =============================================
    function shuffleCards(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startTimer() {
        let timeLeft = gameState.timerDuration;
        timerElement.textContent = timeLeft;
        const circumference = 2 * Math.PI * 45;
        timerCircle.style.strokeDasharray = circumference;
        timerCircle.style.strokeDashoffset = 0;
        timerCircle.style.stroke = '#f59e0b';
        
        gameState.timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            const offset = circumference - (timeLeft / gameState.timerDuration) * circumference;
            timerCircle.style.strokeDashoffset = offset;
            

            
            if (timeLeft <= 0) {
                endTurn();
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(gameState.timerInterval);
    }

    function getCardCategory(card) {
        const cat = card.category;
        switch(cat) {
            case 'films':
                return 'FILM';
            case 'series':
                return 'SÉRIE';
            case 'acteurs':
                return 'ACTEUR';
            case 'personnages':
                return 'PERSONNAGE';
            case 'dessinsAnimes':
                return 'DESSIN ANIMÉ';
            case 'jeuxVideo':
                return 'JEU VIDÉO';
            default:
                return cat ? cat.toUpperCase() : "INCONNU";
        }
    }

    function getCategoryColor(category) {
        switch(category.toLowerCase()) {
            case 'film':
                return 'var(--film-color)';
            case 'série':
                return 'var(--serie-color)';
            case 'acteur':
                return 'var(--acteur-color)';
            case 'personnage':
                return 'var(--personnage-color)';
            case 'dessin animé':
                return 'var(--dessin-anime-color)';
            case 'jeu vidéo':
                return 'var(--jeu-video-color)';
            default:
                return '#6b7280';
        }
    }

    function updateTeamsScoreDisplay() {
        teamsScoreElement.innerHTML = '';
        gameState.teams.forEach((team, index) => {
            const teamElement = document.createElement('div');
            teamElement.className = `flex items-center space-x-2 p-1 rounded ${index === gameState.currentTeam ? 'bg-yellow-500/20 text-yellow-400' : 'text-gray-400'}`;
            teamElement.innerHTML = `<span class="font-bold">${team.name}:</span><span class="text-lg">${team.score}</span>`;
            teamsScoreElement.appendChild(teamElement);
        });
    }

    function updateFoundCardsDisplay() {
        foundCardsElement.innerHTML = '';
        gameState.foundCardsThisTurn.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'found-card';
            cardElement.textContent = card.name;
            foundCardsElement.appendChild(cardElement);
        });
    }

    function updateRoundResultsDisplay(lastTeamIndex) {
        roundResultsElement.innerHTML = '';
        const sortedTeams = [...gameState.teams].sort((a, b) => b.score - a.score);
        sortedTeams.forEach(team => {
            const isLastPlayer = gameState.teams.findIndex(t => t.name === team.name) === lastTeamIndex;
            const teamElement = document.createElement('div');
            teamElement.className = `bg-gray-700 rounded-lg p-4 text-left ${isLastPlayer ? 'border-l-4 border-yellow-400' : ''}`;
            teamElement.innerHTML = `
                <h3 class="text-lg font-bold">${team.name}</h3>
                <div class="text-2xl font-bold ${isLastPlayer ? 'text-yellow-400' : ''}">${team.score} points</div>`;
            roundResultsElement.appendChild(teamElement);
        });
        cardsFoundCountElement.textContent = gameState.scoreThisTurn;
        nextTeamNameElement.textContent = gameState.teams[gameState.currentTeam].name;
    }

    function updateFinalResultsDisplay() {
        const sortedTeams = [...gameState.teams].sort((a, b) => b.score - a.score);
        finalResultsElement.innerHTML = '';
        sortedTeams.forEach((team, index) => {
            const teamElement = document.createElement('div');
            teamElement.className = `bg-gray-700 rounded-lg p-4 ${index === 0 ? 'border-2 border-yellow-400' : ''}`;
            teamElement.innerHTML = `
                <div class="flex justify-between items-center">
                    <div>
                        <h3 class="text-lg font-bold">${index + 1}. ${team.name}</h3>
                        <div class="text-2xl font-bold ${index === 0 ? 'text-yellow-400' : ''}">${team.score} points</div>
                    </div>
                    ${index === 0 ? '<div class="text-yellow-400 text-2xl"><i class="fas fa-trophy"></i></div>' : ''}
                </div>`;
            finalResultsElement.appendChild(teamElement);
        });
    }
    document.getElementById('theme-toggle').addEventListener('change', function() {
    document.body.classList.toggle('light-mode');
    });
    // =============================================
    // GESTION DES ÉVÉNEMENTS
    // =============================================
    document.querySelectorAll('.success-btn').forEach(btn => btn.addEventListener('click', handleCardSuccess));
    document.querySelectorAll('.skip-btn').forEach(btn => btn.addEventListener('click', handleCardSkip));
    
    endGameBtn.addEventListener('click', () => {
        if (confirm("Êtes-vous sûr de vouloir arrêter la partie ?")) endGame();
    });

    newGameBtn.addEventListener('click', () => {
        window.location.reload();
    });

    document.addEventListener('keydown', (e) => {
        if (!gameScreen.classList.contains('hidden') && !gameState.isAnimating) {
            if (e.code === 'ArrowRight' || e.code === 'Space') {
                e.preventDefault();
                handleCardSuccess();
            } else if (e.code === 'ArrowLeft') {
                e.preventDefault();
                handleCardSkip();
            }
        }
    });
});