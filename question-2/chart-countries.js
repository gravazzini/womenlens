//* Pronto -> finito e commentato

// Chart: countries -> functions
const initCountries = async () => {
    // Reset the global countries variables
    countries = {};
    countriesLabels = [];
    countriesValues = [];
    
    // Get the countries
    for(let i=0; i<dataSet.length; i++){
        let country = dataSet[i].getCountry();

        if (country in countries){
            countries[country]++;
        }
        else countries[country] = 1;
    }

    // Get the labels and values
    Object.entries(countries).forEach(([key, value]) => {
        countriesLabels.push(key);
        countriesValues.push(value);
    });

    if (debug)
        console.log('countries: ', countries);

    // Create the chart
    await createCountriesChart();
}

const createCountriesChart = async () => {
    // Get the canvas context
    const ctx = document.getElementById('countriesChart').getContext('2d');
    // TODO Colori grafico
    // Create the chart
    countriesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: countriesLabels,
            datasets: [{
                label: 'photographers',
                data: countriesValues,
                backgroundColor: graphBackgroundColor,
                borderColor: graphBorderColor,
                borderWidth: 1,
                z: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Photographers by country'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#a6a6a6'
                    }
                },
                x: {
                    beginAtZero: true,
                    grid: {
                        color: '#a6a6a6'
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