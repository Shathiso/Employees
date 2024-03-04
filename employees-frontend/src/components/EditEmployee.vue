<script setup>
  import {ref, onMounted, inject} from "vue"
  import { useQuasar } from 'quasar'
  import { storeToRefs} from "pinia"

  //Inject the store
  const $store = inject('store');
  const $employeeStore = $store.employeeStore();

  const { employee } = storeToRefs($employeeStore);
  const employeeDetails = ref(employee.value);

  console.log(employeeDetails.value)

  const $q = useQuasar();
  const $emits = defineEmits(['close']);

  const props = defineProps({
    id: {
      type: Number,
      required: true
    }
  })

  onMounted(() => {

    //fetch the employee details
    $employeeStore.fetchEmployee(props.id);

    $q.loading.show({
        delay: 0 // ms
    })

    setTimeout(() => {
      $q.loading.hide();   
    }, 4000);

    
  });


  //Watch the store for changes
  $employeeStore.$subscribe((mutation, state) => {
    
      if(state.employee.first_name != ''){
        
        console.log(state.employee)
      }
  
  })


  function addSkill(){
    employee.value.skills.push({
      skill: '',
      years_of_experience: '',
      seniority_rating: ''
    })
  }

  function deleteSkill(index){
    employee.value.skills.splice(index, 1);
  }


  function updateEmployee(){
    let data = employee.value;
    const response = $employeeStore.updateEmployee(id, data);

    if(response.success){

      //Emit and close the modal
      $emit('close');

      $q.notify('Employee details were updated successfully..');
    }
  }

</script>

<template>
  <div class=" absolute left-0 top-0 h-[98vh] overflow-y-scroll overflow-x-hidden max-w-[850px] w-[50%]  flex flex-nowrap flex-col rounded-md justify-center align-items-center text-center pt-[20px] pb-[20px] px-6 bg-white text-black" >
    <q-btn @click="$emit('close')" class="absolute right-4 top-4 mb-6" label="Close"/>
    <h1 class="text-3xl mb-8">Edit employee</h1>
    <div class="flex align-items-center text-center flex-nowrap flex-col ">   
      
      <label>Basic Info</label>
      
      <div class="flex ">
        <!-- Firstname input -->
        <div class="relative mb-6 inline-block flex-1">
          <q-input  class="pl-2"
            v-model="employeeDetails.first_name"
            label="First name"
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter your first name"
           />
        </div>
        <!-- Lastname input -->
        <div class="relative mb-6 inline-block flex-1">
          <q-input  class="pl-2"
            v-model="employeeDetails.last_name"
            label="Last name"
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter your last name"
           />
        </div> 
      </div>

      <div class="flex">
        <!-- Lastname input -->
        <div class="relative mb-6 inline-block flex-1">
          <q-input  class="pl-2"
            v-model="employeeDetails.contact_number"
            label="Contact Number"
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter your contact number"
          />
        </div>

        <!-- Email input -->
        <div class="relative mb-6 inline-block flex-1">
          <q-input  class="pl-2"
            v-model="employeeDetails.email_address"
            label="Email"
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter your email address"
          />
        </div>
      </div>

      <!-- birth_date -->
      <div class="relative mb-6">
        <q-input  class="pl-2"
          v-model="employeeDetails.birth_date"
          label="Birth Date"
          :rules="[val => !!val || 'Field is required']"
          error-message="Please enter your birth date"
         />
      </div>


      <label>Address Info</label>
      <!-- street_address -->
      <div class="relative mb-6">
        <q-input  class="pl-2"
          v-model="employeeDetails.street_address"
          label="Street Address"
          :rules="[val => !!val || 'Field is required']"
          error-message="Please enter your street address"
         />
      </div>

      <div class="flex">
        <!-- city -->
        <div class="relative mb-6 inline-block flex-1">
          <q-input  class="pl-2"
            v-model="employeeDetails.city"
            label="City"
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter your city"
           />
        </div>
        <!-- postal_code -->
        <div class="relative mb-6 inline-block flex-1">
          <q-input  class="pl-2"
            v-model="employeeDetails.postal_code"
            label="Postal Code"
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter your postal code"
           />
        </div>

        <!-- country -->
        <div class="relative mb-6 inline-block flex-1">
          <q-input  class="pl-2"
            v-model="employeeDetails.country"
            label="Country"
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter your postal code"
           />
        </div>
      </div>

      <!-- Skills -->
      <label>Skills</label>
      <div>
        
        <div v-for="(skill, index) in employeeDetails.skills" class="flex justify-between">
          <q-input type="text"    
            v-model="employeeDetails.skills[index].skill" 
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter the skill"
            label="Skill" class="inline-block flex-1 ml-2" />

          <q-input type="number"  
            v-model="employeeDetails.skills[index].years_of_experience" 
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter the years of experience"
            label="Yrs Exp" class="inline-block flex-1 ml-2"  />

          <q-input type="text"    
            v-model="employeeDetails.skills[index].seniority_rating" 
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter your seniority rating"
            label="Seniority Rating" class="inline-block flex-1 ml-2"  />

          <q-btn class="ml-2" @click="deleteSkill(index)" icon="delete" />
        </div>

        <q-btn @click="addSkill()" icon="add" class="my-6 w-full">Add New skill</q-btn>
      </div>

      <!-- Register button -->
      <div class="">
        <q-btn
          type="button"
          class="inline-block rounded text-white  bg-fuchsia-950 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-600"
          icon="add"
          label="Save and Add Employee"
          @click="updateEmployee()"
           />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
