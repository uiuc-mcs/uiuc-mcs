/**
 * Course data constants
 * This file contains all course information, requirements, and track definitions
 * 
 * Based on UIUC MCS Course Planner (https://github.com/uiucmcs/courseplanner)
 * Copyright (c) 2021 UIUC MCS Community
 * Licensed under the MIT License
 */

import { CourseId, CourseCode, CategoryId, TrackId, Semester } from './enums';
import { CourseData } from '../services/course-data.service';

export const COURSE_DATA: CourseData = {
  requirements: {
    total: {
      required: 8,
      minimum_credit: 32,
    },
    req: [
      {
        name: "Breadth Requirements",
        required: 4,
        minimum_credit: 12,
        categories: [
          { id: CategoryId.ARCHITECTURE, name: "Architecture, Compilers, Parallel Computing" },
          { id: CategoryId.ARTIFICIAL_INTELLIGENCE, name: "Artificial Intelligence" },
          { id: CategoryId.DATABASE_AND_INFORMATION_SYSTEMS, name: "Database & Information Systems" },
          { id: CategoryId.INTERACTIVE_COMPUTING, name: "Interactive Computing" },
          { id: CategoryId.PROGRAMMING_LANGUAGES, name: "Programming Languages, Formal Methods, Software Engineering" },
          { id: CategoryId.SCIENTIFIC_COMPUTING, name: "Scientific Computing" },
          { id: CategoryId.SECURITY_AND_PRIVACY, name: "Security & Privacy" },
          { id: CategoryId.SYSTEMS_AND_NETWORKING, name: "Systems & Networking" },
          { id: CategoryId.THEORY_AND_ALGORITHMS, name: "Theory & Algorithms" },
        ],
      },
      {
        name: "Advanced Coursework",
        required: 3,
        minimum_credit: 12,
        categories: [
          { id: CategoryId.ADVANCED_COURSEWORK, name: "Advanced Coursework (CS 500-level)" },
        ],
      },
      {
        name: "Electives",
        required: 1,
        minimum_credit: 4,
        categories: [
          { id: CategoryId.ELECTIVES, name: "Electives (Graduate-level)" },
        ],
      },
    ],
  },
  courses: [
    // Architecture, Compilers, Parallel Computing - Online Available
    { id: CourseId.PARALLEL_PROGRAMMING, code: CourseCode.CS_484, name: "Parallel Programming", semester: [Semester.SPRING], category: [CategoryId.ARCHITECTURE], creditOptions: [3, 4], creditHours: 4 },

    // Artificial Intelligence - Online Available
    { id: CourseId.ARTIFICIAL_INTELLIGENCE, code: CourseCode.CS_440, name: "Artificial Intelligence", semester: [Semester.SPRING], category: [CategoryId.ARTIFICIAL_INTELLIGENCE], creditOptions: [3, 4], creditHours: 4 },
    { id: CourseId.APPLIED_MACHINE_LEARNING, code: CourseCode.CS_441, name: "Applied Machine Learning", semester: [Semester.FALL, Semester.SPRING], category: [CategoryId.ARTIFICIAL_INTELLIGENCE], creditOptions: [3, 4], creditHours: 4 },
    { id: CourseId.COMPUTATIONAL_PHOTOGRAPHY, code: CourseCode.CS_445, name: "Computational Photography", semester: [Semester.SPRING], category: [CategoryId.ARTIFICIAL_INTELLIGENCE, CategoryId.INTERACTIVE_COMPUTING], creditOptions: [3, 4], creditHours: 4 },
    { id: CourseId.MACHINE_LEARNING, code: CourseCode.CS_446, name: "Machine Learning", semester: [Semester.FALL], category: [CategoryId.ARTIFICIAL_INTELLIGENCE], creditOptions: [3, 4], creditHours: 4 },
    { id: CourseId.NATURAL_LANGUAGE_PROCESSING, code: CourseCode.CS_447, name: "Natural Language Processing", semester: [Semester.FALL], category: [CategoryId.ARTIFICIAL_INTELLIGENCE], creditOptions: [3, 4], creditHours: 4 },
    { id: CourseId.DEEP_LEARNING_FOR_HEALTHCARE, code: CourseCode.CS_598, name: "Deep Learning for Healthcare", semester: [Semester.SPRING], category: [CategoryId.ARTIFICIAL_INTELLIGENCE, CategoryId.ADVANCED_COURSEWORK], prerequisite: { minimum: 0, courses: { mandatory: [], optional: [CourseId.APPLIED_MACHINE_LEARNING] } } },

    // Database & Information Systems - Online Available
    { id: CourseId.TEXT_INFORMATION_SYSTEMS, code: CourseCode.CS_410, name: "Text Information Systems", semester: [Semester.FALL], category: [CategoryId.DATABASE_AND_INFORMATION_SYSTEMS], creditOptions: [3, 4], creditHours: 4 },
    { id: CourseId.DATABASE_SYSTEMS, code: CourseCode.CS_411, name: "Database Systems", semester: [Semester.SPRING], category: [CategoryId.DATABASE_AND_INFORMATION_SYSTEMS], creditOptions: [3, 4], creditHours: 4 },
    { id: CourseId.INTRODUCTION_TO_DATA_MINING, code: CourseCode.CS_412, name: "Introduction to Data Mining", semester: [Semester.SPRING], category: [CategoryId.DATABASE_AND_INFORMATION_SYSTEMS], creditOptions: [3, 4], creditHours: 4 },

    // Interactive Computing - Online Available
    { id: CourseId.DATA_VISUALIZATION, code: CourseCode.CS_416, name: "Data Visualization", semester: [Semester.SUMMER], category: [CategoryId.INTERACTIVE_COMPUTING], creditOptions: [3, 4], creditHours: 4 },
    { id: CourseId.INTERACTIVE_COMPUTER_GRAPHICS, code: CourseCode.CS_418, name: "Interactive Computer Graphics", semester: [Semester.FALL, Semester.SPRING], category: [CategoryId.INTERACTIVE_COMPUTING], creditOptions: [3, 4], creditHours: 4 },
    { id: CourseId.SCIENTIFIC_VISUALIZATION, code: CourseCode.CS_519, name: "Scientific Visualization", semester: [Semester.SUMMER], category: [CategoryId.INTERACTIVE_COMPUTING, CategoryId.ADVANCED_COURSEWORK], creditHours: 4, prerequisite: { minimum: 0, courses: { mandatory: [], optional: [CourseId.INTERACTIVE_COMPUTER_GRAPHICS, CourseId.DATA_VISUALIZATION] } } },

    // Programming Languages, Formal Methods, Software Engineering - Online Available
    { id: CourseId.PROGRAMMING_LANGUAGES_AND_COMPILERS, code: CourseCode.CS_421, name: "Programming Languages and Compilers", semester: [Semester.SUMMER], category: [CategoryId.PROGRAMMING_LANGUAGES], creditOptions: [3, 4], creditHours: 4 },
    { id: CourseId.SOFTWARE_ENGINEERING_I, code: CourseCode.CS_427, name: "Software Engineering I", semester: [Semester.FALL], category: [CategoryId.PROGRAMMING_LANGUAGES], creditOptions: [3, 4], creditHours: 4 },
    { id: CourseId.FORMAL_MODELS_OF_COMPUTATION, code: CourseCode.CS_475, name: "Formal Models of Computation", semester: [Semester.FALL], category: [CategoryId.PROGRAMMING_LANGUAGES, CategoryId.THEORY_AND_ALGORITHMS], creditOptions: [3, 4], creditHours: 4 },

    // Scientific Computing - Online Available
    { id: CourseId.NUMERICAL_ANALYSIS, code: CourseCode.CS_450, name: "Numerical Analysis", semester: [Semester.FALL], category: [CategoryId.SCIENTIFIC_COMPUTING], creditOptions: [3, 4], creditHours: 4 },

    // Security & Privacy - Online Available
    { id: CourseId.COMPUTER_SECURITY_I, code: CourseCode.CS_461, name: "Computer Security I", semester: [Semester.FALL], category: [CategoryId.SECURITY_AND_PRIVACY], creditOptions: [3, 4], creditHours: 4 },
    { id: CourseId.COMPUTER_SECURITY_II, code: CourseCode.CS_463, name: "Computer Security II", semester: [Semester.SPRING], category: [CategoryId.SECURITY_AND_PRIVACY], creditOptions: [3, 4], creditHours: 4 },

    // Systems & Networking - Online Available
    { id: CourseId.DISTRIBUTED_SYSTEMS, code: CourseCode.CS_425, name: "Distributed Systems", semester: [Semester.FALL], category: [CategoryId.SYSTEMS_AND_NETWORKING], creditOptions: [3, 4], creditHours: 4 },
    { id: CourseId.CLOUD_NETWORKING, code: CourseCode.CS_435, name: "Cloud Networking", semester: [Semester.FALL], category: [CategoryId.SYSTEMS_AND_NETWORKING], creditOptions: [3, 4], creditHours: 4 },
    { id: CourseId.INTERNET_OF_THINGS, code: CourseCode.CS_437, name: "Internet of Things", semester: [Semester.FALL, Semester.SPRING], category: [CategoryId.SYSTEMS_AND_NETWORKING], creditOptions: [3, 4], creditHours: 4 },
    { id: CourseId.CLOUD_COMPUTING_APPLICATIONS, code: CourseCode.CS_498, name: "Cloud Computing Applications", semester: [Semester.SPRING], category: [CategoryId.SYSTEMS_AND_NETWORKING], creditOptions: [3, 4], creditHours: 4 },

    // Advanced Coursework (CS 500-level) - Online Available
    { id: CourseId.THEORY_AND_PRACTICE_OF_DATA_CURATION, code: CourseCode.CS_513, name: "Theory and Practice of Data Curation", semester: [Semester.SUMMER], category: [CategoryId.ADVANCED_COURSEWORK] },
    { id: CourseId.PRACTICAL_STATISTICAL_LEARNING, code: CourseCode.CS_598, name: "Practical Statistical Learning", semester: [Semester.FALL], category: [CategoryId.ADVANCED_COURSEWORK], prerequisite: { minimum: 1, courses: { mandatory: [], optional: [CourseId.TEXT_INFORMATION_SYSTEMS, CourseId.INTRODUCTION_TO_DATA_MINING, CourseId.APPLIED_MACHINE_LEARNING, CourseId.COMPUTATIONAL_PHOTOGRAPHY] } } },
    { id: CourseId.ADVANCED_BAYESIAN_MODELING, code: CourseCode.CS_598, name: "Advanced Bayesian Modeling", semester: [Semester.SPRING], category: [CategoryId.ADVANCED_COURSEWORK] },
    { id: CourseId.DATA_MINING_CAPSTONE, code: CourseCode.CS_598, name: "Data Mining Capstone", semester: [Semester.SUMMER], category: [CategoryId.ADVANCED_COURSEWORK], prerequisite: { minimum: 2, courses: { mandatory: [CourseId.TEXT_INFORMATION_SYSTEMS, CourseId.INTRODUCTION_TO_DATA_MINING], optional: [] } } },
    { id: CourseId.CLOUD_COMPUTING_CAPSTONE, code: CourseCode.CS_598, name: "Cloud Computing Capstone", semester: [Semester.FALL], category: [CategoryId.ADVANCED_COURSEWORK], prerequisite: { minimum: 2, courses: { mandatory: [CourseId.CLOUD_COMPUTING_APPLICATIONS], optional: [CourseId.DISTRIBUTED_SYSTEMS, CourseId.CLOUD_NETWORKING, CourseId.INTERNET_OF_THINGS] } } },
    { id: CourseId.TOPICS_IN_AUTOMATED_DEDUCTION, code: CourseCode.CS_576, name: "Topics in Automated Deduction", semester: [Semester.SPRING], category: [CategoryId.ADVANCED_COURSEWORK], creditHours: 4 },

    // Electives - Online Available
    { id: CourseId.FOUNDATIONS_OF_DATA_CURATION, code: CourseCode.CS_598, name: "Foundations of Data Curation", semester: [Semester.FALL], category: [CategoryId.ADVANCED_COURSEWORK] },
    { id: CourseId.METHODS_OF_APPLIED_STATISTICS, code: CourseCode.STAT_420, name: "Methods of Applied Statistics", semester: [Semester.SUMMER], category: [CategoryId.ELECTIVES] },
    { id: CourseId.AI_AGENTS_IN_THE_WILD, code: CourseCode.CS_498, name: "AI Agents in the Wild", semester: [Semester.SPRING], category: [CategoryId.ELECTIVES], creditOptions: [3, 4], creditHours: 4 },


    // CS 591 Seminars (not available for online students, but included for future reference)
    { id: CourseId.CS_591_COLLOQUIUM, code: CourseCode.CS_591, name: "CS Colloquium", semester: [], category: [CategoryId.ELECTIVES], creditHours: 1  },
    { id: CourseId.CS_591_STARTUP_SEMINAR, code: CourseCode.CS_591, name: "Computing Startup Seminar", semester: [], category: [CategoryId.ELECTIVES], creditHours: 1  },
    { id: CourseId.ADVANCED_SEMINAR, code: CourseCode.CS_591, name: "Other Advanced Seminar", semester: [], category: [CategoryId.ELECTIVES], creditHours: 1 },

    // Placeholder Electives - Pre-approved graduate courses
    // Graduate (400- and 500-level) coursework from Computer Science, other Grainger College of Engineering Departments,
    // MATH, STAT, or PHYS are pre-approved as elective courses. All other courses must receive prior approval.
    // { id: CourseId.CS_400_490_ELECTIVE, code: CourseCode.CS_400_490, name: "CS 400-level Elective", semester: [], category: [CategoryId.ELECTIVES], creditHours: 4 },
    // { id: CourseId.CS_500_590_ELECTIVE, code: CourseCode.CS_500_590, name: "CS 500-level Elective", semester: [], category: [CategoryId.ELECTIVES], creditHours: 4 },
    // { id: CourseId.MATH_400_ELECTIVE, code: CourseCode.MATH_400, name: "MATH 400-level Elective", semester: [], category: [CategoryId.ELECTIVES], creditHours: 4 },
    // { id: CourseId.MATH_500_ELECTIVE, code: CourseCode.MATH_500, name: "MATH 500-level Elective", semester: [], category: [CategoryId.ELECTIVES], creditHours: 4 },
    // { id: CourseId.STAT_400_ELECTIVE, code: CourseCode.STAT_400, name: "STAT 400-level Elective", semester: [], category: [CategoryId.ELECTIVES], creditHours: 4 },
    // { id: CourseId.STAT_500_ELECTIVE, code: CourseCode.STAT_500, name: "STAT 500-level Elective", semester: [], category: [CategoryId.ELECTIVES], creditHours: 4 },
    // { id: CourseId.PHYS_400_ELECTIVE, code: CourseCode.PHYS_400, name: "PHYS 400-level Elective", semester: [], category: [CategoryId.ELECTIVES], creditHours: 4 },
    // { id: CourseId.PHYS_500_ELECTIVE, code: CourseCode.PHYS_500, name: "PHYS 500-level Elective", semester: [], category: [CategoryId.ELECTIVES], creditHours: 4 },

    // General Electives: Pre-approved graduate courses
    // The online MCS program allows the following courses to satisfy the 1 elective requirement:
    // - CS 400-491: 400-level CS courses generally count toward breadth requirements, but can be counted as electives when appropriate
    // - CS 498: Special topics and applications courses (must be approved for graduate credit)
    // - CS 591: Seminars and colloquia (typically require in-person attendance, not available for online students)
    // - CS 500+: Advanced coursework courses (normally satisfy the 3 advanced coursework requirement)
    // - MATH, STAT, PHYS, or other Grainger department courses: When pre-approved as graduate-level electives
    //
    // Additional Requirements:
    // - Only 500-level and 400-level (when offered for graduate credit) coursework may be counted toward degree requirements
    // - A maximum of 4 hours of CS 491 and CS 591 may be applied toward the degree (not available for online students)
    // - Any course taken for letter grade must have a grade of C or higher
    // - A grade of B- or higher is required for the Breadth coursework
    // - The minimum program GPA is 3.0
  ],
  tracks: [
    {
      id: TrackId.ARTIFICIAL_INTELLIGENCE,
      name: "Artificial Intelligence",
      description: "Focus on machine learning, deep learning, and AI applications",
      requirements: [
        {
          name: "AI Courses",
          required: 3,
          courseIds: [CourseId.ARTIFICIAL_INTELLIGENCE, CourseId.APPLIED_MACHINE_LEARNING, CourseId.COMPUTATIONAL_PHOTOGRAPHY, CourseId.MACHINE_LEARNING, CourseId.NATURAL_LANGUAGE_PROCESSING, CourseId.DEEP_LEARNING_FOR_HEALTHCARE],
          description: "Must complete 3 courses from the AI specialty track"
        }
      ]
    },
    {
      id: TrackId.DATA_SCIENCE,
      name: "Data Science",
      description: "Specialized curriculum for data science with prescribed breadth and advanced coursework",
      requirements: [] // Special handling - see breadthAreas and advancedCourseIds below
    } as any, // Type cast due to DataScienceTrack complexity
    {
      id: TrackId.GRAPHICS_AND_VISUALIZATION,
      name: "Graphics and Visualization",
      description: "Specialized in graphics rendering and data visualization",
      requirements: [
        {
          name: "Graphics and Visualization Courses",
          required: 3,
          courseIds: [CourseId.DATA_VISUALIZATION, CourseId.INTERACTIVE_COMPUTER_GRAPHICS, CourseId.COMPUTATIONAL_PHOTOGRAPHY, CourseId.SCIENTIFIC_VISUALIZATION],
          description: "Must complete 3 courses from the graphics and visualization specialty track"
        }
      ]
    },
    {
      id: TrackId.INFORMATION_SYSTEMS,
      name: "Information Systems",
      description: "Focus on databases and information management",
      requirements: [
        {
          name: "Information Systems Courses",
          required: 3,
          courseIds: [CourseId.TEXT_INFORMATION_SYSTEMS, CourseId.DATABASE_SYSTEMS, CourseId.INTRODUCTION_TO_DATA_MINING, CourseId.THEORY_AND_PRACTICE_OF_DATA_CURATION, CourseId.DATA_MINING_CAPSTONE],
          description: "Must complete 3 courses from the information systems specialty track"
        }
      ]
    },
    {
      id: TrackId.NETWORKED_AND_DISTRIBUTED_SYSTEMS,
      name: "Networked and Distributed Systems",
      description: "Focus on distributed systems, cloud computing, and networking",
      requirements: [
        {
          name: "Distributed Systems Courses",
          required: 3,
          courseIds: [CourseId.DISTRIBUTED_SYSTEMS, CourseId.CLOUD_NETWORKING, CourseId.CLOUD_COMPUTING_APPLICATIONS, CourseId.CLOUD_COMPUTING_CAPSTONE],
          description: "Must complete 3 courses from the networked and distributed systems specialty track"
        }
      ]
    },
    {
      id: TrackId.SOFTWARE_ENGINEERING,
      name: "Software Engineering",
      description: "Focus on software design, engineering practices, and parallel computing",
      requirements: [
        {
          name: "Software Engineering Courses",
          required: 3,
          courseIds: [CourseId.PROGRAMMING_LANGUAGES_AND_COMPILERS, CourseId.DISTRIBUTED_SYSTEMS, CourseId.SOFTWARE_ENGINEERING_I, CourseId.PARALLEL_PROGRAMMING],
          description: "Must complete 3 courses from the software engineering specialty track"
        }
      ]
    }
  ],
  dataScience: {
    id: TrackId.DATA_SCIENCE,
    name: "Data Science",
    description: "Specialized curriculum for data science with prescribed breadth and advanced coursework",
    requirements: [],
    breadthAreas: [
      {
        name: "Machine Learning",
        required: 1,
        courseIds: [CourseId.APPLIED_MACHINE_LEARNING, CourseId.COMPUTATIONAL_PHOTOGRAPHY, CourseId.MACHINE_LEARNING, CourseId.NATURAL_LANGUAGE_PROCESSING, CourseId.DEEP_LEARNING_FOR_HEALTHCARE]
      },
      {
        name: "Data Mining",
        required: 1,
        courseIds: [CourseId.TEXT_INFORMATION_SYSTEMS, CourseId.DATABASE_SYSTEMS, CourseId.INTRODUCTION_TO_DATA_MINING]
      },
      {
        name: "Data Visualization",
        required: 1,
        courseIds: [CourseId.DATA_VISUALIZATION, CourseId.SCIENTIFIC_VISUALIZATION]
      },
      {
        name: "Cloud Computing",
        required: 1,
        courseIds: [CourseId.DISTRIBUTED_SYSTEMS, CourseId.CLOUD_NETWORKING, CourseId.INTERNET_OF_THINGS, CourseId.CLOUD_COMPUTING_APPLICATIONS]
      }
    ],
    advancedCourseIds: [CourseId.THEORY_AND_PRACTICE_OF_DATA_CURATION, CourseId.SCIENTIFIC_VISUALIZATION, CourseId.FOUNDATIONS_OF_DATA_CURATION, CourseId.PRACTICAL_STATISTICAL_LEARNING, CourseId.ADVANCED_BAYESIAN_MODELING, CourseId.DEEP_LEARNING_FOR_HEALTHCARE, CourseId.CLOUD_COMPUTING_CAPSTONE, CourseId.DATA_MINING_CAPSTONE],
    recommendedElectiveIds: [CourseId.INTERACTIVE_COMPUTER_GRAPHICS, CourseId.PROGRAMMING_LANGUAGES_AND_COMPILERS, CourseId.SOFTWARE_ENGINEERING_I, CourseId.NUMERICAL_ANALYSIS, CourseId.COMPUTER_SECURITY_I, CourseId.COMPUTER_SECURITY_II, CourseId.FORMAL_MODELS_OF_COMPUTATION, CourseId.PARALLEL_PROGRAMMING, CourseId.METHODS_OF_APPLIED_STATISTICS]
  } as any
};
