import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const employeeStore = defineStore('employeeStore', {
  state : () => ({
    employees: [],
    employee: {
      first_name: '',
      last_name: '',
      contact_number: 0,
      email_address: '',
      birth_date: '',
      street_address: '',
      city:'',
      postal_code:'',
      country:'',
      skills: []
    },
    errors: [],
    status:{
      name: '',
      message: ''
    }
  }),

  actions: {

    //Fetch Employee list
    async fetchEmployees() {
      const $this = this
      await axios.get('http://127.0.0.1:8000/api/employees', {
      })
      .then(function (response) {
        $this.employees = response.data.employees
      })
      .catch(function (error) {
        $this.errors.push(error)
      });
    },

    //Add Employee method
    async addEmployee(data) {

      const $this = this
      await axios.post('http://127.0.0.1:8000/api/employees', {
        first_name: data.first_name,
        last_name: data.last_name,
        email_address: data.email_address,
        contact_number: data.contact_number,
        birth_date : data.birth_date,
        street_address : data.street_address,
        city : data.city,
        postal_code : data.postal_code,
        country : data.country,
        skills: data.skills,
      })
      .then(function (response) {
        if(response.data.success){
          $this.status.name = 'added';
          $this.status.message = response.data.success;
        }
      })
      .catch(function (error) {
        return error;
      });
    },

    //Fetch employee details for the edit modal
    async fetchEmployee(id){
      const $this = this
      await axios.get(`http://127.0.0.1:8000/api/employees/${id}`, {
      })
      .then(function (response) {
        if(response.data.employee){
          $this.employee.first_name     = response.data.employee.first_name;
          $this.employee.last_name      = response.data.employee.last_name;
          $this.employee.email_address  = response.data.employee.email_address;
          $this.employee.contact_number = response.data.employee.contact_number;
          $this.employee.postal_code    = response.data.employee.postal_code;
          $this.employee.birth_date     = response.data.employee.birth_date;
          $this.employee.street_address = response.data.employee.street_address;
          $this.employee.city           = response.data.employee.city;
          $this.employee.country        = response.data.employee.country;
          $this.employee.first_name     = response.data.employee.first_name;


          $this.employee.skills = response.data.skills;

        }
      })
      .catch(function (error) {
        return error;
      });
    },

    //Update Employee method
    async updateEmployee(id){
      const $this = this
      await axios.post(`http://127.0.0.1:8000/api/employees/${id}/update`, {
        data:$this.employee
      })
      .then(function (response) {
        if(response.data.success){
          $this.status.name = 'updated';
          $this.status.message = response.data.success;
        }
      })
      .catch(function (error) {
        return error;
      });
    },

    //Delete Employee method
    async deleteEmployee(id){
      const $this = this
      await axios.post(`http://127.0.0.1:8000/api/employees/${id}/delete`, {
      })
      .then(function (response) {
        if(response){
          return response;
        }
      })
      .catch(function (error) {
        return error;
      });
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'employeeDetails',
        storage: localStorage,
      },
    ],
  },
})
