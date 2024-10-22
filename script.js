function generateSequences() {
    const a = parseInt(document.getElementById('a').value);
    const c = parseInt(document.getElementById('c').value);
    const m = parseInt(document.getElementById('m').value);
    const x0Values = document.getElementById('x0').value.split(',').map(x => parseInt(x.trim()));

    let output = '<h2>Generated Random Numbers</h2>';
    let summaryTable = '<h2>Cycle Length Summary</h2><table><tr><th>X<sub>0</sub></th><th>Cycle Length</th></tr>';

    // Iterate over each initial seed (X0)
    x0Values.forEach(x0 => {
        output += `<h3>For X<sub>0</sub> = ${x0}</h3><table><tr><th>i</th><th>X<sub>i</sub></th><th>R<sub>i</sub></th></tr>`;
        
        let xi = x0;
        let visited = new Set(); // To track visited values
        let sequence = [];
        let i = 0;
        let cycleDetected = false;
        let cycleLength = 0;
        
        while (!cycleDetected) {
            const ri = xi / m;
            sequence.push({ i, xi, ri });
            output += `<tr><td>${i}</td><td>${xi}</td><td>${ri.toFixed(4)}</td></tr>`;
            
            if (visited.has(xi)) {
                cycleDetected = true;
                cycleLength = i;
                break;
            }
            
            visited.add(xi);
            xi = (a * xi + c) % m;
            i++;
        }

        output += '</table>';
        output += `<p>Cycle detected after ${cycleLength} steps.</p>`;

        // Add to summary table
        summaryTable += `<tr><td>${x0}</td><td>${cycleLength}</td></tr>`;
    });

    summaryTable += '</table>';

    // Display both the detailed sequence and summary table
    document.getElementById('output').innerHTML = output + summaryTable;
}
