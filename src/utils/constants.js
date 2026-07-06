/**
 * EduGuide AI - Constants and Configuration
 * Contains System Prompt, Fallback Messages, Preset Questions, and Mock Data
 */

export const SYSTEM_PROMPT = `You are EduGuide AI, the official Student Helpdesk Assistant for our university.
Your sole purpose is to assist students, applicants, and visitors with university-related inquiries.

You are permitted to answer questions ONLY within the following categories:
1. ADMISSIONS: Application processes, entry requirements, document checklists, deadlines, and portals.
2. COURSES: Majors, degrees offered, course durations, syllabus info, and credits.
3. FEE STRUCTURE: Tuition fees, payment schedules, payment methods, refund policies, and extra costs.
4. SCHOLARSHIPS: Financial aid, academic scholarships, criteria, application processes, and deadlines.
5. CAMPUS SERVICES: Library, housing/hostels, dining, parking, sports facilities, and health centers.
6. TIMETABLE: Lecture hours, exam periods, schedule changes, and semester structures.
7. ACADEMIC CALENDAR: Semester start/end dates, holidays, enrollment periods, and graduation dates.
8. STUDENT SUPPORT: Tutoring, counseling, career advisor office, IT helpdesk, and disability services.
9. CONTACT INFO: Phone numbers, emails, building locations, and office hours for departments.

CRITICAL RULES:
- If the user's query is NOT related to the above university topics, you MUST decline to answer.
- Under no circumstances should you answer questions about general knowledge, programming, math exercises, creative writing, external news, celebrities, politics, recipes, or advice unrelated to the university.
- If a query is out-of-scope, respond EXACTLY with this message:
  "I'm EduGuide AI, your Student Helpdesk Assistant. I can help with admissions, courses, fees, scholarships, timetables, and campus services. Please ask a university-related question."
- Keep your tone friendly, professional, clear, and encouraging.
- Never hallucinate, fabricate deadlines, or make up contact numbers. If you do not know the answer to a university-related question, say: "I do not have the specific details on that topic in my records. Please contact the Student Support Desk at support@eduguide.edu or call +1 (555) 019-9800 for direct assistance."
`;

export const FALLBACK_RESPONSE = "I'm EduGuide AI, your Student Helpdesk Assistant. I can help with admissions, courses, fees, scholarships, timetables, and campus services. Please ask a university-related question.";

// Presets for the UI Suggestion Chips
export const PRESET_QUESTIONS = [
  {
    id: "apply",
    label: "How to Apply",
    text: "How can I apply for admission and what is the deadline?",
    category: "Admissions"
  },
  {
    id: "fees",
    label: "Tuition Fees",
    text: "How much is the average tuition fee per semester?",
    category: "Fees"
  },
  {
    id: "scholarships",
    label: "Scholarships Available",
    text: "What academic scholarships do you offer and who is eligible?",
    category: "Scholarships"
  },
  {
    id: "housing",
    label: "Campus Housing",
    text: "Does the university offer housing/hostels for students?",
    category: "Campus Services"
  },
  {
    id: "contact",
    label: "Contact Support",
    text: "What is the contact number and location of the IT support desk?",
    category: "Support"
  },
  {
    id: "outofscope",
    label: "Test Out-of-Scope",
    text: "Can you write a JavaScript function to reverse a string?",
    category: "Out of Scope"
  }
];

// Heuristic-based mock database for Simulation Mode (when API key is missing)
export const MOCK_KNOWLEDGE_BASE = [
  {
    keywords: ["apply", "admission", "deadline", "enroll", "registration"],
    answer: "To apply for admissions, please visit our online Portal at admissions.eduguide.edu. Fill out the application form and upload transcripts, letters of recommendation, and identity verification. The deadline for Fall semester admission is **August 15**, and for Spring semester is **December 1**."
  },
  {
    keywords: ["fee", "tuition", "payment", "refund", "cost"],
    answer: "Tuition fees depend on the program of study. For undergraduate programs, the average fee is **$6,500 per semester**. For postgraduate programs, it is **$8,000 per semester**. We offer payment plans (installment options). Full refunds are available if you withdraw before the first day of instruction."
  },
  {
    keywords: ["scholarship", "financial aid", "grant", "funding"],
    answer: "We offer several scholarships:\n1. **Merit-Based Scholarship**: Up to 50% tuition waiver for students with a GPA above 3.8.\n2. **Need-Based Aid**: For students demonstrating financial hardship.\n3. **Athletic Scholarship**: For outstanding student-athletes.\nApplications can be submitted via the Scholarships Tab in the portal by **June 30**."
  },
  {
    keywords: ["housing", "dorm", "hostel", "accommodation", "room", "campus services"],
    answer: "Yes, the university provides comfortable housing options including single rooms, double-shared rooms, and suites. On-campus residence includes high-speed Wi-Fi, dining services, and 24/7 security. Housing rates range from **$2,500 to $4,000 per semester**. Application forms are available on the Campus Housing portal."
  },
  {
    keywords: ["contact", "phone", "email", "support", "location", "help", "it support", "admissions office"],
    answer: "You can reach us through multiple channels:\n- **Admissions Office**: admissions@eduguide.edu | +1 (555) 019-9801 | Admin Building, 1st Floor\n- **IT Helpdesk**: support@eduguide.edu | +1 (555) 019-9800 | Library Basement, Room B12\n- **Student Counseling**: counseling@eduguide.edu | Wellness Center\nHours of operation: Monday to Friday, 9:00 AM - 5:00 PM."
  },
  {
    keywords: ["course", "major", "program", "degree", "class"],
    answer: "The university offers 45+ accredited programs across various domains, including Computer Science, Business Administration, Mechanical Engineering, Psychology, and Data Science. You can check the complete list of courses, syllabus requirements, and elective options in our online Course Catalog."
  },
  {
    keywords: ["timetable", "schedule", "exam", "calendar", "break", "holiday", "semester"],
    answer: "The current academic semester started on September 8 and concludes with final exams from December 14 to December 20. Lectures run Monday through Friday from 8:00 AM to 6:00 PM. You can view your personalized class and exam timetable in the Student Portal under the 'Schedules' tab."
  }
];
