let xValid = false, yValid = false, rValid = false;
const xValidValues = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
const rValidValues = [1, 2, 3, 4, 5];


function validateSelection(value, validValues) {
    return validValues.includes(value);
}


let selectedXBtn;
const errorMessageBox = document.getElementById('error-message');
document.addEventListener("DOMContentLoaded", function () {
    const xBtns = document.querySelectorAll('.button-group__button');

    xBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedValue = parseFloat(btn.value);
            xBtns.forEach(otherBtn => {
                otherBtn.classList.remove('active');
            });
            if (selectedValue !== selectedXBtn && selectedValue.toString() === btn.value && validateSelection(selectedValue, xValidValues)) {
                btn.classList.add('active');
                selectedXBtn = selectedValue;
                xValid = true;
                errorMessageBox.textContent = '';
            } else {
                btn.classList.remove('active');
                selectedXBtn = undefined;
                xValid = false;
                errorMessageBox.textContent = 'Проверьте значение X';
            }
            toggleSubmitBtn();
        });
    });
});


const yInput = document.querySelector('input[name="y"]');
yInput.addEventListener('input', () => {
    yValid = false;

    const regex = /^[-0-9.,]+$/;
    if (!regex.test(yInput.value)) {
        yInput.setCustomValidity('Проверьте значение Y');
        yInput.reportValidity();
        toggleSubmitBtn();
        return;
    }

    const yValue = parseFloat(yInput.value.trim().replace(',', '.'));
    if (isNaN(yValue)) {
        yInput.setCustomValidity('Проверьте значение - Y');
    } else if (yValue < -3 || yValue > 3) {
        yInput.setCustomValidity('Значение Y - (-3; 3)');
    } else {
        yValid = true;
        yInput.setCustomValidity('');
    }
    yInput.reportValidity();
    toggleSubmitBtn();
});


const rRadios = document.querySelectorAll('input[name="r"]');
rRadios.forEach(rRadio => {
    rRadio.addEventListener('change', () => {
        const selectedValue = parseInt(rRadio.value);
        if (validateSelection(selectedValue, rValidValues) && selectedValue.toString() === rRadio.value) {
            rValid = true;
            rRadio.setCustomValidity('');
        } else {
            rValid = false;
            rRadio.setCustomValidity('Проверьте значение R');
        }
        rRadio.reportValidity();
        toggleSubmitBtn();
    });
});

const submitBtn = document.querySelector('[type="submit"]');
function toggleSubmitBtn() {
    submitBtn.disabled = !(xValid && yValid && rValid)
}