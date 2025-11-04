import Student from "../models/student.js"
export function getStudent(req,res){ 
    
        Student.find().then(
            (students)=>{
                res.json(
                    students
                )
            }
        ).
        catch(
            ()=>{
                res.json(
                    {
                        message:"failed"
                    }
                )
            }
        )
}

export function createStudent(req,res){
    console.log(req.user);
    if(req.user.role !="admin")
    {
        res.json(
            {
                message:"you must be an admin to create a student"
            }
          
        )
          return
    }
    const student=new Student({
        name:req.body.name,
        age:req.body.age,
        city:req.body.city
    })

    
    student.save().then(
        ()=>{
            res.json(
                {
                    message:"Student created successfully"
                }
            )
        }
    ).catch(
        ()=>{
            res.json(
                {
                    message:"Student creation is failed"
                }
            )
        }
    )
}