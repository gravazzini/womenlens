// Reading data
const initNames = async (csvUrl = './dataset/Country.csv') => {
    // Reset globals
    dataSet = [];

    // Read data
    const data = await (await fetch(csvUrl)).text();

    // Split data csv
    var allRows = data.split(/\r?\n|\r/);

    // Add data to dataSet
    for (let i=1; i<allRows.length; i++) {
        var rowCells = allRows[i].split(',');

        let phLink = rowCells[0];
        let name = rowCells[1];
        let cLink = rowCells[2];
        let country = rowCells[3];

        let dataToInsert = new photographerData(name);

        dataSet.push(dataToInsert);
    }
}

const readCountry = async (csvUrl = './dataset/Country.csv') => { // CSV: item,itemLabel,birthCountry,birthCountryLabel
    // Read data
    const data = await (await fetch(csvUrl)).text();

    // Split data csv
    var allRows = data.split(/\r?\n|\r/);

    // Add data to dataSet
    for (let i=1; i<allRows.length; i++) {
        var rowCells = allRows[i].split(',');

        let phLink = rowCells[0];
        let name = rowCells[1];
        let cLink = rowCells[2];
        let country = rowCells[3];

        let objIndex = dataSet.findIndex((ph => ph.name == name));

        if (objIndex != -1){
            dataSet[objIndex].setCountry(country);
            dataSet[objIndex].setPhLink(phLink);
            dataSet[objIndex].setCLink(cLink);
        }
        else throw new Error('ReadCountry -> indice non trovato ' + name)
    }
}

const readOccupations = async (csvUrl = './dataset/Occupations.csv') => { // CSV: item,itemLabel,parallelOccupation,occupationLabel
    // Read data
    const data = await (await fetch(csvUrl)).text();

    // Split data csv
    var allRows = data.split(/\r?\n|\r/);

    // Add data to dataSet
    for (let i=1; i<allRows.length; i++) {
        var rowCells = allRows[i].split(',');

        let phLink = rowCells[0];
        let name = rowCells[1];
        let ocLinks = rowCells[2];
        let occupations = rowCells[3];

        let objIndex = dataSet.findIndex((ph => ph.name == name));

        if (objIndex != -1){

            occupations = occupations.split('; ');

            dataSet[objIndex].setOccupations(occupations);
        }
        else throw new Error('ReadOccupations -> indice non trovato ' + name);
    }
}

const readTimeline = async (csvUrl = './dataset/Timeline.csv') => { // CSV: item,itemLabel,birthDate,deathDate
    // Read data
    const data = await (await fetch(csvUrl)).text();
    
    // Split data csv
    var allRows = data.split(/\r?\n|\r/);

    // Add data to dataSet
    for (let i=1; i<allRows.length; i++) {
        var rowCells = allRows[i].split(',');

        let phLink = rowCells[0];
        let name = rowCells[1];
        let birthDate = rowCells[2];
        let deathDate = rowCells[3];
        let type = rowCells[4];

        let objIndex = dataSet.findIndex((ph => ph.name == name));

        if (objIndex != -1){
            dataSet[objIndex].setBirthDate(birthDate);
            dataSet[objIndex].setDeathDate(deathDate);

            dataSet[objIndex].setType(type);

            let bYear = birthDate.split('/');
            let dYear = deathDate.split('/');

            if (deathDate === '01/05/2022'){
                dataSet[objIndex].setDeathDecade(2020);
                maxDecade = 2020;
            }
            else{
                dataSet[objIndex].setDeathDecade(parseInt(dYear[2]/10)*10);

                maxDecade = Math.max(maxDecade, dataSet[objIndex].getDeathDecade());
            }

            dataSet[objIndex].setBirthDecade(parseInt(bYear[2]/10)*10);

            minDecade = Math.min(minDecade, dataSet[objIndex].getBirthDecade());
        }
        else throw new Error('ReadTimeline -> indice non trovato ' + name);
    }
}

// Main
document.addEventListener('DOMContentLoaded', async () => {

    Chart.defaults.color = "#fff";
    
    // Data reading
    await initNames(urlCountry);

    await readCountry(urlCountry);
    await readOccupations(urlOccupations);
    await readTimeline(urlTimeLine);
    
    if (debug) {
        console.log('dataSet: ', dataSet);
    }

    // Occupations Countries creating chart
    await initOccupationsCountries();

});
