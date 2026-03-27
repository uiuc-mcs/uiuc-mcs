/**
 * Enum definitions for all courses, categories, tracks, and other constants
 * This file serves as the single source of truth for all identifiers in the planner
 */

export enum CourseId {
  // Architecture, Compilers, Parallel Computing
  PARALLEL_PROGRAMMING = 'prp',

  // Artificial Intelligence
  ARTIFICIAL_INTELLIGENCE = 'ai440',
  APPLIED_MACHINE_LEARNING = 'aml',
  COMPUTATIONAL_PHOTOGRAPHY = 'cph',
  MACHINE_LEARNING = 'ai446',
  NATURAL_LANGUAGE_PROCESSING = 'nlp',
  DEEP_LEARNING_FOR_HEALTHCARE = 'dlh',

  // Database & Information Systems
  TEXT_INFORMATION_SYSTEMS = 'tis',
  DATABASE_SYSTEMS = 'dbs',
  INTRODUCTION_TO_DATA_MINING = 'idm',

  // Interactive Computing
  DATA_VISUALIZATION = 'dvz',
  INTERACTIVE_COMPUTER_GRAPHICS = 'icg',
  SCIENTIFIC_VISUALIZATION = 'svz',

  // Programming Languages, Formal Methods, Software Engineering
  PROGRAMMING_LANGUAGES_AND_COMPILERS = 'plc',
  SOFTWARE_ENGINEERING_I = 'swi',
  FORMAL_MODELS_OF_COMPUTATION = 'fmc',

  // Scientific Computing
  NUMERICAL_ANALYSIS = 'nma',

  // Security & Privacy
  COMPUTER_SECURITY_I = 'sec1',
  COMPUTER_SECURITY_II = 'cse',

  // Systems & Networking
  DISTRIBUTED_SYSTEMS = 'dst',
  CLOUD_NETWORKING = 'cnt',
  INTERNET_OF_THINGS = 'iot',
  CLOUD_COMPUTING_APPLICATIONS = 'cca',

  // Advanced Coursework (CS 500-level)
  THEORY_AND_PRACTICE_OF_DATA_CURATION = 'tpd',
  PRACTICAL_STATISTICAL_LEARNING = 'psl',
  ADVANCED_BAYESIAN_MODELING = 'adm',
  DATA_MINING_CAPSTONE = 'dmc',
  CLOUD_COMPUTING_CAPSTONE = 'ccc',

  // Electives
  FOUNDATIONS_OF_DATA_CURATION = 'fdoc',
  METHODS_OF_APPLIED_STATISTICS = 'stat420',
  AI_AGENTS_IN_THE_WILD = 'aiaw',
  ADVANCED_SEMINAR = 'ads',
  CS_591_COLLOQUIUM = 'coll',
  CS_591_STARTUP_SEMINAR = 'css',
  TOPICS_IN_AUTOMATED_DEDUCTION = 'tad',

  // Placeholder Electives
  CS_400_490_ELECTIVE = 'cs400-490',
  CS_500_590_ELECTIVE = 'cs500-590',
  MATH_400_ELECTIVE = 'math400',
  MATH_500_ELECTIVE = 'math500',
  STAT_400_ELECTIVE = 'stat400',
  STAT_500_ELECTIVE = 'stat500',
  PHYS_400_ELECTIVE = 'phys400',
  PHYS_500_ELECTIVE = 'phys500',
}

export enum CourseCode {
  CS_410 = 'CS 410',
  CS_411 = 'CS 411',
  CS_412 = 'CS 412',
  CS_416 = 'CS 416',
  CS_418 = 'CS 418',
  CS_421 = 'CS 421',
  CS_425 = 'CS 425',
  CS_427 = 'CS 427',
  CS_435 = 'CS 435',
  CS_437 = 'CS 437',
  CS_440 = 'CS 440',
  CS_441 = 'CS 441',
  CS_445 = 'CS 445',
  CS_446 = 'CS 446',
  CS_447 = 'CS 447',
  CS_450 = 'CS 450',
  CS_461 = 'CS 461',
  CS_463 = 'CS 463',
  CS_475 = 'CS 475',
  CS_484 = 'CS 484',
  CS_498 = 'CS 498',
  CS_513 = 'CS 513',
  CS_519 = 'CS 519',
  CS_576 = 'CS 576',
  CS_591 = 'CS 591',
  CS_598 = 'CS 598',
  STAT_420 = 'STAT 420',

  // Placeholder Elective Codes
  CS_400_490 = 'CS 400-490,498',
  CS_500_590 = 'CS 500-590,598',
  MATH_400 = 'MATH 400+',
  MATH_500 = 'MATH 500+',
  STAT_400 = 'STAT 400+',
  STAT_500 = 'STAT 500+',
  PHYS_400 = 'PHYS 400+',
  PHYS_500 = 'PHYS 500+',
}

export enum CategoryId {
  // Breadth Categories
  ARCHITECTURE = 'arch-1',
  ARTIFICIAL_INTELLIGENCE = 'ai-1',
  DATABASE_AND_INFORMATION_SYSTEMS = 'db-1',
  INTERACTIVE_COMPUTING = 'ic-1',
  PROGRAMMING_LANGUAGES = 'pl-1',
  SCIENTIFIC_COMPUTING = 'sci-1',
  SECURITY_AND_PRIVACY = 'sec-1',
  SYSTEMS_AND_NETWORKING = 'sys-1',
  THEORY_AND_ALGORITHMS = 'thy-1',

  // Special Categories
  ADVANCED_COURSEWORK = 'adv-1',
  ELECTIVES = 'elec-1',
}

export enum TrackId {
  ARTIFICIAL_INTELLIGENCE = 'ai',
  DATA_SCIENCE = 'ds',
  GRAPHICS_AND_VISUALIZATION = 'graphics',
  INFORMATION_SYSTEMS = 'info-systems',
  NETWORKED_AND_DISTRIBUTED_SYSTEMS = 'network-dist',
  SOFTWARE_ENGINEERING = 'software-eng',
}

export enum Semester {
  SPRING = 'spring',
  SUMMER = 'summer',
  FALL = 'fall',
}

export const SEMESTER_DISPLAY = {
  [Semester.SPRING]: 'Spring',
  [Semester.SUMMER]: 'Summer',
  [Semester.FALL]: 'Fall',
};

export const TOTAL_BOXES = 9;
export const DEFAULT_CREDITS = 4;
