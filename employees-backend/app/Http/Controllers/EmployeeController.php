<?php

namespace App\Http\Controllers;

use App\Models\Skills;
use App\Models\Employee;
use App\Models\Employees_skills;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\JoinClause;

class EmployeeController extends Controller
{

    public function index(){
        $employees = Employee::all();
        return response()->json(['employees' => $employees], 200);
    }

    public function store(Request $request){
        try{
            $this->ValidateEntry($request);

            //Store the employee details
            $employee = Employee::create([
                'first_name'      => $request->input('first_name'),
                'last_name'       => $request->input('last_name'),
                'contact_number'  => $request->input('contact_number'),
                'email_address'   => $request->input('email_address'),
                'birth_date'      => $request->input('birth_date'),
                'street_address'  => $request->input('street_address'),
                'city'            => $request->input('city'),
                'postal_code'     => $request->input('postal_code'),
                'country'         => $request->input('country')
            ]);


            $skillsArray =  $request->input('skills');

            //Store the skills
            for($i = 0; $i < count($skillsArray); $i++){
                $storedSkill = Skills::create([
                    'skill'               => $skillsArray[$i]['skill'],
                    'years_of_experience' => $skillsArray[$i]['years_of_experience'],
                    'seniority_rating'    => $skillsArray[$i]['seniority_rating']
                ]);

                //Store the ids in the pivot table
                Employees_skills::create([
                    'employee_id' => $employee->id,
                    'skill_id'    => $storedSkill->id
                ]);
            }

            return response()->json(['success'=> true], 200);
        }catch (\Exception $e){
            return response()->json([
                'message' => 'something went wrong when storing the employee details',
                'error', 'message' => $e->getMessage()
            ]);
        }
    }

    public function ValidateEntry($request){
        $attributes = $request->validate([
            'first_name' => 'required|max:255',
            'last_name' => 'required|min:3|max:255',
            'contact_number'  => 'required',
            'email_address'  => 'required', 
            'birth_date'  => 'required', 
            'street_address'  => 'required',   
            'city'  => 'required',          
            'postal_code'  => 'required',   
            'country'  => 'required'       
        ]);

        return $attributes;
    }


    public function show($id){
        try {
            $employee = Employee::findOrFail($id);
            $skills   = Employees_skills::where('employee_id', $employee->id);

            $skills = DB::table('skills')
            ->select('skill', 'years_of_experience', 'seniority_rating')
            ->join('employees_skills', function (JoinClause $join, $employee) {
               $join->on('employees_skills.employee_id', '=', $employee->id);
            })
            ->get();


            return response()->json([
                'employee' => $employee,
                'skills'   => $skills
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong in when retrieving the employee',
                'error' => $e->getMessage()
            ], 400);
        }
    }
    public function update(Request $request, int $id){
        try {

            $this->ValidateEntry($request);

            $employee = Employee::findOrFail($id);
            $employee->first_name = $request->first_name;
            $employee->last_name = $request->last_name;
            $employee->contact_number = $request->contact_number;
            $employee->email_address = $request->email_address;
            $employee->birth_date = $request->birth_date;
            $employee->street_address = $request->street_address;
            $employee->city = $request->city;
            $employee->postal_code = $request->postal_code;
            $employee->country = $request->country;

            $employee->save();

            return response()->json(['message' => 'Employee details updated.'], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong when updating your employee details',
                'error' => $e->getMessage()
            ], 400);
        }
    }
    public function delete(int $id){
        try {
            $employee = Employee::findOrFail($id);
            $employee->delete();

            return response()->json(['message' => 'Employee deleted.'], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong when deleting your employee details',
                'error' => $e->getMessage()
            ], 400);
        }
    }

}
