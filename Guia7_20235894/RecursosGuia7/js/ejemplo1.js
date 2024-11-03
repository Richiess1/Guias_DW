const newForm = document.getElementById("idNewForm");

const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const buttonValidar = document.createElement("button"); 
buttonValidar.textContent = "Validar información";
buttonValidar.className = "btn btn-success my-3";
newForm.appendChild(buttonValidar); 

const cmbElemento = document.getElementById("idCmbElemento");

const tituloElemento = document.getElementById("idTituloElemento");

const nombreElemento = document.getElementById("idNombreElemento");

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

const idsExistentes = new Set(); 

const verificarTipoElemento = function () {
    let elemento = cmbElemento.value;

    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creará");
    }
};

const newSelect = function () {
    let addElemento = document.createElement("select");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");

    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opción ${i}`;
        addElemento.appendChild(addOption);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);

    idsExistentes.add(`id${nombreElemento.value}`); 
}

const newRadioCheckbox = function (newElemento) {
    let addElemento = document.createElement("input");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);

    idsExistentes.add(`id${nombreElemento.value}`); 
};

const newInput = function (newElemento) {
    let addElemento = newElemento === "textarea" 
        ? document.createElement("textarea") 
        : document.createElement("input");

    if (newElemento !== "textarea") {
        addElemento.setAttribute("type", newElemento); 
    }

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    
    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag"); 
    
    labelElemento.textContent = tituloElemento.value;
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);

    idsExistentes.add(`id${nombreElemento.value}`); 
};

const validarInformacion = function () {
    const inputs = newForm.querySelectorAll("input, select, textarea");
    let valido = true;

    inputs.forEach(input => {
        if (!input.value && input.type !== "checkbox" && input.type !== "radio") {
            valido = false;
            alert(`El campo con ID "${input.id}" está vacío.`);
        }
        if (input.type === "checkbox" && !input.checked) {
            valido = false;
            alert(`El checkbox con ID "${input.id}" no está seleccionado.`);
        }
        if (input.type === "radio" && !input.checked) {
            valido = false;
            alert(`El radio con ID "${input.id}" no está seleccionado.`);
        }
    });

    if (valido) {
        alert("Todos los campos están correctamente llenos.");
    }
};

buttonCrear.onclick = () => {
    verificarTipoElemento();
}

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;

        
        if (idsExistentes.has(`id${nombreElemento.value}`)) {
            alert("No se permite crear controles con el mismo ID.");
            return;
        }

        if (elemento === "select") {
            newSelect();
        } else if (elemento === "radio" || elemento === "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
    } else {
        alert("Faltan campos por completar");
    }
};

buttonValidar.onclick = validarInformacion; 

document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});
