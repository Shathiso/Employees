<script setup>
  import {ref, inject, watch, computed, onMounted} from "vue"
  import { storeToRefs} from "pinia"
  import { useQuasar } from 'quasar';
  import AddEmployee from '../components/AddEmployee.vue'
  import EditEmployee from '../components/EditEmployee.vue'
  import logoSrc from "../assets/logo.jpg"

  
  const $q = useQuasar()
  const $store = inject('store');
  const $employeeStore = $store.employeeStore();

  const { employees } = storeToRefs($employeeStore);

  let initialEmployeesList = employees;
  let show_add_form = ref(false);
  let show_edit_form = ref(false);
  let employeeId = ref('');

  let searchText = ref('');
  let filterOptions = ref([
    'first_name', 'last_name', 'contact_number'
  ]);
  let filterText = ref('');



  onMounted(() => {
    fetchEmployees();
  });

  function closeModal(){
    show_add_form.value = false;
    show_edit_form.value = false;
  }

  function fetchEmployees(){
    $employeeStore.fetchEmployees();
  }

  function addEmployeeFn(){
    show_add_form.value = true;
  }

  function editEmployee(id){
    employeeId.value = id;
    show_edit_form.value = true;
  }

  function deleteEmployee(id){
    $employeeStore.deleteEmployee(id);
  }

  function searchEmployee(){
    //$employeeStore.deleteEmployee(id);
  }

  function filterEmployee(){
    //$employeeStore.deleteEmployee(id);
  }

  defineExpose({
     employees: employees,
     AddEmployee: AddEmployee,
     logoSrc: logoSrc,
     filterOptions: filterOptions,
     filterText:filterText
  });
</script>

<template>
  <div class="flex justify-center flex-col min-h-[100vh]" >

    <!-- Header -->
    <div class="nav flex justify-between">
      <span>
        <h4 class="">Employees</h4>
        <div v-if="!employees">No employees</div>
      </span>

      <!-- Filters -->
      <span v-if="employees">
        <q-input type="text" v-model="searchText" />
        <q-select square outlined v-model="filterText" :options="filterOptions" label="Square outlined" />
      </span>
 
      <q-btn unelevated rounded color="primary" class="max-h-[40px]"  @click="addEmployeeFn()" label="New Employee" icon="add" />
    </div>

    <!-- Employee List Wrapper -->
    <div>
      <!-- No employees -->
      <div v-if="!employees" class="flex mt-[60px] justify-center flex-col text-center">
        <img :src="logoSrc" class="max-w-[400px] empty-list-img" />
        <div class="my-6">There is nothing here</div>
        <div>Create a new employee by clicking the <br> New Employee button to get started</div>
      </div>

      <!-- Employee List -->
      <div v-if="employees">
         <div v-for="(employee, index) in employees">
            <div class="bg-gray-400">
              <span v-text="index + 1" class=" border border-fuchsia-950 text-fuchsia-950"></span>
              <span v-text="employee.first_name" class="text-white"></span>
              <span v-text="employee.last_name" class="text-white"></span>
              <span v-text="employee.contact_number" class="text-white"></span>

              <q-btn @click="editEmployee(employee.id)" icon="ModeEditOutlineOutlined">  </q-btn>
              <q-btn @click="deleteEmployee(employee.id)" icon="DeleteOutline">  </q-btn>
            </div>
         </div>
      </div>
       
    </div>

    <AddEmployee v-if="show_add_form" @close="closeModal()" />
    <EditEmployee v-if="show_edit_form" @close="closeModal()" id="employeeId" />
  </div>
</template>

<style scoped>
  .empty-list-img{
    margin: 0 auto;
  }
</style>
