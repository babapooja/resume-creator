import { Component } from "react";

class Projects extends Component {
  details = {};
  // projects = [];

  constructor(props) {
    super(props);
    if (this.props.details.length) {
      this.state = {
        projectCount: this.props.details.length,
        projects: this.props.details,
      };
    } else {
      this.state = {
        projectCount: 1,
        projects: [],
      };
    }
    this.clearDetails();
  }

  addProject() {
    let count = this.state.projectCount + 1;
    this.setState({
      projectCount: count,
    });
    this.clearDetails();
  }

  clearDetails() {
    this.details = {
      projectName: null,
      description: null,
    };
  }

  updateDetails(fieldName, val, i) {
    const projects = this.state.projects;
    if (projects[i]) {
      this.details = { ...projects[i] };
    } else {
      this.clearDetails();
    }
    this.details[fieldName] = val;

    if (projects.length && this.state.projectCount == projects.length) {
      projects.splice(i, 1, this.details);
    } else {
      projects.push({ ...this.details });
    }
    this.setState({
      projects,
    });
    this.props.onProjectsChange(this.state.projects);
  }

  render() {
    return (
      <div className="accordion col-9 mb-3" id="ProjectsSection">
        <div className="accordion-item">
          <h2 className="accordion-header" id="projectsHeading">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#projects"
              aria-expanded={this.props.isOpen}
              aria-controls="projects"
            >
              Projects
            </button>
          </h2>
          <div
            id="projects"
            className={`accordion-collapse collapse ${
              this.props.isOpen ? "show" : ""
            }`}
            aria-labelledby="projectsHeading"
            data-bs-parent="#ProjectsSection"
          >
            <div className="accordion-body">
              {[...Array(this.state.projectCount)].map((e, i) => (
                <div className="border rounded p-3 mb-3" key={i}>
                  {/* Project Name */}
                  <div className="row mb-3">
                    <label className="form-label col-2">Project Name</label>
                    <div className="col-7">
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.projects[i]?.projectName}
                        onChange={(event) =>
                          this.updateDetails(
                            "projectName",
                            event.target.value,
                            i
                          )
                        }
                      />
                    </div>
                  </div>
                  {/* Description */}
                  <div className="row">
                    <label className="form-label col-2">Description</label>
                    <div className="col-7">
                      <textarea
                        className="form-control"
                        value={this.state.projects[i]?.description}
                        onChange={(event) =>
                          this.updateDetails(
                            "description",
                            event.target.value,
                            i
                          )
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
              <button
                className="btn btn-primary"
                onClick={() => this.addProject()}
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
