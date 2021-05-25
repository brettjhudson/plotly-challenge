function chartLoad(id) {

    console.log(id)

    

    d3.json("samples.json").then((data) => {

        console.log(data);

    // Get data ready for bar plot

        var selectedData = data.samples.filter(obj => obj.id == id)

        selectedData = selectedData[0]

        console.log(selectedData);

        var otuids = selectedData.otu_ids
        var samplevalues = selectedData.sample_values;
        var otulabels = selectedData.otu_labels;

        // var mapOtu = otuids.map(x => `OTU ${x}`);;

        //console.log(mapOtu)


        console.log(otuids);
        console.log(samplevalues);
        console.log(otulabels);
    
    // BUILD BAR CHART

    // Create bar trace

        var traceBar = {
            x: samplevalues.slice(0, 10).reverse(),
            y: otuids.slice(0, 10)
            .map(x => `OTU ${x}`)
            .reverse(),
            type: "bar",
            text: otulabels.slice(0,10).reverse(),
            orientation: "h"
        };

    // Create the data array for bar plot
        var dataBar = [traceBar];

    // Define bar plot layout
        var layout = {
        title: "OTU Frequency",
        xaxis: { title: "Frequency" },
        yaxis: { title: "OTU"}
        };

    // Plot the bar chart 
        Plotly.newPlot("bar", dataBar, layout);


    // BUILD BUBBLE CHART
        
    
        // Create bubble trace

        var traceBub = {
            x: otuids,
            y: samplevalues,
            mode: "markers",
            text: otulabels,
            marker: {
                color: otuids,
                opacity: [1, 0.8, 0.6, 0.4],
                size: samplevalues
            }
        };
            
    // Create the data array for bubble plot
        var dataBub = [traceBub];

    // Define bubble plot layout
        var layoutBub = {
        title: "OTU Bubble",
        xaxis: { title: "OTU ID" },
        yaxis: { title: ""}
        };

    // Plot the bubble chart 
        Plotly.newPlot("bubble", dataBub, layoutBub);
    
    // BUILD PANEL DATA CHART
        
        const panelData = data.metadata.filter(obj1 => obj1.id == id);
        var panel = d3.select(".panel-body");
        panel.html("");

        for (const[key, value] of Object.entries(panelData[0])) {
            console.log(key, value);
            var row = panel.append("tr");
            var cell = row.append("td");
            cell.text(key + ": " + value);
        };

    });

}    

d3.json("samples.json").then((data) => {

    var menuSelect = d3.select("#selDataset");
    
    data.names.forEach(dataLoad => {
        menuSelect.append("option")
        .text(dataLoad).property("value", dataLoad);
    });

    var id = data.names[0];

    chartLoad(id)

});

function optionChanged(selectedID) {

    chartLoad(selectedID);

}