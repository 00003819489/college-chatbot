function processMessage(msg) {
  msg = msg.toLowerCase();

  // Check for day keywords for timetable
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  for (const day of days) {
    if (msg.includes(day)) {
      return getTimetable(day.charAt(0).toUpperCase() + day.slice(1));
    }
  }

  // Check for HOD queries
  if (msg.includes("hod") || msg.includes("head of department")) {
    if (msg.includes("ece")) return `HOD of ECE: ${collegeData.hods.ECE}`;
    if (msg.includes("cse")) return `HOD of CSE: ${collegeData.hods.CSE}`;
    if (msg.includes("eee")) return `HOD of EEE: ${collegeData.hods.EEE}`;
    return "Please specify the department (ECE, CSE, or EEE) to know the HOD.";
  }

  // Academic calendar queries
  if (msg.includes("academic calendar") || msg.includes("events")) {
    let eventsList = collegeData.academic_calendar
      .filter(e => e.semesters.includes("S3")) // you can customize semester logic
      .map(e => `${e.date} (${e.day}): ${e.event}`)
      .join('\n');
    return `Here are the upcoming academic events for S3:\n${eventsList}`;
  }

  // Exam dates queries
  if (msg.includes("exam") || msg.includes("examination") || msg.includes("test")) {
    let examsList = collegeData.exam_dates
      .filter(e => e.semesters.includes("S3"))
      .map(e => {
        if (e.start_date) return `${e.exam} starts on ${e.start_date}`;
        if (e.last_date) return `${e.exam} to be completed by ${e.last_date}`;
        return e.exam;
      })
      .join('\n');
    return `Upcoming exams for S3:\n${examsList}`;
  }

  return "Sorry, I can only provide timetable, HOD, academic calendar, and exam date info. Try asking about those!";
}
