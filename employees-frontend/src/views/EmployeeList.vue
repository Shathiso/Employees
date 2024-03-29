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
  let initialEmployeeDetails = ref(employees.value);

  let show_add_form = ref(false);
  let show_edit_form = ref(false);
  let employeeId = ref(0);

  let searchText = ref('');
  let filterOptions = ref([
    'year', 'birth_date', 'skill'
  ]);
  let filterText = ref('');



  onMounted(() => {
    fetchEmployees();
  });

  function closeModal(){
    show_add_form.value = false;
    show_edit_form.value = false;
  }

  //Fetch list of employees
  function fetchEmployees(){
    $employeeStore.fetchEmployees();
  }

  //Show the add employee modal
  function addEmployeeFn(){
    show_add_form.value = true;
  }

  //Show the edit employee modal
  function editEmployee(id){
    employeeId.value = id;
    show_edit_form.value = true;
  }

  //delete employee
  function deleteEmployee(id){

    $employeeStore.deleteEmployee(id);

    $q.loading.show({
        delay: 400 // ms
    })
    
     setTimeout(() => {
      $employeeStore.fetchEmployees();
      $q.loading.hide();
      $q.notify('Employee was deleted successfully');
     }, 4000);
  }

  function searchEmployees(){

    employees.value = employees.value.filter((employee) =>{
      let search = searchText.value.toLowerCase(); 
      return  (employee.first_name.toLowerCase().indexOf(search) > -1) || 
              (employee.last_name.toLowerCase().indexOf(search) > -1)  || 
              (employee.email_address.toLowerCase().indexOf(search) > -1);
    })

    //Reset the search
    if(searchText.value == ''){
      fetchEmployees();
    }
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
  <div class="flex mt-[40px] flex-col min-h-[100vh]" >

    <!-- Header -->
    <div class="nav flex justify-between">
      <span>
        <h4 class="">Employees</h4>
        <div v-if="!employees">No employees</div>
        <div v-if="employees">There are {{ employees.length }} employees</div>
      </span>

      <!-- Filters -->
      <span v-if="employees">
        <input type="text" class="border border-white h-[40px] px-[9px] rounded-md bg-transparent" @keyup="searchEmployees()"  v-model="searchText" color="white" placeholder="Please enter a firstname, lastname or email" />
        <q-select outlined v-model="filterText" color="white" :options="filterOptions" @change="filterEmployees()" label="Square outlined" />
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
            <div class="bg-gray-400 flex justify-between flex-wrap rounded-md padding-top: 14px; mb-3">
              <div class="flex-1 p-[16px]">
                <div class="inline-block relative">
                  <span v-text="index + 1" class="flex content-center justify-center align-center border border-fuchsia-950 text-fuchsia-950 ml-2  mr-3 rounded-full p-2 h-[24px] w-[24px]"></span>
                </div>
                <span v-text="employee.first_name" class="text-white mr-6"></span>
                <span v-text="employee.last_name" class="text-white mr-6"></span>
                <span v-text="employee.contact_number" class="text-white mr-6"></span>
              </div>

              <div class="flex justify-between">
                <q-btn @click="editEmployee(employee.id)" class="mr-2" icon="draw" title="edit employee">  </q-btn>
                <q-btn @click="deleteEmployee(employee.id)" class="mr-2" icon="delete" title="delete employee">  </q-btn>
              </div>
            </div>
         </div>
      </div>
       
    </div>

    <AddEmployee v-if="show_add_form" @close="closeModal()" />
    <EditEmployee v-if="show_edit_form" @close="closeModal()" :id="employeeId" />
  </div>
</template>

<style scoped>
  .empty-list-img{
    margin: 0 auto;
  }
</style>
