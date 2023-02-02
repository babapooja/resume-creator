import { Component } from "react";

class WorkExperience extends Component {
  details = {};
  // workExperienceDetails = [];
  constructor(props) {
    super(props);
    if (this.props.details.length) {
      this.state = {
        isCurrentEmployer: true,
        workExperienceCount: this.props.details.length,
        workExperienceDetails: this.props.details,
      };
      // this.workExperienceDetails = this.props.details;
    } else {
      this.state = {
        isCurrentEmployer: true,
        workExperienceCount: 1,
        workExperienceDetails: [],
      };
    }

    this.clearDetails();
  }

  // handle checkbox click event
  handleCheckBox(val, i) {
    const workExperienceDetails = this.state.workExperienceDetails;
    workExperienceDetails[i].isCurrentEmployer = val;
  }

  // handle add work experience button click event
  addWorkExperience() {
    let count = this.state.workExperienceCount;
    count += 1;
    this.setState({
      workExperienceCount: count,
    });
    this.clearDetails();
  }

  clearDetails() {
    this.details = {
      companyName: null,
      startDate: null,
      endDate: null,
      isCurrentEmployer: true,
      description: null,
      role: null,
      location: null,
    };
  }

  updateDetails(fieldName, value, i) {
    const workExperienceDetails = this.state.workExperienceDetails;
    console.log(workExperienceDetails);
    if (workExperienceDetails[i]) {
      this.details = { ...workExperienceDetails[i] };
    } else {
      this.clearDetails();
    }
    this.details[fieldName] = value;

    if (
      workExperienceDetails?.length &&
      this.state.workExperienceCount == this.state.workExperienceDetails.length
    ) {
      workExperienceDetails.splice(i, 1, this.details);
    } else {
      workExperienceDetails.push({ ...this.details });
    }
    this.setState({
      workExperienceDetails,
    });
    this.props.onWorkExperienceChange(this.state.workExperienceDetails);
  }

  render() {
    return (
      <div className="accordion col-9 mb-3" id="WorkExperienceSection">
        <div className="accordion-item">
          <h2 className="accordion-header" id="workExperienceHeading">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#workExperience"
              aria-expanded={this.props.isOpen}
              aria-controls="workExperience"
            >
              Work Experience
            </button>
          </h2>
          <div
            id="workExperience"
            className={`accordion-collapse collapse ${
              this.props.isOpen ? "show" : ""
            }`}
            aria-labelledby="workExperienceHeading"
            data-bs-parent="#WorkExperienceSection"
          >
            <div className="accordion-body">
              {[...Array(this.state.workExperienceCount)].map((e, i) => (
                <div className="border p-3 mb-3 rounded" key={i}>
                  {/* Company Name */}
                  <div className="row mb-3">
                    <label className="form-label col-2">Company Name</label>
                    <div className="col-7">
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.workExperienceDetails[i]?.companyName}
                        onChange={(event) =>
                          this.updateDetails(
                            "companyName",
                            event.target.value,
                            i
                          )
                        }
                      />
                    </div>
                  </div>
                  <div>
                    {/* Role */}
                    <div className="row mb-3">
                      <label className="form-label col-2">Role</label>
                      <div className="col-7">
                        <input
                          className="form-control"
                          type="text"
                          value={this.state.workExperienceDetails[i]?.role}
                          onChange={(event) =>
                            this.updateDetails("role", event.target.value, i)
                          }
                        />
                      </div>
                    </div>
                    {/* LOCATION */}
                    <div className="row mb-3">
                      <label className="form-label col-2">Location</label>
                      <div className="col-7">
                        <input
                          className="form-control"
                          type="text"
                          value={this.state.workExperienceDetails[i]?.location}
                          onChange={(event) =>
                            this.updateDetails(
                              "location",
                              event.target.value,
                              i
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {/* Description */}
                  <div className="row mb-3">
                    <label className="form-label col-2">Description</label>
                    <div className="col-7">
                      <textarea
                        className="form-control"
                        value={this.state.workExperienceDetails[i]?.description}
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
                  {/* Dates */}
                  <div className="col-9 d-flex justify-content-between align-items-center">
                    {/* Start date */}
                    <div className="d-flex align-items-center">
                      <label className="form-label">Start Date</label>
                      <div className="ms-2">
                        <input
                          className="form-control"
                          type="month"
                          value={this.state.workExperienceDetails[i]?.startDate}
                          onChange={(event) =>
                            this.updateDetails(
                              "startDate",
                              event.target.value,
                              i
                            )
                          }
                        />
                      </div>
                    </div>
                    {/* End Date */}
                    <div className="d-flex align-items-center">
                      <label className="form-label">End Date</label>
                      <div className="ms-2">
                        <input
                          className="form-control"
                          disabled={
                            this.state.workExperienceDetails[i]
                              ?.isCurrentEmployer
                              ? this.state.workExperienceDetails[i]
                                  ?.isCurrentEmployer
                              : ""
                          }
                          type="month"
                          value={this.state.workExperienceDetails[i]?.endDate}
                          onChange={(event) =>
                            this.updateDetails("endDate", event.target.value, i)
                          }
                        />
                      </div>
                    </div>
                    {/* Current employer checkbox */}
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={
                            this.state.workExperienceDetails[i]
                              ?.isCurrentEmployer
                          }
                          value={
                            this.state.workExperienceDetails[i]
                              ?.isCurrentEmployer
                          }
                          onChange={(event) =>
                            this.updateDetails(
                              "isCurrentEmployer",
                              event.target.checked,
                              i
                            )
                          }
                          onClick={($event) =>
                            this.handleCheckBox($event.target.check, i)
                          }
                        />
                        Current Employer
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              <button
                className="btn btn-primary"
                onClick={() => this.addWorkExperience()}
              >
                Add Work Experience
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkExperience;
