const collegeData = {
  hods: {
    ECE: "Dr. Jobymol Jacob",
    CSE: "Dr. Binu V P",
    EEE: "Dr. Bindu V",
  },
  timetables: {
    S3: {
      ECE_A: {
        Monday: [
          { periods: "1-3", subject: "Lab", batch1: "LCD Lab", batch2: "AC Lab", time: "9:30-12:30" },
          { period: 4, subject: "Maths", time: "1:30-2:30" },
          { periods: "5-6", subject: "Minors / Remedial", time: "2:30-4:30" },
        ],
        Tuesday: [
          { periods: "1-2", subject: "AC", time: "9:30-11:30" },
          { period: 3, subject: "SSD", time: "11:30-12:30" },
          { periods: "4-5", subject: "LCD", time: "1:30-3:30" },
        ],
        Wednesday: [
          { periods: "1-2", subject: "Maths", time: "9:30-11:30" },
          { period: 3, subject: "EE", time: "11:30-12:30" },
          { periods: "4-5", subject: "AC", time: "1:30-3:30" },
        ],
        Thursday: [
          { period: 1, subject: "EE", time: "9:30-10:25" },
          { period: 2, subject: "SSD", time: "10:35-11:30" },
          { period: 3, subject: "Minor", time: "11:30-12:30" },
          { periods: "4-6", subject: "Lab", batch1: "AC Lab", batch2: "LCD Lab", time: "1:30-4:30" },
        ],
        Friday: [
          { period: 1, subject: "LCD", time: "9:30-10:20" },
          { periods: "2-3", subject: "AI DS", time: "10:30-12:00" },
          { periods: "4-5", subject: "SSD", time: "2:00-3:40" },
          { period: 6, subject: "LCD", time: "3:40-4:30" },
        ],
      },
      CSB: {
        Monday: [
          { period: 1, subject: "TOC", time: "9:30-10:25" },
          { period: 2, subject: "EESD", time: "10:35-11:30" },
          { period: 3, subject: "DSLD", time: "11:30-12:30" },
          { period: 4, subject: "OOP", time: "1:30-2:30" },
          { period: 5, subject: "MINOR", time: "2:30-3:30" },
          { period: 6, subject: "MINOR", time: "3:30-4:30" },
        ],
        Tuesday: [
          { periods: "1-2", subject: "Maths", time: "9:30-11:30" },
          { period: 3, subject: "OOP", time: "11:30-12:30" },
          { periods: "4-5", subject: "DSA", time: "1:30-3:30" },
          { period: 6, subject: "TOC", time: "3:30-4:30" },
        ],
        Wednesday: [
          { periods: "1-3", subject: "Lab", time: "9:30-12:30" },
          { period: 4, subject: "TOC", time: "1:30-2:30" },
          { period: 5, subject: "DSLD", time: "2:30-3:30" },
          { period: 6, subject: "OOP", time: "3:30-4:30" },
        ],
        Thursday: [
          { periods: "1-3", subject: "Lab", time: "9:30-12:30" },
          { period: 4, subject: "Maths", time: "1:30-2:30" },
          { period: 5, subject: "EESD", time: "2:30-3:30" },
          { period: 6, subject: "MINOR", time: "3:30-4:30" },
        ],
        Friday: [
          { period: 1, subject: "TOC", time: "9:30-10:20" },
          { period: 2, subject: "OOP", time: "10:30-11:10" },
          { period: 3, subject: "Maths", time: "11:10-12:00" },
          { periods: "4-5", subject: "DSLS", time: "2:00-3:40" },
          { period: 6, subject: "MINOR", time: "3:40-4:30" },
        ],
      },
    },
  },
  academic_calendar: {
    Odd_Semester_2025: [
      { date: "01/07/2025", day: "Tuesday", event: "Commencement of Classes" },
      { date: "07/07/2025", day: "Monday", event: "Semester Enrollment Begins" },
      { date: "14/07/2025", day: "Monday", event: "Semester Enrollment Ends" },
      { date: "16/07/2025", day: "Wednesday", event: "Last date for First Advisory Meeting" },
      { date: "18/07/2025", day: "Friday", event: "Course Selection and Mapping Begins" },
      { date: "30/07/2025", day: "Wednesday", event: "Course Selection and Mapping Ends" },
      { date: "04/08/2025", day: "Monday", event: "Last date for corrections in course selection and mapping on KTU portal" },
      { date: "05/08/2025", day: "Tuesday", event: "Exam Registration Begins" },
      { date: "11/08/2025", day: "Monday", event: "Exam Registration Ends (Student Level)" },
      { date: "18/08/2025", day: "Monday", event: "Exam Registration Ends (College Level Submission)" },
      { date: "23/08/2025", day: "Saturday", event: "First Series Test to be completed" },
      { date: "25/08/2025", day: "Monday", event: "KTU Mid Term Survey - Syllabus Coverage" },
      { date: "09/09/2025", day: "Tuesday", event: "Last date for Second Advisory Meeting" },
      { date: "11/09/2025", day: "Thursday", event: "Onam Vacation Begins" },
      { date: "15/10/2025", day: "Wednesday", event: "Second Series Test to be completed" },
      { date: "16/10/2025", day: "Thursday", event: "KTU Survey (2) - Syllabus Coverage" },
      { date: "18/10/2025", day: "Saturday", event: "Annual Sports Meet" },
      { date: "21/10/2025", day: "Tuesday", event: "End Semester Students Feedback (Mandatory)" },
      { date: "23/10/2025", day: "Thursday", event: "Class Ends. Publish Attendance & IA Marks" },
      { date: "24/10/2025", day: "Friday", event: "Last date for Entering Attendance on KTU Portal" },
      { date: "27/10/2025", day: "Monday", event: "Commencement of University Lab Examinations" },
      { date: "29/10/2025", day: "Wednesday", event: "Last date for Entering Internal Marks on KTU Portal" },
      { date: "13/11/2025", day: "Thursday", event: "Commencement of End Semester Examination" },
    ],
  },
  exam_dates: {
    // add exam dates later
  },
};
