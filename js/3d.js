export const validForm = () => {
    let testDate = document.getElementById("date").value
    let date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!(date_regex.test(testDate))) {
        alert('Zły format day lub pole na date jest puste')
        return false;
    }else{
        return true;
    }
}