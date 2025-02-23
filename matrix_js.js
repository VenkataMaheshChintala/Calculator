var op = document.getElementById("operations");
op.addEventListener("change",function() {
    const val = op.value;
    let container = document.getElementById("inp_for_nmat");
    let container2 = document.getElementById("inp_for_nrow_ncol");

    container.innerHTML = "";
    container2.innerHTML = "";

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

            // To dynamically check the dimensions of the matrix.
            if(val == "add" || val == "sub") {
                for(let i=1;i<=nmat_value;i++) {
                    document.getElementById("nrows"+i).addEventListener("input",checkDimensions);
                    document.getElementById("ncols"+i).addEventListener("input",checkDimensions);
                }
            }

            // To take the input matrix values.
            for(let i=1;i<=nmat_value;i++) {
                let container3 = document.getElementById("matrix_inp_values");
                let label = document.createElement("label");
                label.innerText = "Enter the matrix values for matrix " + i + " :";
                            
                let matrix_rows = document.getElementById("nrows"+i);
                let matrix_cols = document.getElementById("ncols"+i);

                matrix_rows.addEventListener("input",generateMatrixInputs);
                matrix_cols.addEventListener("input",generateMatrixInputs);
                            
                function generateMatrixInputs() {
                    let ch = 65;
                    container3.appendChild(label);
                    container3.appendChild(document.createElement("br"));

                    let rows = parseInt(matrix_rows.value);
                    let cols = parseInt(matrix_cols.value);

                    for(let j=1;j<=rows;j++) {
                        for(let k=1;k<=cols;k++) {
                            let labl = document.createElement("label");
                            labl.innerHTML = String.fromCharCode(ch)+"<sub>"+j+""+k+"</sub>:";

                            let inp = document.createElement("input");
                            inp.type = "number";
                            inp.id = "mat"+i+"row"+j+"col"+k;

                            let space = document.createElement("span");
                            space.innerHTML = "&nbsp;&nbsp;&nbsp";

                            container3.append(labl);
                            container3.append(inp);
                            container3.append(space);
                        }
                        let br = document.createElement("br");
                        container3.appendChild(br);
                        ch = ch + 1;
                    }
                }
            }
        })
    }
})
function checkDimensions() {
    var nmat_value = parseInt(document.getElementById("nmat").value);
    let container = document.getElementById("inp_for_nrow_ncol");

    let error_exists = document.getElementById("Dimension_error");
    if(error_exists) {
        error_exists.remove();
    }

    let first_matrix_rows = document.getElementById("nrows1").value;
    let first_matrix_cols = document.getElementById("ncols1").value;
    let bool = true;

    for(let i=2;i<=nmat_value;i++) {
        let rows = document.getElementById("nrows"+i).value;
        let cols = document.getElementById("ncols"+i).value;

        if(rows != first_matrix_rows || cols != first_matrix_cols) {
            bool = false;
            break;
        }
    }

    if(!bool) {
        let error_message = document.createElement("label");
        error_message.id = "Dimension_error";
        error_message.innerText = "To perform addition or subtraction the matrices need to have same dimensions.";
        error_message.style.color = "red";
        container.appendChild(error_message);
    }
}