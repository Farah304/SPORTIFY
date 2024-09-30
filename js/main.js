document.addEventListener("DOMContentLoaded", function() {


    const makeStyle = (status) => {
      if (status === 'Approved') {
        return 'status-Approved';
      } else if (status === 'Pending') {
        return 'status-Pending';
      } else {
        return 'status-Other';
      }
    };

    const tableContainer = document.getElementById('table-container');
    const table = document.createElement('table');
    tableContainer.appendChild(table);

    const tableHead = document.createElement('thead');
    table.appendChild(tableHead);

    const tableHeadRow = document.createElement('tr');
    tableHead.appendChild(tableHeadRow);

    [' Name','Start Time','End Time ','Date','Phone Number', 'Image'].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      tableHeadRow.appendChild(th);
    });

    const tableBody = document.createElement('tbody');
    table.appendChild(tableBody);

    rows.forEach(row => {
      const tr = document.createElement('tr');
      tableBody.appendChild(tr);

      ['name', 'trackingId', 'date', 'status'].forEach(key => {
        const td = document.createElement('td');
        if (key === 'status') {
          const span = document.createElement('span');
          span.textContent = row[key];
          span.className = `status ${makeStyle(row[key])}`;
          td.appendChild(span);
        } else {
          td.textContent = row[key];
        }
        tr.appendChild(td);
      });

      const detailsCell = document.createElement('td');
      detailsCell.textContent = 'Details';
      detailsCell.className = 'Details';
      tr.appendChild(detailsCell);
    });
  });
  document.addEventListener("DOMContentLoaded", function() {
    // JavaScript code here
  });
