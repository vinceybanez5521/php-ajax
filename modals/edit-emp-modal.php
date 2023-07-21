<!-- Edit Employee Modal -->
<div class="modal fade" id="editEmpModal" tabindex="-1" aria-labelledby="editEmpModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="editEmpModalLabel">Edit Employee</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="alert-box"></div>
        <div class="mb-3">
          <label for="edit-first-name" class="form-label">First Name</label>
          <input type="text" class="form-control" id="edit-first-name">
          <span class="invalid-feedback"></span>
        </div>
        <div class="mb-3">
          <label for="edit-last-name" class="form-label">Last Name</label>
          <input type="text" class="form-control" id="edit-last-name">
          <span class="invalid-feedback"></span>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success" id="update-emp">Update</button>
      </div>
    </div>
  </div>
</div>