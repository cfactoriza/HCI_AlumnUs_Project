// Mentee Data (Simulating Local Storage / Initial Load)
// This array contains the student data that mentors can filter and search.

const MENTEE_DATA = [
    {
        id: 1,
        name: "Anya Sharma",
        university: "Tech University of California",
        major: "Computer Science",
        department: "Engineering",
        classes: ["Data Structures", "Algorithms"],
        professors: ["Dr. Kim", "Prof. Lee"],
        image: "https://placehold.co/70x70/2563eb/ffffff?text=AS"
    },
    {
        id: 2,
        name: "Marco Rossi",
        university: "City Business School",
        major: "Finance",
        department: "Business",
        classes: ["Corporate Accounting", "Investment Banking"],
        professors: ["Dr. Smith", "Prof. Johnson"],
        image: "https://placehold.co/70x70/10b981/ffffff?text=MR"
    },
    {
        id: 3,
        name: "Chloe Davis",
        university: "Tech University of California",
        major: "Electrical Engineering",
        department: "Engineering",
        classes: ["Digital Systems", "Linear Circuits"],
        professors: ["Prof. Lee", "Dr. Chen"],
        image: "https://placehold.co/70x70/f59e42/ffffff?text=CD"
    },
    {
        id: 4,
        name: "Javier Lopez",
        university: "Central State Arts College",
        major: "Graphic Design",
        department: "Arts",
        classes: ["Digital Media", "Typography"],
        professors: ["Dr. Miller"],
        image: "https://placehold.co/70x70/6366f1/ffffff?text=JL"
    },
    {
        id: 5,
        name: "Li Wei",
        university: "City Business School",
        major: "Marketing",
        department: "Business",
        classes: ["Market Research", "Consumer Behavior"],
        professors: ["Dr. Smith", "Prof. Brown"],
        image: "https://placehold.co/70x70/ef4444/ffffff?text=LW"
    },
    {
        id: 6,
        name: "Aisha Khan",
        university: "Tech University of California",
        major: "Mechanical Engineering",
        department: "Engineering",
        classes: ["Thermodynamics", "Fluid Mechanics"],
        professors: ["Dr. Kim", "Dr. Chen"],
        image: "https://placehold.co/70x70/8b5cf6/ffffff?text=AK"
    },
    {
        id: 7,
        name: "Samuel Green",
        university: "Central State Arts College",
        major: "Photography",
        department: "Arts",
        classes: ["Digital Media", "Photojournalism"],
        professors: ["Dr. Miller", "Prof. Davis"],
        image: "https://placehold.co/70x70/22c55e/ffffff?text=SG"
    },
    {
        id: 8,
        name: "Elena Petrova",
        university: "Tech University of California",
        major: "Computer Science",
        department: "Engineering",
        classes: ["Operating Systems", "Database Systems"],
        professors: ["Dr. Kim", "Prof. Lee"],
        image: "https://placehold.co/70x70/f43f5e/ffffff?text=EP"
    },
    {
        id: 9,
        name: "David Brown",
        university: "City Business School",
        major: "Accounting",
        department: "Business",
        classes: ["Corporate Accounting", "Taxation"],
        professors: ["Dr. Smith", "Prof. Johnson"],
        image: "https://placehold.co/70x70/14b8a6/ffffff?text=DB"
    },
    {
        id: 10,
        name: "Sofia Martinez",
        university: "Central State Arts College",
        major: "Fine Arts",
        department: "Arts",
        classes: ["Art History", "Painting Techniques"],
        professors: ["Dr. Miller", "Prof. Davis"],
        image: "https://placehold.co/70x70/fbbf24/ffffff?text=SM"
    }
];

/**
 * Creates and stores a unique set of all available filter options
 * for dropdown population.
 */
const ALL_FILTERS = {
    departments: new Set(),
    majors: new Set(),
    classes: new Set(),
    professors: new Set(),
    universities: new Set(),
};

// Populate the sets by iterating over the mentee data
MENTEE_DATA.forEach(mentee => {
    // Departments
    ALL_FILTERS.departments.add(mentee.department);
    // Majors
    if (mentee.major) ALL_FILTERS.majors.add(mentee.major);
    // Universities
    if (mentee.university) ALL_FILTERS.universities.add(mentee.university);
    
    // Classes
    mentee.classes.forEach(cls => ALL_FILTERS.classes.add(cls));
    
    // Professors
    mentee.professors.forEach(prof => ALL_FILTERS.professors.add(prof));
});
