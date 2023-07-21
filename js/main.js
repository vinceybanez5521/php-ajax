const createEmpBtn = document.querySelector("#create-emp");
const saveEmpBtn = document.querySelector("#save-emp");
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const createEmpModal = document.querySelector("#createEmpModal");
const table = document.querySelector("table");
const editEmpModal = document.querySelector("#editEmpModal");
const editFirstNameInput = editEmpModal.querySelector("#edit-first-name");
const editLastNameInput = editEmpModal.querySelector("#edit-last-name");
const updateEmpBtn = editEmpModal.querySelector("#update-emp");
const deleteEmpModal = document.querySelector("#deleteEmpModal");
const showEmpModal = document.querySelector("#showEmpModal");
const showFirstName = showEmpModal.querySelector("#show-first-name");
const showLastName = showEmpModal.querySelector("#show-last-name");

// Event Listeners
createEmpBtn.addEventListener("click", dismissAlert);
saveEmpBtn.addEventListener("click", createEmployee);
createEmpModal.addEventListener("hidden.bs.modal", () => {
  dismissModalAlert(createEmpModal);
  resetFields();
});
editEmpModal.addEventListener("hidden.bs.modal", () => {
  dismissModalAlert(editEmpModal);
  resetEditFields();
});
window.addEventListener("load", getEmployees);

// Functions
function createEmployee() {
  let firstName = firstNameInput.value.trim();
  let lastName = lastNameInput.value.trim();

  if (!firstName) {
    firstNameInput.classList.add("is-invalid");
    firstNameInput.parentElement.querySelector(".invalid-feedback").innerHTML =
      "Please enter first name";
  } else {
    firstNameInput.classList.remove("is-invalid");
    firstNameInput.parentElement.querySelector(".invalid-feedback").innerHTML =
      "";
  }

  if (!lastName) {
    lastNameInput.classList.add("is-invalid");
    lastNameInput.parentElement.querySelector(".invalid-feedback").innerHTML =
      "Please enter last name";
  } else {
    lastNameInput.classList.remove("is-invalid");
    lastNameInput.parentElement.querySelector(".invalid-feedback").innerHTML =
      "";
  }

  if (firstName && lastName) {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost/php-ajax/process/create-emp.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let params = `first_name=${firstName}&last_name=${lastName}`;

    xhr.onload = function () {
      if (this.status == 200) {
        let response = JSON.parse(this.responseText);

        if (response.result == 1) {
          resetFields();
          dismissModal(createEmpModal);
          showAlert(response.result, "Employee Added!");
          getEmployees();
        } else {
          showModalAlert(
            createEmpModal,
            response.result,
            "Employee Not Added!"
          );
        }
      }
    };

    xhr.send(params);
  }
}

function getEmployees() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "http://localhost/php-ajax/process/get-employees.php", true);

  xhr.onload = function () {
    if (this.status == 200) {
      let response = JSON.parse(this.responseText);
      // console.log(response.data);
      let employees = response.data;

      let tableData = "";
      employees.forEach((employee) => {
        let row = `
          <tr>
            <td>${employee.full_name}</td>
            <td>${employee.date_added}</td>
            <td>
              <button type="button" class="btn btn-info show-emp" data-bs-toggle="modal" data-bs-target="#showEmpModal" value="${employee.id}">View</button>
              <button type="button" class="btn btn-success edit-emp" data-bs-toggle="modal" data-bs-target="#editEmpModal" value="${employee.id}">Edit</button>
              <button type="button" class="btn btn-danger delete" data-bs-toggle="modal" data-bs-target="#deleteEmpModal" value="${employee.id}">Delete</button>
            </td>
          </tr>
        `;
        tableData += row;
      });

      table.querySelector("tbody").innerHTML = tableData;

      const showEmpBtns = document.querySelectorAll(".show-emp");
      showEmpBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let id = e.target.value;
          dismissAlert();

          const xhr = new XMLHttpRequest();

          xhr.open(
            "GET",
            `http://localhost/php-ajax/process/get-employee.php?id=${id}`,
            true
          );

          xhr.onload = function () {
            if (this.status == 200) {
              let response = JSON.parse(this.responseText);
              let employee = response.data;

              showFirstName.innerHTML = employee.first_name;
              showLastName.innerHTML = employee.last_name;
            }
          };

          xhr.send();
        });
      });

      const editEmpBtns = document.querySelectorAll(".edit-emp");
      editEmpBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let id = e.target.value;
          dismissAlert();
          editEmployee(id);
        });
      });

      const deleteBtns = document.querySelectorAll(".delete");
      deleteBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let id = e.target.value;

          const deleteEmpBtn = deleteEmpModal.querySelector("#delete-emp");
          deleteEmpBtn.addEventListener("click", (e) => {
            e.preventDefault();
            deleteEmployee(id);
          });
        });
      });
    }
  };

  xhr.send();
}

function editEmployee(id) {
  const xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `http://localhost/php-ajax/process/get-employee.php?id=${id}`,
    true
  );

  xhr.onload = function () {
    if (this.status == 200) {
      let response = JSON.parse(this.responseText);
      let employee = response.data;

      editFirstNameInput.value = employee.first_name;
      editLastNameInput.value = employee.last_name;
      updateEmpBtn.addEventListener("click", (e) => {
        e.preventDefault();
        updateEmployee(id);
      });
    }
  };

  xhr.send();
}

function updateEmployee(id) {
  let firstName = editFirstNameInput.value.trim();
  let lastName = editLastNameInput.value.trim();

  if (!firstName) {
    editFirstNameInput.classList.add("is-invalid");
    editFirstNameInput.parentElement.querySelector(
      ".invalid-feedback"
    ).innerHTML = "Please enter first name";
  } else {
    editFirstNameInput.classList.remove("is-invalid");
    editFirstNameInput.parentElement.querySelector(
      ".invalid-feedback"
    ).innerHTML = "";
  }

  if (!lastName) {
    editLastNameInput.classList.add("is-invalid");
    editLastNameInput.parentElement.querySelector(
      ".invalid-feedback"
    ).innerHTML = "Please enter last name";
  } else {
    editLastNameInput.classList.remove("is-invalid");
    editLastNameInput.parentElement.querySelector(
      ".invalid-feedback"
    ).innerHTML = "";
  }

  if (firstName && lastName) {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost/php-ajax/process/update-emp.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let params = `first_name=${firstName}&last_name=${lastName}&id=${id}`;

    xhr.onload = function () {
      if (this.status == 200) {
        let response = JSON.parse(this.responseText);

        if (response.result == 1) {
          resetEditFields();
          dismissModal(editEmpModal);
          showAlert(response.result, "Employee Updated!");
          getEmployees();
        } else {
          showModalAlert(
            editEmpModal,
            response.result,
            "Employee Not Updated!"
          );
        }
      }
    };

    xhr.send(params);
  }
}

function deleteEmployee(id) {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", "http://localhost/php-ajax/process/delete-emp.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  let params = `id=${id}`;

  xhr.onload = function () {
    if (this.status == 200) {
      let response = JSON.parse(this.responseText);

      if (response.result == 1) {
        dismissModal(deleteEmpModal);
        showAlert(response.result, "Employee Deleted!");
        getEmployees();
      } else {
        showModalAlert(
          deleteEmpModal,
          response.result,
          "Employee Not Deleted!"
        );
      }
    }
  };

  xhr.send(params);
}

/* Helpers */
function resetFields() {
  firstNameInput.value = "";
  lastNameInput.value = "";

  firstNameInput.classList.remove("is-invalid");
  firstNameInput.parentElement.querySelector(".invalid-feedback").innerHTML =
    "";
  lastNameInput.classList.remove("is-invalid");
  lastNameInput.parentElement.querySelector(".invalid-feedback").innerHTML = "";
}

function resetEditFields() {
  editFirstNameInput.value = "";
  editLastNameInput.value = "";

  editFirstNameInput.classList.remove("is-invalid");
  editFirstNameInput.parentElement.querySelector(
    ".invalid-feedback"
  ).innerHTML = "";
  editLastNameInput.classList.remove("is-invalid");
  editLastNameInput.parentElement.querySelector(".invalid-feedback").innerHTML =
    "";
}

function dismissModal(modal) {
  bootstrap.Modal.getInstance(modal).hide();
}

function showAlert(result, message) {
  const alertBox = document.querySelector(".alert-box");

  if (result == 1) {
    alertBox.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
  } else {
    alertBox.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
  }
}

function showModalAlert(modal, result, message) {
  const modalBody = modal.querySelector(".modal-body");
  const alertBox = modalBody.querySelector(".alert-box");

  if (result == 1) {
    let alertEl = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
    alertBox.innerHTML = alertEl;
  } else {
    let alertEl = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
    alertBox.innerHTML = alertEl;
  }
}

function dismissModalAlert(modal) {
  const alertEl = modal.querySelector(".alert-box .alert");

  if (alertEl) {
    alertEl.classList.add("d-none");
  }
}

function dismissAlert() {
  const alertEl = document.querySelector(".alert-box .alert");

  if (alertEl) {
    alertEl.classList.add("d-none");
  }
}
