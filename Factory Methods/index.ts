interface Person
{
    sayHi(): void;
}

class Student implements Person
{
    sayHi(): void
    {
        console.log('Hi, I am a student');
    }
}

class Teacher implements Person
{
    sayHi(): void
    {
        console.log('Hi, I am a teacher');
    }
}

abstract class SchoolEvent 
{
    abstract getPerson(): Person;
    sayHi(): void
    {
        this.getPerson().sayHi();
    }
}

class TeacherSchoolEvent extends SchoolEvent
{
    getPerson(): Person
    {
        return new Teacher();
    }
}

class StudentSchoolEvent extends SchoolEvent
{
    getPerson(): Person 
    {
        return new Student();
    }
}

class Commitee
{
    private schoolEvent: SchoolEvent = new StudentSchoolEvent();

    constructor(eventType: 'student' | 'teacher')
    {
        // Worry about the event type here or in a config file
        if (eventType == 'student')
        {
            this.schoolEvent = new StudentSchoolEvent();
        }
        else if (eventType == 'teacher')
        {
            this.schoolEvent = new TeacherSchoolEvent();
        }
    }

    runSchoolEvent(): void
    {
        // Use regular ev
        this.schoolEvent.sayHi();
    }
}

const schoolCommitee = new Commitee('student');
const facultyCommitee = new Commitee('teacher');

// Now we can keep code pretty ambiguous and not worry about the type of event
schoolCommitee.runSchoolEvent();
facultyCommitee.runSchoolEvent();