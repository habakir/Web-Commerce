function addCategory(){
    var categoryName = document.getElementById("nazivKategorije").value;

    var newRow = document.createElement("tr");
    var newData = document.createElement("td");
    newData.textContent = categoryName;

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.className = "btn btn-danger float-end";
    deleteButton.onclick = function() {
        removeCategory(this);
    };

    newData.appendChild(deleteButton);
    newRow.appendChild(newData);

    var tableBody = document.getElementById("kategorijeTB");
    tableBody.appendChild(newRow);
    document.getElementById("nazivKategorije").value = "";
}

function removeCategory(button){
    var row = button.closest("tr");
    row.remove();
}