# Database Design


# Employee Collection


{
 id,
 name,
 email,
 ph,
 role,
 department,
 experience,
 skills[],
 resume,
 createdAt

}



# User Collection

{
 id,
 email,
 password,
 role
}



# Project Collection


{
 id,
 projectName,
 requiredSkills[],
 assignedEmployees[]
}
