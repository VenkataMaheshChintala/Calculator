var op = document.getElementById("operations");
op.addEventListener("change",function() {
    const val = op.value;
    let container = document.getElementById("inp_for_nmat");
    let container2 = document.getElementById("inp_for_nrow_ncol");
    let container3 = document.getElementById("matrix_inp_values");

    container.innerHTML = "";
    container2.innerHTML = "";
    container3.innerHTML = "";

    if(val != "trans") {
        // creating the label
        let lab_inp_nmatrix = document.createElement("label");
        lab_inp_nmatrix.innerText = "Enter the no.of matrices : ";
        lab_inp_nmatrix.htmlFor = "nmat";

        // creating the input field to enter no.of matrices
        let inp_nmatrix = document.createElement("input");
        inp_nmatrix.type = "number";
        inp_nmatrix.placeholder = "Enter no.of matrices";
        inp_nmatrix.id = "nmat";
        inp_nmatrix.min = 2;

        // adding both label and input field 
        container.appendChild(lab_inp_nmatrix);
        container.appendChild(inp_nmatrix);

        var nmat_id = document.getElementById("nmat");
        nmat_id.addEventListener("change", function() {
            container2.innerHTML = "";
            container3.innerHTML = "";

            var nmat_value = parseInt(nmat_id.value);

            for(var i=1;i<=nmat_value;i++) {
                let label_rows = document.createElement("label");
                label_rows.innerText = "Enter the no.of rows in " + i + "matrix : ";

                // input to enter no.of rows in matrix
                let input_rows = document.createElement("input");
                input_rows.type = "number";
                input_rows.id = "nrows"+i;

                let label_cols = document.createElement("label");
                label_cols.innerText = "Enter the no.of cols in " + i + "matrix : "; 

                // input to enter no.of cols in matrix
                let input_cols = document.createElement("input");
                input_cols.type = "number";
                input_cols.id = "ncols"+i;

                // adding input fields and label ot the HTML page.
                container2.append(label_rows);
                container2.appendChild(document.createElement("br"));
                container2.append(input_rows);
                container2.appendChild(document.createElement("br"));
                container2.append(label_cols);
                container2.appendChild(document.createElement("br"));
                container2.append(input_cols);
                container2.appendChild(document.createElement("br"));
            }

            let button = document.createElement("button");
            button.onclick = checkDimensions;
            button.innerText = "Click to Enter matrix values";
            container2.appendChild(button);
        });
    } else {
        let container2 = document.getElementById("inp_for_nrow_ncol");
        container2.innerHTML = "";

        let label_rows = document.createElement("label");
        label_rows.innerText = "Enter the no.of rows in the matrix : ";

        let input_rows = document.createElement("input");
        input_rows.type = "number";
        input_rows.id = "trans_rows";

        let label_cols = document.createElement("label");
        label_cols.innerText = "Enter the no.of cols in the matrix : ";
                    
        let input_cols = document.createElement("input");
        input_cols.type = "number";
        input_cols.id = "trans_cols";

        let button = document.createElement("button");
        button.id = "to_enter_trans_matrix_values";
        button.onclick = MatrixInputForTranspose;
        button.innerText = "Click to enter matrix values";

        container2.appendChild(label_rows);
        container2.appendChild(input_rows);
        container2.appendChild(document.createElement("br"));
        container2.appendChild(label_cols);
        container2.appendChild(input_cols);
        container2.appendChild(document.createElement("br"));
        container2.appendChild(button);

        let solution_container = document.getElementById("solution");
                    
        let button1 = document.createElement("button");
        button1.id = "to_calculate_trans_matrix";
        button1.onclick = CalculateTranspose;
        button1.innerText = "Calculate Transpose";

        solution_container.appendChild(button1);
    }
})

function CalculateTranspose() {
    let container = document.getElementById("solution");
    container.innerHTML = "";

    let nrows_id = document.getElementById("trans_rows");
    let ncols_id = document.getElementById("trans_cols");

    let nrows = parseInt(nrows_id.value);
    let ncols = parseInt(ncols_id.value);
    
    var matrix = new Array(nrows);
    for(var i=0;i<nrows;i++) {
        matrix[i] = new Array(ncols);
        for(var j=0;j<ncols;j++) {
            let inputElement = document.getElementById("trans_row"+(i+1)+"_"+(j+1));
            if(inputElement) {
                matrix[i][j] = parseInt(inputElement.value) || 0;
            } else {
                console.error("missing input");
            }
        }
    }

    let transpose = new Array(ncols);
    for(var i=0;i<ncols;i++) {
        transpose[i] = new Array(nrows);
        for(var j=0;j<nrows;j++) {
            transpose[i][j] = matrix[j][i];
        }
    }

    let p = document.createElement("p");
    p.innerHTML = "";
    p.innerHTML = "The transposed matrix is : <br>";

    for(var i=0;i<ncols;i++) {
        for(var j=0;j<nrows;j++) {
            p.innerHTML += transpose[i][j] + " ";
        }
        p.innerHTML += "<br>"
    }

    container.appendChild(p);
}

function MatrixInputForTranspose() {
    let ncols_id = document.getElementById("trans_cols");
    let nrows_id = document.getElementById("trans_rows");

    let ncols = ncols_id.value;
    let nrows = nrows_id.value;

    let container = document.getElementById("matrix_inp_values");

    container.innerHTML = "";

    for(let i=1;i<=nrows;i++) {
        for(let j=1;j<=ncols;j++) {
            let label = document.createElement("label");
            label.innerHTML = "A<sub>"+i+""+j+"</sub> : ";

            let inp_row = document.createElement("input");
            inp_row.type = "number";
            inp_row.id = "trans_row"+i+"_"+j;

            let space = document.createElement("span");
            space.innerHTML = "&nbsp;&nbsp;&nbsp";

            container.appendChild(label);
            container.appendChild(inp_row);
            container.appendChild(space);
        }
        container.appendChild(document.createElement("br"));
    }
    
}

function checkDimensions() {
    let error_message_id = document.getElementById("error_message");

    let error_exists = document.getElementById("error_displayed");
    if(error_exists) {
        error_exists.remove();
    }

    let label_for_error = document.createElement("label");
    label_for_error.id = "error_displayed";

    let nmat_id = document.getElementById("nmat");
    let nmat_id_value = nmat_id.value;

    let bool = true;

    for(let i=1;i<=nmat_id_value;i++) {
        let cd_nrows = document.getElementById("nrows"+i).value;
        let cd_cols = document.getElementById("ncols"+i).value;

        if(cd_nrows != cd_cols) {
            bool = false;
            break;
        }
    }

    if(!bool) {
        label_for_error.innerText = "To perform addition or subtraction the dimensions of the matrix must be same..";
        error_message_id.appendChild(label_for_error);
    }
}