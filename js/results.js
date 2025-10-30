async function getData(){
    const response = await fetch('../data/data.csv');    // .. to move up one level in folder structure
    const data = await response.text();                  // CSV to TEXT format
    console.log(data);

    const xTrials = [];                 // x-axis trial numbers
    const yTrainingLoss = [];           // y-axis training loss values
    const yValidationLoss = [];         // y-axis validation loss values
    const yTrainingAccuracy = [];       // y-axis training accuracy values
    const yValidationAccuracy = [];     // y-axis validation accuracy values

    const table = data.split('\n').slice(1); // split by line and remove first row
    console.log(table);

    table.forEach(row => { 
        const columns = row.split(',');
        const trial = parseInt(columns[0]);         // assign trial value
        xTrials.push(trial)                         // push trial numebr into array
        
        const trainingLoss = parseFloat(columns[1]);        // convert training loss to float
        yTrainingLoss.push(trainingLoss)                    // push training loss values to array

        const validationLoss = parseFloat(columns[2]);      // convert validation loss to float
        yValidationLoss.push(validationLoss)                // push validation loss values to array

        const trainingAcc = parseFloat(columns[3]);         // convert training accuracy temp to float
        yTrainingAccuracy.push(trainingAcc)                 // push training accuracy values to array

        const validationAcc = parseFloat(columns[4]);       // convert validation accuracy temp to float
        yValidationAccuracy.push(validationAcc)             // push validation accuracy values to array
    
        console.log(trial, trainingLoss, validationLoss, trainingAcc, validationAcc);
    });

    return {xTrials, yTrainingLoss, yValidationLoss, yTrainingAccuracy, yValidationAccuracy};    // curly braces to return multiple values as a single object

}

async function createAccuracyChart(){
    const data = await getData();
    const lineChart = document.getElementById('accuracyChart');
    const accuracyChart = new Chart(lineChart, {  // Construct the accuracy chart    
        type: 'line',
        data: {                         // Define data
            labels: data.xTrials,       // x-axis labels
            datasets: [                 // Each object describes one dataset of y-values
                                        //  including display properties.  To add more datasets, 
                                        //  place a comma after the closing curly brace of the last
                                        //  data set object and add another dataset object. 
                {
                    label:    `Model Training Accuracy`,     // Dataset label for legend
                    data:     data.yTrainingAccuracy,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(0, 0, 255, 0.2)',    // Color for data marker
                    borderColor:      'rgba(0, 0, 255, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },{
                    label:    `Model Validation Accuracy`,     // Dataset label for legend
                    data:     data.yValidationAccuracy,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(0, 127, 255, 0.2)',    // Color for data marker
                    borderColor:      'rgba(0, 127, 255, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
        ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Trial',     // x-axis title
                        font: {                   // font properties
                            size: 14
                        },
                    },
                    ticks: {                      // x-axis tick mark properties   
                        font: {
                            size: 14  
                        }
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,                          
                        text: `Accuracy`,     // y-axis title
                        font: {
                            size: 14
                        },
                    },
                    ticks: {
                        min: 0,                   
                        maxTicksLimit: data.yTrainingAccuracy.length/2,        // Actual value can be set dynamically
                        font: {
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                    
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Model Accuracy Graph',
                    font: {
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            }
        }       
    });

}

async function createLossChart(){
    const data = await getData();
    const lineChart = document.getElementById('lossChart');
    const lossChart = new Chart(lineChart, {  // Construct the loss chart    
        type: 'line',
        data: {                         // Define data
            labels: data.xTrials,        // x-axis labels
            datasets: [                 // Each object describes one dataset of y-values
                                        //  including display properties.  To add more datasets, 
                                        //  place a comma after the closing curly brace of the last
                                        //  data set object and add another dataset object. 
                {
                    label:    `Model Training Loss`,     // Dataset label for legend
                    data:     data.yTrainingLoss,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(255, 0, 0, 0.2)',    // Color for data marker
                    borderColor:      'rgba(255, 0, 0, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },{
                    label:    `Model Validation Loss`,     // Dataset label for legend
                    data:     data.yValidationLoss,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(100, 0, 0, 0.2)',    // Color for data marker
                    borderColor:      'rgba(100, 0, 0, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
        ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Trial',     // x-axis title
                        font: {                   // font properties
                            size: 14
                        },
                    },
                    ticks: {                      // x-axis tick mark properties   
                        font: {
                            size: 14  
                        }
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,                          
                        text: `Loss`,     // y-axis title
                        font: {
                            size: 14
                        },
                    },
                    ticks: {
                        min: 0,                   
                        maxTicksLimit: data.yTrainingLoss.length/2,        // Actual value can be set dynamically
                        font: {
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                    
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Model Loss Graph',
                    font: {
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            }
        }       
    });

}

createAccuracyChart()
createLossChart()