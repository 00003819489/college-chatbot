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
        // add rest similarly
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
        // add rest similarly
      }
    },
  },
  academic_calendar: {
    Odd_Semester_2025: [
      { date: "01/07/2025", day: "Tuesday", event: "Commencement of Classes" },
      { date: "07/07/2025", day: "Monday", event: "Semester Enrollment Begins" },
      // add rest here
    ]
  },
  exam_dates: {
    // can be added later
  }
};
