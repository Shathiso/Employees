import { describe, it, expect } from 'vitest'

import { mount, shallowMount } from '@vue/test-utils'
import AddEmployee from '../AddEmployee.vue'
import EditEmployee from '../EditEmployee.vue'
import EmployeeList from '../../views/EmployeeList.vue'


describe('EmployeeList', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(EmployeeList)
    expect(wrapper.text()).toContain('Employees')
  })
})

describe('AddEmployee', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(AddEmployee)
    expect(wrapper.text()).toContain('New employee')
  })
})

describe('EditEmployee', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(EditEmployee, { props: { id: 1 } })
    expect(wrapper.text()).toContain('Edit employee')
  })
})



