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
    }
];

/**
 * Creates and stores a unique set of all available filter options
 * for dropdown population.
 */
const ALL_FILTERS = {
    departments: new Set(),
    classes: new Set(),
    professors: new Set(),
};

// Populate the sets by iterating over the mentee data
MENTEE_DATA.forEach(mentee => {
    // Departments
    ALL_FILTERS.departments.add(mentee.department);
    
    // Classes
    mentee.classes.forEach(cls => ALL_FILTERS.classes.add(cls));
    
    // Professors
    mentee.professors.forEach(prof => ALL_FILTERS.professors.add(prof));
});
