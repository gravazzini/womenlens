//* Pronto -> finito e commentato

// Chart: occupations over the countries -> functions
const initOccupationsCountries = async () => {
    // Reset the global occupations variables
    countriesOccupations = {};

    // Get the occupations and setup the countriesOccupations object
    for(let i=0; i<selectedCountries.length; i++){
        let actCountry = selectedCountries[i];

        countriesOccupations[actCountry] = {};

        for (let occupationId in selectedOccupations){
            let actOccupation = selectedOccupations[occupationId];

            countriesOccupations[actCountry][actOccupation] = 0;
        }
    }

    // Calculate the number of occupations in the countries
    for(let i=0; i<dataSet.length; i++){
        let actPh = dataSet[i];

        if (actPh.getCountry() in countriesOccupations){
            for (let occupationId in selectedOccupations){
                let actOccupation = selectedOccupations[occupationId];

                if (actPh.getOccupations().includes(actOccupation)){
                    countriesOccupations[actPh.getCountry()][actOccupation]++;
                }
            }
        }
    }

    // Counter for the colors and the datasets
    let counter = 0;
    let datasets = [];

    // Setup the datasets and the colors
    for (let occupation in selectedOccupations){
        let graphData = {};

        let occupationName = selectedOccupations[occupation];

        graphData['label'] = occupationName;
        graphData['backgroundColor'] = graphBackgroundColor[counter%17];
        graphData['borderColor'] = graphBorderColor[counter%17];
        graphData['borderWidth'] = 1

        counter++;

        graphData['data'] = [];

        for (let it in selectedCountries){
            let actCountry = selectedCountries[it];

            graphData['data'].push(countriesOccupations[actCountry][occupationName]);
        }
        datasets.push(graphData);
    }

    //console.log(countriesOccupations);
    //console.log(datasets);

    await createOccupationsCountriesChart(datasets);
}

const createOccupationsCountriesChart = async (myDataset = []) => {
    // Get the canvas context
    const ctx = document.getElementById('occupationsCountriesChart').getContext('2d');

    // Create the chart
    countriesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: selectedCountries,
            datasets: myDataset
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Occupations over the countries'
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