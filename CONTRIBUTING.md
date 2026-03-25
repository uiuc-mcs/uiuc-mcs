# Contributing to UIUC MCS

Thanks for your interest in contributing to [uiucmcs.org](https://uiucmcs.org)! Whether you want to add a course, fix a bug, or help build new features, we appreciate the help.

## Quick Contributions

### Adding a Course

Courses are stored in Firestore. To add a new course, open a PR that includes:

1. The course name and number (e.g. `CS-498 AI Agents in the Wild`)
2. A brief description
3. The category it belongs to (e.g. MCS Elective, Artificial Intelligence, etc.)
4. Which semesters it's offered (spring, summer, fall)
5. A link to a sample syllabus (if available)

If you're not sure about all the details, open an issue with what you have and we'll figure it out together.

### Adding or Updating a Syllabus

Syllabuses are stored as URLs on course records. If you have a syllabus link for a course that's missing one, open an issue or PR with:

- The course name
- A public URL to the syllabus (PDF, Google Doc, etc.)

### Reporting Bugs or Suggesting Improvements

Open an [issue](https://github.com/uiuc-mcs/uiuc-mcs/issues) describing what you found or what you'd like to see. Screenshots and steps to reproduce are always helpful for bugs.

## Larger Contributions

We're open to contributors who want to take on bigger efforts. Some areas where help is welcome:

- Improving the review system
- Building course planning tools
- Enhancing search and filtering
- UI/UX improvements
- Accessibility

For anything substantial, please open an issue first to discuss the approach before putting in the work. This helps avoid duplicated effort and ensures alignment with the project's direction.

## Development Setup

This is an Angular project backed by Firebase/Firestore.

1. Clone the repo
2. Run `npm install`
3. Run `ng serve` to start the dev server
4. Navigate to `http://localhost:4200/`

## Becoming a Maintainer

If you're an active contributor and want to take on a bigger role, reach out by opening an issue. We're open to bringing on maintainers to help manage the project.

## License

By contributing, you agree that your contributions will be licensed under the [AGPLv3](https://www.gnu.org/licenses/agpl-3.0.html).
