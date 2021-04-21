<template>
  <div class="history">
    <div class="container-fluid text-center">
      <h1>
        <b-icon icon="card-checklist" class="rounded-circle bg-danger p-2" variant="light"></b-icon>
        Shopping Histories
      </h1>
    </div>
    <hr>
    <div>
      <h3>Chrismas List!</h3>
      <p>10 items</p>
      <div class="row">
        <div class="col-3">
          <b-list-group>
            <h5>Target</h5>
            <b-list-group-item>
              Milk
            </b-list-group-item>
            <b-list-group-item>
              Milk
            </b-list-group-item>
            <b-list-group-item>
              Milk
            </b-list-group-item>
          </b-list-group>
        </div>
        <div class="col-3">Cvs</div>
        <div class="col-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "History",
  data() {
      return {
          plans: [{

          }],
          col: 3,
      }
  }
};
</script>

<style scoped>
.history {
  margin: 15px;
  padding: 30px;
  border-radius: 15px;
  background-color: white;
}
</style>
