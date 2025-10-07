const calculationsData = {
    CheckIn: [
        {
            name: "Check In Date",
            description: "Calculates the date when a chart was checked in for QC review.",
            dax: "Check In Date = RELATED('Check In'[Check In Date])",
            isMeasure: false
        },
        {
            name: "Pending Check In Count",
            description: "Counts the number of charts pending check-in.",
            dax: "Pending Check In Count = COUNTROWS(FILTER('Check In', 'Check In'[Status] = \"Pending\"))",
            isMeasure: true
        }
    ],
    DEOut: [
        {
            name: "Data Entry Complete",
            description: "Indicates if data entry is completed for a visit.",
            dax: "Data Entry Complete = IF('DEOut'[Status] = \"Complete\", TRUE(), FALSE())",
            isMeasure: false
        }
    ],
    Findings: [
        {
            name: "Open Findings Count",
            description: "Counts the number of unresolved findings.",
            dax: "Open Findings Count = COUNTROWS(FILTER(Findings, Findings[Status] = \"Open\"))",
            isMeasure: true
        }
    ],
    CalculatedTables: [
        {
            name: "Metrics Summary",
            description: "Calculated table showing key metrics summary.",
            dax: "Metrics Summary = SUMMARIZE(Findings, Findings[Category], \"Count\", COUNT(Findings[ID]))",
            isMeasure: false
        }
    ],
    CTMS: [
        {
            name: "Visit Status",
            description: "Tracks the current status of each visit.",
            dax: "Visit Status = RELATED(CTMS[Visit Status])",
            isMeasure: false
        }
    ]
};

function createCalculationElement(calc) {
    return `
        <div class="calculation">
            <div class="calc-header" onclick="toggleCalcContent(this)">
                <span>${calc.name}</span>
                ${calc.isMeasure ? '<span class="measure-badge">Measure</span>' : ''}
            </div>
            <div class="calc-description">${calc.description}</div>
            <div class="dax-code">${calc.dax}</div>
        </div>
    `;
}

function toggleCalcContent(header) {
    const calculation = header.parentElement;
    const description = calculation.querySelector('.calc-description');
    const daxCode = calculation.querySelector('.dax-code');
    
    const isExpanded = description.style.display === 'block';
    
    // Close all other calculations in the same section
    const section = calculation.closest('.table-section');
    section.querySelectorAll('.calc-description, .dax-code').forEach(el => {
        el.style.display = 'none';
    });

    if (!isExpanded) {
        description.style.display = 'block';
        daxCode.style.display = 'block';
    }
}