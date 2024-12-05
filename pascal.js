function binomialCoefficient(n, k) {
    if (k === 0 || k === n) {
        return 1;
    }
    return binomialCoefficient(n - 1, k - 1) + binomialCoefficient(n - 1, k);
}

let number_display = true;
let rows = 10;

function generatePascalTriangle(rows) {
    const pascalContainer = document.getElementById('pascal');
    pascalContainer.innerHTML = null;
    for (let n = 0; n < rows; n++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        for (let r = 0; r <= n; r++) {
            const numberSpan = document.createElement('span');
            numberSpan.classList.add('number');
            if(number_display) {
                numberSpan.textContent = binomialCoefficient(n, r);
            } else {
                numberSpan.textContent = "C(" + n + ", " + r + ")";
            }
            rowDiv.appendChild(numberSpan);
        }
        pascalContainer.appendChild(rowDiv);
    }
}

function generatePascalTriangle(rows) {
    const pascalContainer = document.getElementById('pascal');
    pascalContainer.innerHTML = null;
    for (let n = 0; n < rows; n++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        rowDiv.dataset.row = n;

        const rowSum = Math.pow(2, n);

        for (let r = 0; r <= n; r++) {
            const numberSpan = document.createElement('span');
            numberSpan.classList.add('number');
            if(number_display) {
                numberSpan.textContent = binomialCoefficient(n, r);
            } else {
                numberSpan.textContent = "C(" + n + ", " + r + ")";
            }

            numberSpan.addEventListener('click', () => {
                highlightRow(rowDiv);
                showRowSum(rowSum, rowDiv);
            });

            rowDiv.appendChild(numberSpan);
        }
        pascalContainer.appendChild(rowDiv);
    }
}

function highlightRow(rowDiv) {
    document.querySelectorAll('.number').forEach(number => {
        number.style.backgroundColor = '';
    });

    rowDiv.querySelectorAll('.number').forEach(number => {
        number.style.backgroundColor = 'turquoise';
    });
}

function showRowSum(sum, rowDiv) {
    let sumContainer = document.getElementById('row-sum');
    if (!sumContainer) {
        sumContainer = document.createElement('div');
        sumContainer.id = 'row-sum';
        sumContainer.style.position = 'absolute';
        document.body.appendChild(sumContainer);
    }

    sumContainer.textContent = `→ 2ⁿ = ${sum}`;

    const rowRect = rowDiv.getBoundingClientRect();

    const lastNumberSpan = rowDiv.lastElementChild;
    const lastSpanRect = lastNumberSpan.getBoundingClientRect();

    sumContainer.style.top = `${rowRect.top + rowRect.height / 2 - sumContainer.offsetHeight / 2 + window.scrollY}px`;
    sumContainer.style.left = `${lastSpanRect.right + 10}px`;
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'c') {
        number_display = !number_display;
        generatePascalTriangle(rows);
    }
});

document.addEventListener('keydown', (event) => {
    if ((event.key === '+' || event.key === 'w') && rows < 16) {
        rows += 1;
        generatePascalTriangle(rows);
    } else if ((event.key === '-' || event.key === 's') && rows > 1) {
        rows -= 1;
        generatePascalTriangle(rows);
    }
});

window.onload = function() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    generatePascalTriangle(rows);
}