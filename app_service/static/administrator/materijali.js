function addIngredient(){
    var ingredientName = document.getElementById("nazivSastojka").value;

    var newRow = document.createElement("tr");
    var newData = document.createElement("td");
    newData.textContent = ingredientName;

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.className = "btn btn-danger float-end";
    deleteButton.onclick = function() {
        removeIngredient(this);
    };

    newData.appendChild(deleteButton);
    newRow.appendChild(newData);

    var tableBody = document.querySelector("tbody");
    tableBody.appendChild(newRow);
    document.getElementById("nazivSastojka").value = "";
}

function removeIngredient(button){
    var row = button.closest("tr");
    row.remove();
}
