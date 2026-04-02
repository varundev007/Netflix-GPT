export const checkValidData = (email , password, fullName) => {

    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    const isNameValid = /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(fullName);
    
    if(!isEmailValid) return "Email is not valid";
    if(!isPasswordValid) return "Password is not valid";
    if(!isNameValid) return "Name is not valid";

    return null;
}