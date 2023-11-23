let currentPage = 1;
const itemsPerPage = 4;

const hexColor=['#ACDDDE','#CAF1DE','#E1F8DC']
function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * hexColor.length);
    return hexColor[randomIndex];
}

// Example usage
const randomColor = getRandomColor();
console.log(randomColor);
async function apiData() {
    try {
        const res = await fetch("https://www.arbeitnow.com/api/job-board-api");
        const data = await res.json();

        // Call empData and pass the data
        empData(data, currentPage);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function empData(data, page) {
    const main = document.getElementById('main');
    
    main.innerHTML = ''; // Clear existing content

    // Calculate start and end index for the current page
    const startIndex = (page-1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

console.log(startIndex);
console.log(endIndex);
    // Access the 'data' property and iterate over the array for the current page
    data.data.slice(startIndex, endIndex).forEach(async (job,i) => {
        const companyName = job.company_name;
        const title = job.title;
        const description = job.description;

        const con = document.createElement('div');
        con.setAttribute("class", "m-5 con p-5");
        con.style.backgroundColor=randomColor
        main.append(con);
        con.innerHTML = `<div>
                            <h2>Post No:${i+1}</h2>
                            <h2>${title}</h2>
                            <h4>${companyName}</h4>
                            <div>${description}</div>
                        </div>`;
    });

    // Add pagination controls
    addPagination(data.data.length);
}

function addPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');

    // Clear existing pagination controls
    paginationContainer.innerHTML = '';

    // Create "Previous" button
    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous';
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            apiData();
        }
    });
    paginationContainer.appendChild(prevButton);

    // Create numbered pagination buttons
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.addEventListener('click', () => {
            currentPage = i;
            apiData();
        });

        paginationContainer.appendChild(button);
    }

    // Create "Next" button
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            apiData();
        }
    });
    paginationContainer.appendChild(nextButton);
}

apiData();
