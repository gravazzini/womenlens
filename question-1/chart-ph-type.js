//* Pronto -> finito e commentato

// Chart: phType -> functions
const initPhType = async () => {
    // Variable initialization
    let phType = {};

    // Data calculation
    for(let i=0; i<dataSet.length; i++){
        let actPh = dataSet[i];

        if (actPh.getType() in phType){
            phType[actPh.getType()]++;
        }
        else phType[actPh.getType()] = 1;
    }

    if (debug)
        console.log('phType', phType);

    await createPhTypeChart(phType);
}

const createPhTypeChart = async (phType = {}) => {
    // Get the canvas context
    const ctx = document.getElementById('phTypeChart').getContext('2d');

    // Create the chart
    phTypeChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(phType),
            datasets: [{
                label: 'number of photographers for type',
                data: Object.values(phType),
                backgroundColor: graphBackgroundColor,
                borderColor: graphBorderColor,
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Photographers type'
                }
            },
            onClick(e){
                // TODO event handling per grafico a torta
                console.log(e);
            }
        }
    });
}