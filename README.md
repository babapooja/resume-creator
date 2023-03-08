# Resume Builder

The app is live here - [ResumeBuilder](https://babapooja.github.io/resume-creator/)

This is a pure frontend application implemented in ```ReactJs``` using ```bootstrap``` library for styling.

## Features

1. User can create their resume by entering the details in the form after visiting the above link. User can add their following details in the app to generate their resume-   
    - Personal Details
    - Skills
    - Work Experience
    - Education Details
    - Projects
  
2. Each section listed above is a collapsible accordion. User can reset each section individually or can use the reset button at the top of the page to reset the form. If the user clicks on the ```Reset Form``` button, a dialog box will be displayed asking for confirmation for user's action.

3. After entering the details, the user can click on the ```Build Resume``` button to generate the resume from the details entered in the form. The user will be navigated to the next page to display how the resume would like. 

4. On the resume viewer page, the user can click on the ```Download Resume``` button to download the image version of the resume displayed.

5. User can make use of the ```Back``` button to navigate back to the previous page, i.e. the resume builder form.

6. If the user clicks on the ```Build Resume``` button without entering the details in the form, an error message will be displayed on the next screen asking user to enter the required details.

7. On page refresh the user's entered data is retained. To implement this feature, I have made use of ```localStorage```.
