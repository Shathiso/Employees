<script setup>
  import {ref, inject, defineEmits, computed} from "vue"

  import { useQuasar } from 'quasar'

  const $q = useQuasar();
  const $emit = defineEmits(['close']);

   //Inject the store
  const $store = inject('store');
  const $employeeStore = $store.employeeStore();

  let first_name = ref('');
  let last_name = ref('');
  let email_address = ref('');
  let contact_number  = ref('');
  let birth_date  = ref('');
  let street_address  = ref('');
  let city  = ref('');  
  let postal_code   = ref('');
  let country    = ref('');

  const disableBtn  = computed(() => {
    return ( first_name.value == '' && last_name.value == '' &&
             email_address.value == '' && contact_number.value == '' &&
             birth_date.value == '' && street_address.value == '' &&
             city.value == '' && postal_code.value == '' && country.value  == ''
            ) ? true : false;
  });

  let skills = ref([
    {
      skill: '',
      years_of_experience: '',
      seniority_rating: ''
    }
  ]); // eg. { skill: "", years_of_experience: 0, seniority_rating: '' }


  function addSkill(){
    skills.value.push({
      skill: '',
      years_of_experience: '',
      seniority_rating: ''
    })
  }

  function deleteSkill(index){
    skills.value.splice(index, 1);
  }

  //Watching the store for changes to the state
  $employeeStore.$subscribe((mutation, state) => {

    if(state.status.name == 'added'){

      setTimeout(() => {
        $q.loading.hide()

        //clear the fields
        clearFields();

        //Emit and close the modal
        $emit('close');

        //Display the notification
        $q.notify('Employee details were added successfully..');

        //Reset the store status 
        $employeeStore.$patch((state) => {
          state.status = {
              name: '',
              message: ''
            }
        });

        //Fetch the latest Employees
        $employeeStore.fetchEmployees();
      }, 4000);
    }
  })


  function addEmployee(){
    //Prepare the data
    let data = {
      first_name: first_name.value,
      last_name: last_name.value,
      email_address: email_address.value,
      contact_number: contact_number.value,
      birth_date : birth_date.value,
      street_address : street_address.value,
      city : city.value,
      postal_code : postal_code.value,
      country : country.value,
      skills: skills._rawValue,
    }

    //Store the employee details
    $employeeStore.addEmployee(data);

    //Display the loader 
    $q.loading.show({
      delay: 0 // ms
    })
  }


  function clearFields(){
     first_name.value = '';
     last_name.value = '';
     email_address.value = '';
     contact_number.value = '';
     birth_date.value = '';
     street_address.value = '';
     city.value = '';
     postal_code.value = '';
     country.value = '';
     skills.value = '';
  }

</script>

<template>
  <div class=" absolute left-0 top-0 h-[98vh] overflow-y-scroll overflow-x-hidden max-w-[850px] w-[50%]  flex flex-nowrap flex-col rounded-md justify-center align-items-center text-center pt-[20px] pb-[20px] px-6 bg-white" >
    <q-btn @click="$emit('close')" class="absolute right-4 top-4 mb-6 text-black" label="Close"/>
    <h1 class="text-3xl mb-8 text-black">New employee</h1>
    <div class="flex align-items-center text-center flex-nowrap flex-col ">   
      
      <label class="text-black">Basic Info</label>
      
      <div class="flex ">
        <!-- Firstname input -->
        <div class="relative mb-6 inline-block flex-1">
          <q-input  class="pl-2"
            v-model="first_name"
            label="First name"
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter your first name"
           />
        </div>
        <!-- Lastname input -->
        <div class="relative mb-6 inline-block flex-1">
          <q-input  class="pl-2"
            v-model="last_name"
            label="Last name"
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter your last name"
           />
        </div>
      </div>

      <div class="flex">
        <!-- Contact number input -->
        <div class="relative mb-6 inline-block flex-1">
          <q-input  class="pl-2"
            v-model="contact_number"
            label="Contact Number"
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter your contact number"
          />
        </div>

        <!-- Email input -->
        <div class="relative mb-6 inline-block flex-1">
          <q-input  class="pl-2"
            v-model="email_address"
            label="Email"
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter your email address"
          />
        </div>
      </div>

      <!-- birth_date -->
      <div class="relative mb-6">
        <q-input  class="pl-2"
          v-model="birth_date"
          type="date"
          label="Birth Date"
          :rules="[val => !!val || 'Field is required']"
          error-message="Please enter your birth date"
        />
      </div>


      <label class="text-black">Address Info</label>
      <!-- street_address -->
      <div class="relative mb-6">
        <q-input  class="pl-2"
          v-model="street_address"
          label="Street Address"
          :rules="[val => !!val || 'Field is required']"
          error-message="Please enter your street address"
         />
      </div>

      <div class="flex">
        <!-- city -->
        <div class="relative mb-6 inline-block flex-1">
          <q-input  class="pl-2"
            v-model="city"
            label="City"
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter your city"
           />
        </div>
        <!-- postal_code -->
        <div class="relative mb-6 inline-block flex-1">
          <q-input  class="pl-2"
            v-model="postal_code"
            label="Postal Code"
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter your postal code"
           />
        </div>

        <!-- country -->
        <div class="relative mb-6 inline-block flex-1">
          <q-input  class="pl-2"
            v-model="country"
            label="Country"
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter your postal code"
           />
        </div>
      </div>

      <!-- Skills -->
      <label class="text-black">Skills</label>
      <div>
        
        <div v-for="(skill, index) in skills" class="flex justify-between">
          <q-input type="text"    
            v-model="skills[index].skill" label="Skill" 
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter the skill"
            class="inline-block flex-1 ml-2" />

          <q-input type="number"  
            v-model="skills[index].years_of_experience" 
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter the years of experience"
            label="Yrs Exp" class="inline-block flex-1 ml-2"  />

          <q-input type="text"   
            v-model="skills[index].seniority_rating" 
            :rules="[val => !!val || 'Field is required']"
            error-message="Please enter your seniority rating"
            label="Seniority Rating" class="inline-block flex-1 ml-2"  />

          <q-btn class="ml-2 max-w-[16px] h-[16] relative top-[10px]" @click="deleteSkill(index)" v-if="index > 0"  icon="trash" />
        </div>

        <q-btn @click="addSkill()" icon="add" class="my-6 w-full text-black">Add New skill</q-btn>
      </div>

      <!-- Add Employee Button -->
      <div class="">
        <q-btn
          type="button"
          class="inline-block rounded text-white  bg-fuchsia-950 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-600"
          icon="add"
          label="Save and Add Employee"
          :disable="disableBtn"
          @click="addEmployee()"
           />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
