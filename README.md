
# NewGems

## Overview
NewGems is a proof of concept project designed to showcase my coding skills and expertise in modern web development. It features a full-stack application built with React.js and TypeScript on the front end, and .NET API on the back end, utilizing advanced technologies and design patterns to ensure robustness and scalability.

## Features
- **User Authentication**: Secure authentication implemented using JWT tokens.
- **Role and Permission Management**: Comprehensive role and permission management based on a random scenario.
- **Caching**: Efficient state management and caching handled on the front end using MobX.
- **CQRS Pattern**: Command Query Responsibility Segregation implemented using MediatoR.
- **SOLID Principles**: Adherence to SOLID principles in the back end for maintainable and scalable code.
- **Mapping and Validation**: Object-object mapping and model validation with Mapper and FluentValidation.
- **CI/CD Workflows**: Automated deployment workflows set up using Terraform.

## Technology Stack
### Front End
- **React.js**: A powerful library for building user interfaces.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **MobX**: A simple and scalable state management solution.

### Back End
- **.NET API**: Framework for building robust web APIs.
- **JWT**: JSON Web Tokens for secure authentication and authorization.
- **MediatoR**: Library for implementing CQRS and mediator patterns.
- **SOLID Principles**: Ensuring codebase maintainability and scalability.
- **Mapper**: For efficient object-object mapping.
- **FluentValidation**: Fluent API for model validation.

### Infrastructure
- **Terraform**: Infrastructure as Code (IaC) tool used for CI/CD workflows.

## Installation

### Prerequisites
- Node.js
- .NET SDK

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/NewGems.git
   ```

2. Navigate to the project directory:
   ```sh
   cd NewGems
   ```

3. Install front end dependencies:
   ```sh
   cd NG.SPA/ng.spa
   npm install
   ```

4. Install back end dependencies:
   ```sh
   cd ../NG.API
   dotnet restore
   ```

## Usage

### Running the Application
1. Start the back end server:
   ```sh
   cd server
   dotnet run
   ```

2. Start the front end development server:
   ```sh
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`.

## Code Structure

### Front End
- `src/`
  - `components/`: Contains React components.
  - `stores/`: MobX stores for state management.
  - `utils/`: Utility functions.
  - `services/`: API service calls.

### Back End
- `Controllers/`: API controllers.
- `Services/`: Business logic implementation.
- `Repositories/`: Data access logic.
- `Models/`: Data models and validation logic.
- `MediatoR/`: Handlers and requests for CQRS.
- `Configurations/`: Application configuration files.

### Infrastructure
- `terraform/`: Terraform scripts for setting up CI/CD workflows.

## Contributing
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request with your changes. Ensure your code adheres to the project's coding standards.

## License
This project is licensed under the MIT License.

## Acknowledgements
- [React.js](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MobX](https://mobx.js.org/)
- [.NET](https://dotnet.microsoft.com/)
- [MediatoR](https://github.com/jbogard/MediatR)
- [FluentValidation](https://fluentvalidation.net/)
- [Terraform](https://www.terraform.io/)

## Contact
For questions or feedback, please contact me at abdu.aziz.alzayed3@gmail.com .
