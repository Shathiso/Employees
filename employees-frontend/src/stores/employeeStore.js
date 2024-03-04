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

    async fetchEmployee(id){
      const $this = this
      await axios.get(`http://127.0.0.1:8000/api/employees/${id}`, {
      })
      .then(function (response) {
        if(response.employee){
          $this.employee.first_name     = response.employee.first_name;
          $this.employee.last_name      = response.employee.last_name;
          $this.employee.email_address  = response.employee.email_address;
          $this.employee.contact_number = response.employee.contact_number;
          $this.employee.postal_code    = response.employee.postal_code;
          $this.employee.birth_date     = response.employee.birth_date;
          $this.employee.street_address = response.employee.street_address;
          $this.employee.city           = response.employee.city;
          $this.employee.country        = response.employee.country;
          $this.employee.first_name     = response.employee.first_name;


          $this.employee.skills = response.skills;

          let employee = {
             data:response.employee,
             skills:response.skills
          }

          return employee;
        }
      })
      .catch(function (error) {
        return error;
      });
    },

    async updateEmployee(id, data){
      const $this = this
      await axios.put(`http://127.0.0.1:8000/api/employees/${id}`, {
        data:data
      })
      .then(function (response) {
        if(response){
          return response;
        }
      })
      .catch(function (error) {
        return error;
      });
    },

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
