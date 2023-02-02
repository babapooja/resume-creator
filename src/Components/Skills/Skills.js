import { Component } from "react";

class Skills extends Component {
  details = {};
  constructor(props) {
    super(props);
    if (this.props.details && Object.keys(this.props.details).length) {
      this.state = {
        skillsCount: this.props.details.length,
        skills: this.props.details,
      };
      this.skills = this.props.details;
    } else {
      this.state = {
        skillsCount: 1,
        skills: [],
      };
    }
    this.clearDetails();
  }

  clearDetails() {
    this.details = {
      skillLabel: null,
      skillSet: null,
    };
  }

  addSkills() {
    let count = this.state.skillsCount;
    count += count;
    this.setState({
      skillsCount: count,
    });
    this.clearDetails();
  }

  updateSkill(field, val, i) {
    const skills = this.state.skills;
    if (skills[i]) {
      this.details = { ...skills[i] };
    } else {
      this.clearDetails();
    }
    if (val != null && val !== undefined && val != "") {
      this.details[field] = val;
    }
    if (skills.length && this.state.skillsCount == skills.length) {
      skills.splice(i, 1, this.details);
    } else {
      skills.push({ ...this.details });
    }

    this.setState({
      skills,
    });

    this.props.onSkillsChange(this.state.skills);
  }

  render() {
    return (
      <div className="accordion col-9 mb-3" id="SkillsSection">
        <div className="accordion-item">
          <h2 className="accordion-header" id="SkillsHeading">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#skills"
              aria-expanded={this.props.isOpen}
              aria-controls="skills"
            >
              Skills
            </button>
          </h2>
          <div
            id="skills"
            className={`accordion-collapse collapse ${
              this.props.isOpen ? "show" : ""
            }`}
            aria-labelledby="SkillsHeading"
            data-bs-parent="#SkillsSection"
          >
            <div className="accordion-body">
              <div className="mb-1">
                <p className="fs-6 fw-lighter fst-italic">
                  *Enter skills in the text box ',' (comma) separated
                </p>
              </div>
              {[...Array(this.state.skillsCount)].map((e, i) => {
                return (
                  <div className="border p-3 rounded mb-3" key={i}>
                    {/* skill label */}
                    <div className="row mb-3">
                      <label className="form-label col-2">
                        Enter skill label
                      </label>
                      <div className="col-9">
                        <input
                          className="form-control col-4"
                          type="text"
                          value={this.state.skills[i]?.skillLabel}
                          onChange={(event) =>
                            this.updateSkill(
                              "skillLabel",
                              event.target.value,
                              i
                            )
                          }
                        />
                      </div>
                    </div>
                    {/* enter skills corresponding to the skill label */}
                    <div className="row">
                      <label className="form-label col-2">Enter skills</label>
                      <div className="col-9">
                        <input
                          className="form-control col-4"
                          type="text"
                          value={this.state.skills[i]?.skillSet}
                          onChange={(event) =>
                            this.updateSkill("skillSet", event.target.value, i)
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              <button
                className="btn btn-primary"
                onClick={() => this.addSkills()}
              >
                Add Skills
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
