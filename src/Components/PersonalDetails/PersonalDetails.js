import { Component } from "react";

class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    if (this.props.details) {
      this.state = {
        personalDetails: this.props.details,
      };
    } else {
      this.state = {
        personalDetails: {
          name: null,
          email: null,
          contactNumber: null,
          address: null,
        },
      };
    }
  }
  updatePersonalDetails(fieldName, value) {
    const personalDetails = this.state.personalDetails;
    personalDetails[fieldName] = value;
    this.setState({ personalDetails });
    this.props.onPersonalDetailsChange(this.state.personalDetails);
  }
  render() {
    return (
      <div className="accordion col-9 mb-3" id="personalDetailsSection">
        <div className="accordion-item">
          <h2 className="accordion-header" id="personalDetailsHeading">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#personalDetails"
              aria-expanded={this.props.isOpen}
              aria-controls="personalDetails"
            >
              Personal Details
            </button>
          </h2>
          <div
            id="personalDetails"
            className={`accordion-collapse collapse ${
              this.props.isOpen ? "show" : ""
            }`}
            aria-labelledby="personalDetailsHeading"
            data-bs-parent="#personalDetailsSection"
          >
            <div className="accordion-body">
              <form>
                {/* name */}
                <div className="row mb-3">
                  <label className="form-label col-2"> Name</label>
                  <div className="col-9">
                    <input
                      className="form-control col-4"
                      type="text"
                      value={this.state.personalDetails.name}
                      onChange={(event) =>
                        this.updatePersonalDetails("name", event.target.value)
                      }
                    />
                  </div>
                </div>
                {/* email */}
                <div className="row mb-3">
                  <label className="form-label col-2"> Email</label>
                  <div className="col-9">
                    <input
                      className="form-control col-4"
                      type="email"
                      value={this.state.personalDetails.email}
                      onChange={(event) =>
                        this.updatePersonalDetails("email", event.target.value)
                      }
                    />
                  </div>
                </div>
                {/* contact number */}
                <div className="row mb-3">
                  <label className="form-label col-2"> Contact Number</label>
                  <div className="col-9">
                    <input
                      className="form-control col-4"
                      type="text"
                      placeholder="e.g. (222) 666-8888"
                      value={this.state.personalDetails.contactNumber}
                      onChange={(event) =>
                        this.updatePersonalDetails(
                          "contactNumber",
                          event.target.value
                        )
                      }
                    />
                  </div>
                </div>
                {/* address */}
                <div className="row mb-3">
                  <label className="form-label col-2">Address</label>
                  <div className="col-9">
                    <input
                      className="form-control col-4"
                      type="text"
                      value={this.state.personalDetails.address}
                      onChange={(event) =>
                        this.updatePersonalDetails(
                          "address",
                          event.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PersonalDetails;
