//* Pronto -> finito e commentato

// Dataset photographer
var dataSet = new Array();
const debug = false;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Chart: occupations over the decades
var occupationsChart;

var minDecade = 2020;
var maxDecade = 0;
var decadesOccupations = {};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Occupations divised by groups
const occupationsGroups = {
    architectureSculpture : [
        'architect', 
        'architectural photographer', 
        'urban planner', 
        'sculptor',
        'industrial designer'
    ],
    visualArt : [
        'illustrator', 
        'painter', 
        'drawer', 
        'designer', 
        'graphic designer', 
        'graphic artist', 
        'visual artist', 
        'collagist', 
        'installation artist', 
        'conceptual artist',
        'textile artist',
        'glass artist',
        'fashion designer'
    ],
    literature : [
        'writer', 
        'poet', 
        'literary critic', 
        'novelist', 
        'autobiographer', 
        'diarist', 
        'biographer'
    ],
    cinemaMusicTheatre : [
        'film actress', 
        'cinematographer', 
        'camera operator', 
        'filmmaker', 
        'film director', 
        'director', 
        'film editor', 
        'screenwriter', 
        'film producer', 
        'actress', 
        'stage actress', 
        'choreographer', 
        'ballet dancer', 
        'singer'
    ],
    mediaArt : [
        'photojournalist',
        'war photographer',
        'portrait photographer',
        'fashion photographer',
        'television producer',
        'multi-media artist',
        'music video director',
        'installation artist',
        'conceptual artist'
    ],
    nonArtistic : [
        'botanist',
        'model',
        'journalist',
        'activist',
        'teacher',
        'hatter',
        'oceanographer',
        'wet nurse',
        'resistance fighter',
        'anthropologist',
        'feminist',
        'business woman',
        'politician',
        'editor',
        'spy',
        'printmaker',
        'translator'
    ]
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Full list of occupations
var allOccupations = [
    'writer', 
    'illustrator', 
    'botanical collector', 
    'botanist', 
    'courtesan', 
    'artist', 
    'model', 
    'painter', 
    'photojournalist', 
    'journalist', 
    'architectural photographer', 
    'war photographer', 
    'portrait photographer', 
    'fashion photographer', 
    'actress', 
    'stage actress', 
    'film actress', 
    'activist', 
    'teacher', 
    'opinion journalist', 
    'architect', 
    'urban planner', 
    'drawer', 
    'university teacher', 
    'designer', 
    'resistance fighter', 
    'art dealer', 
    'graphic designer', 
    'illustartor', 
    'graphic artist', 
    'textile artist', 
    'sculptor', 
    'industrial designer', 
    'spy', 
    'literary critic', 
    'novelist', 
    'autobiographer', 
    'poet', 
    'choreographer', 
    'documentarian', 
    'war correspondent', 
    'glass artist', 
    'printmaker', 
    'translator', 
    'cinematographer', 
    'camera operator', 
    'filmmaker', 
    'editor', 
    'film director', 
    'director', 
    'fashion designer', 
    'film editor', 
    'singer', 
    'hatter', 
    'screenwriter', 
    'oceanographer', 
    'diarist', 
    'wet nurse', 
    'French Resistance fighter', 
    'anthropologist', 
    'feminist', 
    'ballet dancer', 
    'visual artist', 
    'business woman', 
    'politician', 
    'publisher', 
    'fashion editor', 
    'collagist', 
    'multi-media artist', 
    'biographer', 
    'installation artist', 
    'conceptual artist', 
    'video artist', 
    'television producer', 
    'exhibition curator', 
    'performance artist', 
    'art theorist', 
    'video installation artist', 
    'music video director', 
    'pedagogue', 
    'film producer', 
    'actor'
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Chart: countries
var countriesChart;

var countries = {};
var countriesLabels = [];
var countriesValues = [];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Chart: occupations over the countries
var occupationsCountriesChart;

var countriesOccupations = {}

const selectedCountries = [
    'United States of America',
    'France',
    'Germany',
    'United Kingdom'
];

const selectedOccupations = [
    'architectural photographer',
    'sculptor',
    'writer',
    'painter',
    'film director',
    'photojournalist',
    'model',
    'war photographer',
    'screenwriter',
    'visual artist',
    'teacher',
    'printmaker',
    'journalist'
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Chart: cake
var phTypeChart;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Link API
const urlTimeLine = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQsRkWcOsiueCplEVwhyWjtVqUHvG94knzINrD5-pgrzcO31_anwLXhDzBN-Lgy9NzqEbzX7ei66X6L/pub?gid=0&single=true&output=csv';
const urlCountry = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQsRkWcOsiueCplEVwhyWjtVqUHvG94knzINrD5-pgrzcO31_anwLXhDzBN-Lgy9NzqEbzX7ei66X6L/pub?gid=1905568726&single=true&output=csv';
const urlOccupations = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQsRkWcOsiueCplEVwhyWjtVqUHvG94knzINrD5-pgrzcO31_anwLXhDzBN-Lgy9NzqEbzX7ei66X6L/pub?gid=1144740092&single=true&output=csv';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Colors (17)
const graphBackgroundColor = [
    'rgba(251, 80, 18, 0.6)',
    'rgba(1, 253, 246, 0.6)',
    'rgba(203, 186, 237, 0.6)',
    'rgba(233, 223, 0, 0.6)',
    'rgba(3, 252, 186, 0.6)',
    'rgba(150, 189, 198, 0.6)',
    'rgba(129, 150, 143, 0.6)',
    'rgba(232, 204, 191, 0.6)',
    'rgba(42, 42, 114, 0.6)',
    'rgba(233, 214, 236, 0.6)',
    'rgba(233, 128, 110, 0.6)',
    'rgba(197, 155, 118, 0.6)',
    'rgba(120, 188, 97, 0.6)',
    'rgba(192, 199, 129, 0.6)',
    'rgba(255, 172, 228, 0.6)',
    'rgba(236, 78, 32, 0.6)',
    'rgba(138, 79, 125, 0.6)'
];

const graphBorderColor = [
    'rgba(251, 80, 18, 1)',
    'rgba(1, 253, 246, 1)',
    'rgba(203, 186, 237, 1)',
    'rgba(233, 223, 0, 1)',
    'rgba(3, 252, 186, 1)',
    'rgba(150, 189, 198, 1)',
    'rgba(129, 150, 143, 1)',
    'rgba(232, 204, 191, 1)',
    'rgba(42, 42, 114, 1)',
    'rgba(233, 214, 236, 1)',
    'rgba(233, 128, 110, 1)',
    'rgba(197, 155, 118, 1)',
    'rgba(120, 188, 97, 1)',
    'rgba(192, 199, 129, 1)',
    'rgba(255, 172, 228, 1)',
    'rgba(236, 78, 32, 1)',
    'rgba(138, 79, 125, 1)'
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Photographer class
class photographerData {
    constructor(name = '', country = '', occupations = [], birthDate = '', deathDate = '', phLink = '', cLink = '', birthDecade = '', deathDecade = '', type = '') {
        this.name = name;
        this.country = country;
        this.occupations = occupations;
        this.birthDate = birthDate;
        this.deathDate = deathDate;
        this.phLink = phLink;
        this.cLink = cLink;
        this.birthDecade = birthDecade;
        this.deathDecade = deathDecade;
        this.type = type;
    }

    // Set methods
    setName(name) {
        this.name = name;
    }

    setCountry(country) {
        this.country = country;
    }

    setOccupations(occupations) {
        this.occupations = occupations;
    }

    setBirthDate(birthDate) {
        this.birthDate = birthDate;
    }

    setDeathDate(deathDate) {
        this.deathDate = deathDate;
    }

    setPhLink(phLink) {
        this.phLink = phLink;
    }

    setCLink(cLink) {
        this.cLink = cLink;
    }

    setBirthDecade(birthDecade) {
        this.birthDecade = birthDecade;
    }

    setDeathDecade(deathDecade) {
        this.deathDecade = deathDecade;
    }

    setType(type) {
        this.type = type;
    }

    // Get methods
    getName() {
        return this.name;
    }

    getCountry() {
        return this.country;
    }

    getOccupations() {
        return this.occupations;
    }

    getBirthDate() {
        return this.birthDate;
    }

    getDeathDate() {
        return this.deathDate;
    }

    getPhLink() {
        return this.phLink;
    }

    getBirthDecade() {
        return this.birthDecade;
    }

    getDeathDecade() {
        return this.deathDecade;
    }

    getType() {
        return this.type;
    }

}