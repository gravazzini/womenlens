//* Pronto -> finito e commentato

// Chart: occupations over the decades -> functions
const initDecadesOccupations = async (occupations = []) => {
    // Global variables reset
    decadesOccupations = {};

    // Global variables initialization
    occupations.forEach(occupation => {
        decadesOccupations[occupation] = {};

        for (let i=minDecade; i<=maxDecade; i+=10){
            decadesOccupations[occupation][i] = 0;
        }
    });

    await calculateDecadesOccupations(occupations);
}

const calculateDecadesOccupations = async (occupations = []) => {
    // Calculate decades occupations
    occupations.forEach(occupation => {
        for (let i=minDecade; i<=maxDecade; i+=10){
            dataSet.forEach(ph => {
                if (ph.getOccupations().includes(occupation) && ph.getBirthDecade() <= i && ph.getDeathDecade() >= i){
                    decadesOccupations[occupation][i]++;
                }
            });
        }
    });
}

const getChartDatasets = async () => {
    // Global variables reset
    let datasets = [];

    // Counter for colors
    let colCounter = 0;

    // Data calculation
    for (let occupation in decadesOccupations){
        let data = [];

        for (let decade in decadesOccupations[occupation]){
            data.push(decadesOccupations[occupation][decade]);
        }

        let colorBG = graphBackgroundColor[colCounter%17];
        let colorBorder = graphBorderColor[colCounter%17];
        colCounter++;

        if (debug)
            console.log('colorBG: ', colorBG);

        datasets.push({
            label: occupation,
            data: data,
            fill: false,
            backgroundColor: colorBG,
            borderColor: colorBorder,
            pointBackgroundColor: '#fff',
            borderWidth: 1,
            tension: 0.25
        });
    }

    return datasets;
}

const createOccupationsDecadesChart = async (occupations = []) => {
    // Get the context of the canvas
    const ctx = document.getElementById('occupationsChart').getContext('2d');

    // Variable initialization
    let decadesLabels = [];
    for (let i=minDecade; i<=maxDecade; i+=10){
        decadesLabels.push(i);
    }

    // Create the chart
    occupationsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: decadesLabels,
            datasets: await getChartDatasets()
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Occupations over the decades'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: "#a6a6a6"
                    }
                },
                x: {
                    beginAtZero: true,
                    grid: {
                        color: "#a6a6a6"
                    }
                }
            },
            radius: 3,
            hitRadius: 6,
            hoverRadius: 6,
            responsive: true,
        }
    });
}

const updateOccupationsDecadesChart = async (occupations = []) => {
await initDecadesOccupations(occupations);

occupationsChart.data.datasets = await getChartDatasets();
occupationsChart.update();
}

// Bottoni per il cambio delle occupazioni nel grafico (occupations-decades)
const buttonListener = async () => {
    document.getElementById('ArchitectureSculpture-button').addEventListener('click', async (e) => {
        e.preventDefault();
    
        await updateOccupationsDecadesChart(occupationsGroups.architectureSculpture);
    });
    
    document.getElementById('VisualArt-button').addEventListener('click', async (e) => {
        e.preventDefault();
    
        await updateOccupationsDecadesChart(occupationsGroups.visualArt);
    });
    
    document.getElementById('Literature-button').addEventListener('click', async (e) => {
        e.preventDefault();
    
        await updateOccupationsDecadesChart(occupationsGroups.literature);
    });
    
    document.getElementById('CinemaMusicTheatre-button').addEventListener('click', async (e) => {
        e.preventDefault();
    
        await updateOccupationsDecadesChart(occupationsGroups.cinemaMusicTheatre);
    });
    
    document.getElementById('MediaArt-button').addEventListener('click', async (e) => {
        e.preventDefault();
    
        await updateOccupationsDecadesChart(occupationsGroups.mediaArt);
    });
    
    document.getElementById('NonArtistic-button').addEventListener('click', async (e) => {
        e.preventDefault();
    
        await updateOccupationsDecadesChart(occupationsGroups.nonArtistic);
    });
}